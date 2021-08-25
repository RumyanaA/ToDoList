import React from 'react';
import { Component } from "react";
import PubSub from 'pubsub-js'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Button from '../../Button';

 class Calendar extends Component {
   constructor(props){
     super(props);
     
   }
   addTask(){
    var MY_TOPIC = 'Render topic';
    PubSub.publish(MY_TOPIC, 'create task');
   }
  
  render() {
    return (
      <div className='calendar'>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        aspectRatio={2}
        height={600}
      />
      <Button  label="add Task" onClick={this.addTask}/>
      </div>
    )
  }
}
export default Calendar;