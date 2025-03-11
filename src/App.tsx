import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SymptomChecker from './components/SymptomChecker';
import SkinAnalysis from './components/SkinAnalysis';
import VitalSigns from './components/VitalSigns';
import Appointments from './components/Appointments';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/skin-analysis" element={<SkinAnalysis />} />
            <Route path="/vitals" element={<VitalSigns />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;