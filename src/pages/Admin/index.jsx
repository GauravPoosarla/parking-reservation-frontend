import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar';
import StyledCalendar from '../../components/StyledCalendar';

const AdminPage = () => {
  const [parkingDetails, setParkingDetails] = useState([]);
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  useEffect(() => {
    axios
      .get('http://localhost:8000/reservations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        setParkingDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching parking details:', error);
      });
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateReset = () => {
    setDate('');
  };

  const filteredParkingDetails = parkingDetails.filter(parking => {
    if (!date) {
      return true; // Show all reservations when no date is selected
    }
    return parking.date === date.toISOString().split('T')[0];
  });

  return (
    <div>
      <Navbar />
      <div className='container mx-auto mt-8'>
        <div className='flex items-center mb-4 gap-x-2 relative'>
          <h2 className='text-2xl font-semibold text-purple-700'>All Reservations</h2>
          <FontAwesomeIcon icon={faFilter} className='text-purple-700 mt-1' onClick={toggleCalendar} />
          {showCalendar && (
            <div className='calendar-overlay absolute top-5'>
              <StyledCalendar
                onSelectDate={date => {
                  setDate(date);
                  toggleCalendar();
                }}
              />
            </div>
          )}
          {date && (
            <div className='flex items-center gap-x-2'>
              <p className='text-purple-700 text-sm'>Selected date: {date.toISOString().split('T')[0]}</p>
              <FontAwesomeIcon icon={faTimesCircle} className='text-red-500 cursor-pointer' onClick={handleDateReset} />
            </div>
          )}
        </div>
        <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
          <table className='min-w-full'>
            <thead className='bg-purple-700 text-white'>
              <tr>
                <th className='py-3 px-6 text-left'>ID</th>
                <th className='py-3 px-6 text-left'>Start Time</th>
                <th className='py-3 px-6 text-left'>End Time</th>
                <th className='py-3 px-6 text-left'>Date</th>
                <th className='py-3 px-6 text-left'>User Email</th>
                <th className='py-3 px-6 text-left'>Slot</th>
              </tr>
            </thead>
            <tbody>
              {filteredParkingDetails.map(parking => (
                <tr key={parking.id} className='border-b border-gray-200'>
                  <td className='py-4 px-6'>{parking.id}</td>
                  <td className='py-4 px-6'>{parking.startTime}</td>
                  <td className='py-4 px-6'>{parking.endTime}</td>
                  <td className='py-4 px-6'>{parking.date}</td>
                  <td className='py-4 px-6'>{parking.userEmail}</td>
                  <td className='py-4 px-6'>{parking.slot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
