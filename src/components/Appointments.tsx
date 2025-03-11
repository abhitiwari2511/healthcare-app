import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

function Appointments() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Practitioner' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist' },
    { id: 3, name: 'Dr. Emily Williams', specialty: 'Cardiologist' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to book the appointment
    alert('Appointment booked successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Book an Appointment</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Doctor
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 text-white rounded-lg px-4 py-2 hover:bg-rose-700 transition-colors"
              >
                Book Appointment
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h3>
            
            <div className="space-y-3">
              <AppointmentCard
                doctor="Dr. Sarah Johnson"
                date="March 15, 2024"
                time="10:00 AM"
                location="Main Street Clinic"
              />
              <AppointmentCard
                doctor="Dr. Michael Chen"
                date="March 20, 2024"
                time="2:30 PM"
                location="City Medical Center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentCard({ 
  doctor, 
  date, 
  time, 
  location 
}: { 
  doctor: string; 
  date: string; 
  time: string; 
  location: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <User className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-800">{doctor}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="h-4 w-4" />
        <span>{date}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="h-4 w-4" />
        <span>{time}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4" />
        <span>{location}</span>
      </div>
    </div>
  );
}

export default Appointments;