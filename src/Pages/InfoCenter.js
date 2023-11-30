import React, { useState, useEffect } from 'react';
import GetDataReport from "../components/GetDataReport";
import { useLocation } from 'react-router-dom';
import './InfoCenter.css'

function InfoCenter(){
    const location = useLocation();
    const [token, setToken] = useState(null);
    const [name, setName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
  
    useEffect(() => {
      if (location.state && location.state.token && location.state.userName) {
        setToken(location.state.token);
        setName(location.state.userName);
        setSelectedDate(location.state.selectedDate || ''); 
      }
    }, [location.state]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div className='ms-5' >
          
          <div className='d-flex mt-4'>
            <h3>Дата:</h3>
            <input
              className='ms-2'
              type="month"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <GetDataReport token={token} datePeriod={selectedDate} />
        </div>
    );
}
export default InfoCenter;
