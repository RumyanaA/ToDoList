import React from 'react';
import { Component } from "react";
import PubSub from 'pubsub-js'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin, { DayGridView } from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import Storage from '../../Storage';
import Button from '../../Button';

 class CalendarComponent extends Component {
   constructor(props){
     super(props);
     this.state={
       event: []
     }
     this.mySubscriber = this.mySubscriber.bind(this);
   }
   Events;
  
mySubscriber(msg,data){ //function for publishing
  
    var oldState=this.state;
    oldState.event.push(data);
    this.setState(oldState);
    
  
  console.log(data);
}

   addTask(){
    var MY_TOPIC = 'Render topic';
    PubSub.publish(MY_TOPIC, 'create task'); //publisher 
   }
   componentDidMount() {
    PubSub.subscribe('Add Event', this.mySubscriber); //subscriber to submit button on New Task component
}
  render() {
    return (
      <div className='calendar'>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
        initialView="dayGridMonth"
        timeFormat={
          'hh:mm A'
        }
        eventTimeFormat= {{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        events={[...this.state.event]}
        headerToolbar={{
          left: 'prev,next today',
          center:'title',
          right:'dayGridMonth,timeGridWeek,dayGridDay,listWeek'
        }}
        aspectRatio={1}
        height={600}
        width={400}
        
      />
      <Button  label="add Task" onClick={this.addTask}/>
      </div>
    )
  }
}
export default CalendarComponent;