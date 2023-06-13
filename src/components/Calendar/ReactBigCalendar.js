import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TitleText from "../TitleText";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const localizer = momentLocalizer(moment);
    const [calenderEvents, setCalendarEvents] = useState([]);
    const [eventData, setEventData] = useState(events);

    


    
  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
    setCalendarEvents([
        ...calenderEvents,
        {
          start,
          end,
          title
        }
        // [e.target.name]: e.target.value
      ]);

      axios({
        method: "post",
        url: "http://localhost:8080/holidays/",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,OPTIONS",
          Authorization:
            `Bearer ` +
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBjY21zLmNvbSIsImV4cCI6MTY3NjI5NTIxMiwiaWF0IjoxNjc2MjU5MjEyfQ.pIi30-fHOEdPxFyLw87EssJTsYEEsfCbqM_3rQTPHUw",
        },
        data: calenderEvents,
          
        mode: "cors",
      })
        .then((res) => {
          console.log("response", res.data.body);
          var data = res.data.body;
          // // setAllUserList(users)
          setEventsData(data)
          console.log('Pre - Output Data')

          
          var output = converter(data);
          setCalendarEvents();
          console.log('Output Data')
          // console.log(output)
    

        })
        .catch((err) => {
     
          console.log("error ; " + err.message);
        });
      
  };

  


  useEffect(() => {
    getTrainings()
  },[]);

  const getTrainings =  async () => {
    // fetch('https://customerrest.herokuapp.com/gettrainings')
    //   .then(response => response.json())
    //   .then(data => setTrainings(data))
    //   .catch(err => console.error(err))
    //   console.log('trainings:',trainings);

      await axios({
        method: "get",
        url: "http://localhost:8080/holidays/",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,OPTIONS",
          Authorization:
            `Bearer ` +
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBjY21zLmNvbSIsImV4cCI6MTY3NjI5NTIxMiwiaWF0IjoxNjc2MjU5MjEyfQ.pIi30-fHOEdPxFyLw87EssJTsYEEsfCbqM_3rQTPHUw",
        },
        data: null,
  
        mode: "cors",
      })
        .then((res) => {
          console.log("response", res.data.body);
          var data = res.data.body;
          // setAllUserList(users)
          setEventsData(data)
          console.log('Pre - Output Data')

          
          var output = converter(data);
          setCalendarEvents(output);
          console.log('Output Data')
          console.log(output)
    

        })
        .catch((err) => {
     
          console.log("error ; " + err.message);
        });
  }
 

  function converter (apiData) {
     const events = apiData.map((appointment)=>{
      console.log(appointment);
      return {
        id: appointment.holidayId,
        title: appointment.name,
        start: new Date(appointment.date),
        end: new Date(appointment.date),
        desc:appointment.holidayType,
        allDay: false
      }
    })

    return events;

  }
  
  return (
    <div className=" bg-grey h-fit w-full ">
   
      <TitleText titleText="Calendar" />
      <div className=" absolute mt-4 h-[75%] w-[82%] bg-white rounded-lg border border-gray-200 shadow-md">

    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events= {calenderEvents}
        style={{ height: "80vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
    </div>
    </div>
  );
}
