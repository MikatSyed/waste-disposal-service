import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React from 'react';
import { useState } from 'react';
import './NewBooking.css'



const NewBooking = ({ history}) => {
const[date,setDate] = useState(new Date().toLocaleDateString())
const[time,setTime] = useState("")
console.log(date);
 
    const handleDateChange = (date) => {      
        setDate(date);  
        
    }
 
   
    let selectedDate = date
    let selectedTime = time;
    
    const data = {
        selectedDate,
        selectedTime
    }
  
    localStorage.setItem("bookingInfo", JSON.stringify(data));

    const handleClick = () => {
      history.push("/shipping")
    }
    return (
      <>
      <div className="calendar">
      <Calendar onChange={handleDateChange} value={new Date()} />
      {/* <Calendar/> */}
    </div>
 {
   date &&    <p>Selected Date: {date && date}</p>
 }
    <h2>Please Select your preferred slot</h2>
    <div className="btns">
      
      <div className="grid-item">
        <button onClick={() => setTime("10:00")}>10:00</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("10:30")}>10:30</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("11:00")}>11:00</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("11:30")}>11:30</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("12:00")}>12:00</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("12:00")}>12:30</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("1:00")}>1:00</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("1:30")}>1:30</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("2:00")}>2:00</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("2:30")}>2:30</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("3:00")}>3:00</button>
      </div>
      <div className="grid-item">
        <button onClick={() => setTime("3:30")}>3:30</button>
      </div>   
    </div>
    <div>
    {
      time &&    <p>Selected time: {time}</p>
    }
    </div>
    <div className="btn-div">
    
    <button onClick={handleClick}>Book</button>
    </div>
    
    </>
    );
};

export default NewBooking;