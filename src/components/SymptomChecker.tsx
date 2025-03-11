import React, { useState, useEffect, useCallback } from 'react';
import { Send, Mic, Volume2, AlertCircle } from 'lucide-react';

// Add TypeScript interfaces for SpeechRecognition
// interface Window {
//   SpeechRecognition?: any;
//   webkitSpeechRecognition?: any;
// }

// Type definitions for our component
type Language = 'en' | 'hi' | 'bn' | 'pa';
type LanguageContent = {
  [key in Language]: string | string[];
};

type MedicalCondition = {
  name: LanguageContent;
  symptoms: LanguageContent;
  remedies: LanguageContent;
  medicines: LanguageContent;
};

type MedicalKnowledgeBase = {
  [condition: string]: MedicalCondition;
};

// Enhanced medical knowledge base with more language support
const medicalKnowledge: MedicalKnowledgeBase = {
  fever: {
    name: {
      en: "Fever",
      hi: "बुखार",
      bn: "জ্বর",
      pa: "ਬੁਖਾਰ",
    },
    symptoms: {
      en: ["High temperature", "Chills", "Sweating", "Headache", "Muscle aches"],
      hi: ["उच्च तापमान", "ठंड लगना", "पसीना आना", "सिरदर्द", "मांसपेशियों में दर्द"],
      bn: ["উচ্চ তাপমাত্রা", "ঠান্ডা লাগা", "ঘাম", "মাথা ব্যথা", "পেশী ব্যথা"],
      pa: ["ਉੱਚ ਤਾਪਮਾਨ", "ਠੰਡ ਲੱਗਣਾ", "ਪਸੀਨਾ ਆਉਣਾ", "ਸਿਰ ਦਰਦ", "ਮਾਸਪੇਸ਼ੀਆਂ ਵਿੱਚ ਦਰਦ"],
    },
    remedies: {
      en: [
        "Take Paracetamol as directed",
        "Stay hydrated",
        "Get plenty of rest",
        "Use a cool compress"
      ],
      hi: [
        "निर्देशानुसार पैरासिटामोल लें",
        "पर्याप्त पानी पीएं",
        "पर्याप्त आराम करें",
        "ठंडी पट्टी का उपयोग करें"
      ],
      bn: [
        "নির্দেশনা অনুযায়ী প্যারাসিটামল নিন",
        "প্রচুর পানি পান করুন",
        "পর্যাপ্ত বিশ্রাম নিন",
        "ঠান্ডা কম্প্রেস ব্যবহার করুন"
      ],
      pa: [
        "ਨਿਰਦੇਸ਼ਾਂ ਅਨੁਸਾਰ ਪੈਰਾਸੀਟਾਮੋਲ ਲਓ",
        "ਖੂਬ ਪਾਣੀ ਪੀਓ",
        "ਬਹੁਤ ਆਰਾਮ ਕਰੋ",
        "ਠੰਡੇ ਕੰਪਰੈਸ ਦੀ ਵਰਤੋਂ ਕਰੋ"
      ]
    },
    medicines: {
      en: ["Paracetamol", "Ibuprofen"],
      hi: ["पैरासिटामोल", "आईब्युप्रोफेन"],
      bn: ["প্যারাসিটামল", "আইবুপ্রোফেন"],
      pa: ["ਪੈਰਾਸੀਟਾਮੋਲ", "ਆਈਬੁਪ੍ਰੋਫੇਨ"]
    }
  },
  headache: {
    name: {
      en: "Headache",
      hi: "सिरदर्द",
      bn: "মাথা ব্যথা",
      pa: "ਸਿਰ ਦਰਦ"
    },
    symptoms: {
      en: ["Head pain", "Sensitivity to light", "Nausea", "Dizziness"],
      hi: ["सिर में दर्द", "रोशनी से परेशानी", "मतली", "चक्कर आना"],
      bn: ["মাথা ব্যথা", "আলোর প্রতি সংবেদনশীলতা", "বমি বমি ভাব", "মাথা ঘোরা"],
      pa: ["ਸਿਰ ਦਰਦ", "ਰੋਸ਼ਨੀ ਤੋਂ ਪਰੇਸ਼ਾਨੀ", "ਮਿਤਲੀ", "ਚੱਕਰ ਆਉਣਾ"]
    },
    remedies: {
      en: [
        "Rest in a quiet, dark room",
        "Apply a cold or warm compress",
        "Stay hydrated",
        "Practice relaxation techniques"
      ],
      hi: [
        "शांत, अंधेरे कमरे में आराम करें",
        "ठंडी या गर्म पट्टी लगाएं",
        "पर्याप्त पानी पीएं",
        "आराम की तकनीकों का अभ्यास करें"
      ],
      bn: [
        "শান্ত, অন্ধকার ঘরে বিশ্রাম নিন",
        "ঠাণ্ডা বা গরম কম্প্রেস প্রয়োগ করুন",
        "প্রচুর জল পান করুন",
        "শিথিলকরণ কৌশলগুলি অনুশীলন করুন"
      ],
      pa: [
        "ਸ਼ਾਂਤ, ਹਨੇਰੇ ਕਮਰੇ ਵਿੱਚ ਆਰਾਮ ਕਰੋ",
        "ਠੰਡਾ ਜਾਂ ਗਰਮ ਕੰਪਰੈਸ ਲਗਾਓ",
        "ਖੂਬ ਪਾਣੀ ਪੀਓ",
        "ਆਰਾਮ ਦੀਆਂ ਤਕਨੀਕਾਂ ਦਾ ਅਭਿਆਸ ਕਰੋ"
      ]
    },
    medicines: {
      en: ["Paracetamol", "Aspirin", "Ibuprofen"],
      hi: ["पैरासिटामोल", "एस्पिरिन", "आईब्युप्रोफेन"],
      bn: ["প্যারাসিটামল", "অ্যাসপিরিন", "আইবুপ্রোফেন"],
      pa: ["ਪੈਰਾਸੀਟਾਮੋਲ", "ਐਸਪਰਿਨ", "ਆਈਬੁਪ੍ਰੋਫੇਨ"]
    }
  },
  cough: {
    name: {
      en: "Cough",
      hi: "खांसी",
      bn: "কাশি",
      pa: "ਖੰਘ"
    },
    symptoms: {
      en: ["Persistent coughing", "Sore throat", "Chest discomfort", "Runny nose"],
      hi: ["लगातार खांसी", "गले में खराश", "छाती में तकलीफ", "बहती नाक"],
      bn: ["অবিরাম কাশি", "গলা ব্যথা", "বুকে অস্বস্তি", "সর্দি"],
      pa: ["ਲਗਾਤਾਰ ਖੰਘ", "ਗਲੇ ਵਿੱਚ ਖਰਾਸ਼", "ਛਾਤੀ ਵਿੱਚ ਬੇਆਰਾਮੀ", "ਵਗਦਾ ਨੱਕ"]
    },
    remedies: {
      en: [
        "Drink warm liquids",
        "Use honey and lemon",
        "Stay hydrated",
        "Use a humidifier"
      ],
      hi: [
        "गर्म तरल पदार्थ पीएं",
        "शहद और नींबू का उपयोग करें",
        "पर्याप्त पानी पीएं",
        "ह्यूमिडिफायर का उपयोग करें"
      ],
      bn: [
        "উষ্ণ তরল পান করুন",
        "মধু এবং লেবু ব্যবহার করুন",
        "প্রচুর জল পান করুন",
        "হিউমিডিফায়ার ব্যবহার করুন"
      ],
      pa: [
        "ਗਰਮ ਤਰਲ ਪਦਾਰਥ ਪੀਓ",
        "ਸ਼ਹਿਦ ਅਤੇ ਨਿੰਬੂ ਦੀ ਵਰਤੋਂ ਕਰੋ",
        "ਖੂਬ ਪਾਣੀ ਪੀਓ",
        "ਹਿਊਮੀਡੀਫਾਇਰ ਦੀ ਵਰਤੋਂ ਕਰੋ"
      ]
    },
    medicines: {
      en: ["Cough syrup", "Throat lozenges"],
      hi: ["खांसी की दवा", "गले की गोलियां"],
      bn: ["কাশির সিরাপ", "গলার লজেন্স"],
      pa: ["ਖੰਘ ਦੀ ਸਿਰਪ", "ਗਲੇ ਦੀਆਂ ਗੋਲੀਆਂ"]
    }
  }
};

function SymptomChecker() {
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean; language?: Language}>>([]);
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' }
  ];

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        if (event.results[0].isFinal) {
          handleUserInput(transcript);
          setIsListening(false);
        }
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        if (!isListening) {
          recognition.lang = getLangCode(selectedLanguage);
          recognition.start();
          setIsListening(true);
        } else {
          recognition.stop();
          setIsListening(false);
        }
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      }
    }
  }, [isListening, recognition, selectedLanguage]);

  const getLangCode = (lang: Language): string => {
    switch (lang) {
      case 'en': return 'en-US';
      case 'hi': return 'hi-IN';
      case 'bn': return 'bn-IN';
      case 'pa': return 'pa-IN';
      default: return 'en-US';
    }
  };

  const speakResponse = useCallback((text: string, language: Language) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLangCode(language);
    window.speechSynthesis.speak(utterance);
  }, []);

  const detectLanguage = (text: string): Language => {
    // Check for Devanagari (Hindi)
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    
    // Check for Bengali
    if (/[\u0980-\u09FF]/.test(text)) return 'bn';
    
    // Check for Punjabi (Gurmukhi)
    if (/[\u0A00-\u0A7F]/.test(text)) return 'pa';
    
    // Default to English
    return 'en';
  };

  const analyzeSymptoms = (userInput: string): { [key in Language]: string } => {
    const input = userInput.toLowerCase();
    const detectedLanguage = detectLanguage(input);
    
    let response = {
      en: '',
      hi: '',
      bn: '',
      pa: ''
    };

    // Check for each condition in the medical knowledge base
    for (const [condition, data] of Object.entries(medicalKnowledge)) {
      // Check if input includes condition name or symptoms
      const hasCondition = input.includes(condition) || 
                           input.includes((typeof data.name[detectedLanguage] === 'string' ? 
                             data.name[detectedLanguage] as string : 
                             (data.name[detectedLanguage] as string[]).join(' ')).toLowerCase()) ||
                           (Array.isArray(data.symptoms[detectedLanguage]) && 
                            (data.symptoms[detectedLanguage] as string[]).some(symptom => 
                              input.includes(symptom.toLowerCase())
                            ));
      
      if (hasCondition) {
        response = {
          en: `For ${data.name.en}, here's what you should do:\n\n` +
              `Remedies:\n${(data.remedies.en as string[]).join('\n')}\n\n` +
              `Recommended medicines:\n${(data.medicines.en as string[]).join(', ')}\n\n` +
              `Note: Please consult a healthcare provider for proper medical advice.`,
          
          hi: `${data.name.hi} के लिए, आपको यह करना चाहिए:\n\n` +
              `उपचार:\n${(data.remedies.hi as string[]).join('\n')}\n\n` +
              `अनुशंसित दवाएं:\n${(data.medicines.hi as string[]).join(', ')}\n\n` +
              `नोट: कृपया उचित चिकित्सा सलाह के लिए डॉक्टर से संपर्क करें।`,
          
          bn: `${data.name.bn} এর জন্য, আপনার যা করা উচিত:\n\n` +
              `প্রতিকার:\n${(data.remedies.bn as string[]).join('\n')}\n\n` +
              `প্রস্তাবিত ওষুধ:\n${(data.medicines.bn as string[]).join(', ')}\n\n` +
              `বিশেষ দ্রষ্টব্য: সঠিক চিকিৎসা পরামর্শের জন্য দয়া করে একজন চিকিৎসকের সাথে পরামর্শ করুন।`,
          
          pa: `${data.name.pa} ਲਈ, ਤੁਹਾਨੂੰ ਇਹ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ:\n\n` +
              `ਇਲਾਜ:\n${(data.remedies.pa as string[]).join('\n')}\n\n` +
              `ਸਿਫਾਰਸ਼ੀ ਦਵਾਈਆਂ:\n${(data.medicines.pa as string[]).join(', ')}\n\n` +
              `ਨੋਟ: ਕਿਰਪਾ ਕਰਕੇ ਉਚਿਤ ਮੈਡੀਕਲ ਸਲਾਹ ਲਈ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ-ਮਸ਼ਵਰਾ ਕਰੋ।`
        };
        return response;
      }
    }

    // Default response if no specific condition is matched
    return {
      en: "Could you please describe your symptoms more specifically? For example, do you have fever, headache, or cough?",
      hi: "कृपया अपने लक्षणों का और अधिक विशेष रूप से वर्णन करें? उदाहरण के लिए, क्या आपको बुखार, सिरदर्द, या खांसी है?",
      bn: "দয়া করে আপনার লক্ষণগুলি আরও নির্দিষ্টভাবে বর্ণনা করতে পারেন? উদাহরণস্বরূপ, আপনার কি জ্বর, মাথা ব্যথা বা কাশি আছে?",
      pa: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਹੋਰ ਵਧੇਰੇ ਵਿਸ਼ੇਸ਼ ਰੂਪ ਵਿੱਚ ਵਰਣਨ ਕਰ ਸਕਦੇ ਹੋ? ਉਦਾਹਰਣ ਲਈ, ਕੀ ਤੁਹਾਨੂੰ ਬੁਖਾਰ, ਸਿਰ ਦਰਦ, ਜਾਂ ਖੰਘ ਹੈ?"
    };
  };

  const handleUserInput = useCallback((userMessage: string) => {
    setMessages(prev => [...prev, { 
      text: userMessage, 
      isUser: true, 
      language: selectedLanguage 
    }]);

    // Generate AI response based on symptoms
    const response = analyzeSymptoms(userMessage);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: response[selectedLanguage], isUser: false, language: selectedLanguage }
      ]);
      speakResponse(response[selectedLanguage], selectedLanguage);
    }, 1000);
  }, [selectedLanguage, speakResponse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    handleUserInput(input);
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">AI Health Assistant</h2>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Language)}
            className="border rounded-lg px-3 py-2"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="h-[calc(100vh-300px)] overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-rose-500" />
                <p>Describe your symptoms and get health advice in your preferred language</p>
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.isUser
                    ? 'bg-rose-600 text-white'
                    : 'bg-white shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                {!message.isUser && (
                  <button
                    onClick={() => speakResponse(message.text, message.language || 'en')}
                    className="mt-2 text-gray-600 hover:text-gray-800"
                    aria-label="Read aloud"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedLanguage === 'en' 
              ? "Describe your symptoms..." 
              : selectedLanguage === 'hi'
                ? "अपने लक्षणों का वर्णन करें..."
                : selectedLanguage === 'bn'
                  ? "আপনার উপসর্গগুলি বর্ণনা করুন..."
                  : "ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ..."
            }
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            type="button"
            onClick={startListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-rose-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isListening ? "Stop listening" : "Start listening"}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            type="submit"
            className="bg-rose-600 text-white rounded-lg px-4 py-2 hover:bg-rose-700 transition-colors"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

        {isListening && (
          <div className="mt-2 text-sm text-gray-600">
            {selectedLanguage === 'en' 
              ? 'Listening... Speak now' 
              : selectedLanguage === 'hi' 
                ? 'सुन रहा हूं... अब बोलें'
                : selectedLanguage === 'bn'
                  ? 'শুনছি... এখন বলুন'
                  : 'ਸੁਣ ਰਿਹਾ ਹੈ... ਹੁਣ ਬੋਲੋ'
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomChecker;