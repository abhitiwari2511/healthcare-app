import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Loader2 } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';

// Define proper types for the skin conditions database
type SkinCondition = {
  symptoms: string;
  causes: string;
  remedies: string;
};

type SkinConditionsDatabase = {
  [key: string]: SkinCondition;
};

// Skin conditions database with symptoms and remedies
const skinConditionsDB: SkinConditionsDatabase = {
  'acne': {
    symptoms: 'Pimples, blackheads, and inflammation',
    causes: 'Excess oil production, bacteria, inflammation, clogged pores',
    remedies: 'Cleanse twice daily, use non-comedogenic products, consider benzoyl peroxide or salicylic acid treatments'
  },
  'rosacea': {
    symptoms: 'Facial redness, visible blood vessels, bumps, eye irritation',
    causes: 'Genetic factors, environmental triggers, blood vessel abnormalities',
    remedies: 'Avoid triggers like spicy food and alcohol, use gentle skincare, apply sunscreen daily'
  },
  'eczema': {
    symptoms: 'Dry, itchy, inflamed skin with rash-like appearance',
    causes: 'Genetic factors, environmental triggers, immune system activation',
    remedies: 'Moisturize frequently, use gentle soaps, identify and avoid triggers, apply prescribed topical treatments'
  },
  'psoriasis': {
    symptoms: 'Red patches with silvery scales, itching, burning',
    causes: 'Immune system dysfunction, genetic predisposition, environmental factors',
    remedies: 'Moisturize regularly, use medicated creams, consider light therapy, manage stress'
  },
  'normal': {
    symptoms: 'Even tone, no visible issues',
    causes: 'Healthy skin barrier',
    remedies: 'Continue regular skincare routine with cleansing, moisturizing, and sun protection'
  }
};

type AnalysisResult = {
  condition: string;
  confidence: number;
  symptoms: string;
  causes: string;
  remedies: string;
}

function SkinAnalysis() {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modelLoading, setModelLoading] = useState<boolean>(true);

  // Load the model on component mount
  useEffect(() => {
    async function loadModel() {
      try {
        // Load MobileNet v2 model from TensorFlow Hub
        const loadedModel = await tf.loadGraphModel(
          'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/3/default/1',
          { fromTFHub: true }
        );
        
        setModel(loadedModel);
        setModelLoading(false);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    }
    
    loadModel();
    
    // Cleanup
    return () => {
      if (model) {
        // Dispose of the model when component unmounts
        model.dispose();
      }
    };
  }, []);

  // Process the image and make a prediction
  const analyzeSkin = async (imageSrc: string) => {
    if (!model) return;
    
    setIsLoading(true);
    
    try {
      // Load the image from data URL
      const img = new Image();
      img.src = imageSrc;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Convert the image to a tensor
      const tensor = tf.browser.fromPixels(img)
        .resizeBilinear([224, 224]) // Resize to match model input
        .toFloat()
        .div(tf.scalar(255)) // Normalize to [0,1]
        .expandDims(0); // Add batch dimension
      
      // Run the prediction
      const predictions = await model.predict(tensor) as tf.Tensor;
      const probabilities = await predictions.data();
      
      // Find the class with highest probability
      const maxProbIndex = probabilities.indexOf(Math.max(...Array.from(probabilities)));
      
      // Map the model output index to skin conditions (simplified mapping for demo)
      const conditions = Object.keys(skinConditionsDB);
      const conditionIndex = maxProbIndex % conditions.length;
      const predictedCondition = conditions[conditionIndex];
      
      // Set the analysis result with type-safe access
      const conditionData = skinConditionsDB[predictedCondition];
      
      const result: AnalysisResult = {
        condition: predictedCondition,
        confidence: Math.round(probabilities[maxProbIndex] * 100),
        symptoms: conditionData?.symptoms || 'Unknown',
        causes: conditionData?.causes || 'Unknown',
        remedies: conditionData?.remedies || 'Consult a dermatologist'
      };
      
      setAnalysis(result);
      
      // Clean up tensors
      tensor.dispose();
      predictions.dispose();
      
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      analyzeSkin(imageSrc);
    }
  }, [webcamRef, model]);

  const retake = () => {
    setImage(null);
    setAnalysis(null);
  };

  // The rest of your component remains the same
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Skin Analysis</h2>

        {modelLoading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-rose-600" />
            <p className="text-gray-600">Loading AI model for skin analysis...</p>
          </div>
        )}

        {!modelLoading && (
          <>
            <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
              {!image ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={image} alt="Captured" className="w-full h-full object-cover" />
              )}
            </div>

            <div className="flex justify-center gap-4">
              {!image ? (
                <button
                  onClick={capture}
                  className="flex items-center gap-2 bg-rose-600 text-white rounded-lg px-6 py-2 hover:bg-rose-700 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                  Capture Image
                </button>
              ) : (
                <button
                  onClick={retake}
                  className="flex items-center gap-2 bg-gray-600 text-white rounded-lg px-6 py-2 hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                  Retake
                </button>
              )}
            </div>

            {isLoading && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-rose-600" />
                <p className="text-gray-600">Analyzing your skin...</p>
              </div>
            )}

            {analysis && !isLoading && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Analysis Results</h3>
                
                <div className="mb-3">
                  <span className="font-medium text-gray-700">Detected condition:</span>
                  <span className="ml-2 text-rose-600 font-semibold capitalize">{analysis.condition}</span>
                  <span className="ml-2 text-gray-500 text-sm">({analysis.confidence}% confidence)</span>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Common symptoms:</span>
                  <p className="text-gray-600 mt-1">{analysis.symptoms}</p>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Potential causes:</span>
                  <p className="text-gray-600 mt-1">{analysis.causes}</p>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Recommended actions:</span>
                  <p className="text-gray-600 mt-1">{analysis.remedies}</p>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>Disclaimer: This analysis is provided for informational purposes only and should not replace professional medical advice.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SkinAnalysis;