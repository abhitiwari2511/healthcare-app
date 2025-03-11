import React, { useState } from 'react';
import { 
  Thermometer, 
  Heart, 
  // Activity,
  // TrendingUp 
} from 'lucide-react';

function VitalSigns() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [spO2, setSpO2] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Vital Signs Monitor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VitalCard
            icon={<Thermometer className="h-8 w-8 text-rose-600" />}
            title="Temperature"
            value={temperature}
            unit="°C"
            onMeasure={() => setTemperature(37.2)}
          />

          <VitalCard
            icon={<Heart className="h-8 w-8 text-rose-600" />}
            title="SpO2"
            value={spO2}
            unit="%"
            onMeasure={() => setSpO2(98)}
          />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">History</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <VitalHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

function VitalCard({ 
  icon, 
  title, 
  value, 
  unit, 
  onMeasure 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: number | null; 
  unit: string;
  onMeasure: () => void;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="text-3xl font-bold text-gray-800 mb-4">
        {value ? `${value}${unit}` : '--'}
      </div>

      <button
        onClick={onMeasure}
        className="w-full bg-rose-600 text-white rounded-lg px-4 py-2 hover:bg-rose-700 transition-colors"
      >
        Measure Now
      </button>
    </div>
  );
}

function VitalHistory() {
  const mockData = [
    { date: '2024-03-10', temperature: 37.2, spO2: 98 },
    { date: '2024-03-09', temperature: 37.0, spO2: 97 },
    { date: '2024-03-08', temperature: 36.8, spO2: 98 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-3 text-gray-600">Date</th>
            <th className="pb-3 text-gray-600">Temperature</th>
            <th className="pb-3 text-gray-600">SpO2</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((record, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-3">{record.date}</td>
              <td className="py-3">{record.temperature}°C</td>
              <td className="py-3">{record.spO2}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VitalSigns;