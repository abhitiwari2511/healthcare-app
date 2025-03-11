import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Camera, Calendar, Home } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-rose-600" />
            <span className="text-xl font-bold text-gray-800">HealthAssist AI</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" icon={<Home />} text="Dashboard" />
            <NavLink to="/symptoms" icon={<Activity />} text="Symptoms" />
            <NavLink to="/skin-analysis" icon={<Camera />} text="Skin Analysis" />
            <NavLink to="/vitals" icon={<Heart />} text="Vitals" />
            <NavLink to="/appointments" icon={<Calendar />} text="Appointments" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 text-gray-600 hover:text-rose-600 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export default Navbar;