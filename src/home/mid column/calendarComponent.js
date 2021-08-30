import React from 'react';
import { Component } from "react";
import axios from 'axios';
import PubSub from 'pubsub-js'
import CookiesJar from '../../CookiesJar';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin, { DayGridView } from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import Storage from '../../Storage';
import Button from '../../Button';

 class CalendarComponent extends CookiesJar {
   constructor(props){
     super(props);
     this.state={
       event: []
     }
     this.mySubscriber = this.mySubscriber.bind(this);
   }
   Events;
  
mySubscriber(msg,data){ //function for publishing
  
    var oldState=this.state.event;
    oldState.push(data);
    this.setState(oldState);
    
  
  console.log(data);
}

   addTask(){
    var MY_TOPIC = 'Render topic';
    PubSub.publish(MY_TOPIC, 'create task'); //publisher 
   }
  async componentDidMount() {
    var storeEvents={}
    var cookie = this.getCookie('userLogToken');
        var token=cookie.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var res = await axios.get('http://localhost:8081/getAllTasks', config)
        var storedtasks = res.data;
        for(var i=0;i<storedtasks.length;i++){
          storeEvents={
            title: storedtasks[i].taskName,
                start: storedtasks[i].dueDate,
                allDay: false
          }
          var oldState=this.state;
          oldState.event.push(storeEvents);
          this.setState(oldState);

          Storage.setItem(storedtasks[i], 'tasks')
      }
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
        dayMaxEvents={true}

        
      />
      <Button  label="add Task" onClick={this.addTask}/>
      </div>
    )
  }
}
export default CalendarComponent;