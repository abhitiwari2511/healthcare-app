import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Camera, 
  Thermometer, 
  // Pill, 
  Heart, 
  Calendar 
} from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to HealthAssist AI</h1>
        <p className="mt-2 text-gray-600">Your personal health companion powered by AI</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          to="/symptoms"
          icon={<Stethoscope className="h-8 w-8" />}
          title="AI Symptom Checker"
          description="Get instant AI-powered analysis of your symptoms in multiple languages"
        />
        
        <FeatureCard
          to="/skin-analysis"
          icon={<Camera className="h-8 w-8" />}
          title="Skin Analysis"
          description="Analyze skin conditions using your device's camera"
        />
        
        <FeatureCard
          to="/vitals"
          icon={<Thermometer className="h-8 w-8" />}
          title="Vital Signs"
          description="Monitor temperature, SpO2, and other vital signs"
        />
{/*         
        <FeatureCard
          to="/medications"
          icon={<Pill className="h-8 w-8" />}
          title="Medicine Assistant"
          description="Get medication recommendations and set reminders"
        /> */}
        
        <FeatureCard
          to="/vitals"
          icon={<Heart className="h-8 w-8" />}
          title="Health Monitoring"
          description="Track your vital signs and health metrics over time"
        />
        
        <FeatureCard
          to="/appointments"
          icon={<Calendar className="h-8 w-8" />}
          title="Appointments"
          description="Schedule and manage your doctor appointments"
        />
      </div>
    </div>
  );
}

function FeatureCard({ 
  to, 
  icon, 
  title, 
  description 
}: { 
  to: string; 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <Link
      to={to}
      className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-rose-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

export default Dashboard;