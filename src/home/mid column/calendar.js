import React from 'react';
import { Component } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

 class Calendar extends Component {
  
  render() {
    return (
      <div className='calendar'>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        aspectRatio={2}
        height={600}
      />
      </div>
    )
  }
}
export default Calendar;