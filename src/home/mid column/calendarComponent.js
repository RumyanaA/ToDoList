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

class CalendarComponent extends Component {
  constructor(props) {
    super(props);
  }

  addTask() {
    var MY_TOPIC = 'Render topic';
    PubSub.publish(MY_TOPIC, 'create task'); //publisher 
  }
  editEvent(info){
    var selectedEventObj=info.event;
    
    var selectedTask=Storage.getItem('_id',selectedEventObj.id, 'tasks')
    var MY_TOPIC = 'Edit task';
    PubSub.publish(MY_TOPIC, selectedTask);
    
  }
  
  render() {
    return (
      <div className='calendar'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          eventColor='blue'
          timeFormat={
            'hh:mm A'
          }
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          events={[...this.props.data]}
          eventClick={this.editEvent}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek'
          }}
          aspectRatio={1}
          height={600}
          width={400}
          dayMaxEvents={true}
        />
       {this.props.renderButton? <Button label="add Task" onClick={this.addTask} />: null} 
      </div>
    )
  }
}
export default CalendarComponent;