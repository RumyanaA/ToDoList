import React from "react";
import { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import CalendarComponent from "./calendarComponent";
import Notifications from "./notifications";
import Storage from "../../Storage";
import PubSub from 'pubsub-js';
import CookiesJar from "../../CookiesJar";
class Middle extends CookiesJar {
  constructor(props) {
    super(props);
    this.urlParam = props.match.params.component;
    this.state = {
      event: []
    }
    this.showImportant = this.showImportant.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.showAll = this.showAll.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.manageCategory = this.manageCategory.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
  }
  addNewTask(msg, data) { //function for publishing
    var oldState = this.state.event;
    oldState.push(data);
    this.setState(oldState);

  }
  editTask(msg,data){
    var prevState=this.state.event;
    var index=prevState.findIndex(item => item.id == data.id)
    if(index>-1){
      prevState[index]=data      
      this.setState(prevState)
    }

  }
  removeEvent(msg, data){
    var prevState=this.state.event;
    var index = prevState.findIndex(item=>item.id == data)
      if(index >- 1){
        prevState.splice(index,1)
      }
      this.setState(prevState)
    
  }
  manageCategory(msg, data) {
    
    var oldState = this.state.event;
    oldState.length = 0;
    for (var i = 0; i < data.length; i++) {
      var tasksFromCategory = Storage.getItems('category', data[i], 'tasks')
      var eventsFromCategory = {};
      for (var j = 0; j < tasksFromCategory.length; j++) {
        eventsFromCategory = {
          title: tasksFromCategory[j].taskName,
          start: tasksFromCategory[j].dueDate,
          allDay: false,
          important:tasksFromCategory[j].important,
          completed:tasksFromCategory[j].completed,
          color:tasksFromCategory[j].color,
          id:tasksFromCategory[j].id,
          category: tasksFromCategory[j].category
        }
        oldState.push(eventsFromCategory);
      }
    }
    this.setState(oldState)
  }

  showAll(msg, data) {
    var oldState = this.state.event;
    oldState.length = 0;
    var tasks = Storage.getField('tasks')
    
    
    var events = {};
    for (var i = 0; i < tasks.length; i++) {
      if(!tasks[i].completed){
      events = {
        title: tasks[i].taskName,
        start: tasks[i].dueDate,
        allDay: false,
        color: tasks[i].color,
        important: tasks[i].important,
        completed:tasks[i].completed,
        id:tasks[i].id,
        category: tasks[i].category
      }
      oldState.push(events);
    }
    }
    this.setState(oldState)
  
  }
  showCompleted(msg, data) {
    var oldState = this.state.event;
    oldState.length = 0;
    var completedTasks = Storage.getItems(data, true, 'tasks')
    var completedEvents = {};
    for (var i = 0; i < completedTasks.length; i++) {
      completedEvents = {
        title: completedTasks[i].taskName,
        start: completedTasks[i].dueDate,
        allDay: false,
        category: completedTasks[i].category,
        id: completedTasks[i].id,
        important: completedTasks[i].important,
        completed: completedTasks[i].completed,
        color:completedTasks[i].color
      }
      oldState.push(completedEvents);
    }
    this.setState(oldState)
  }
  showImportant(msg, data) {
    var oldState = this.state.event;
    oldState.length = 0;
    var importantTasks = Storage.getItems(data, true, 'tasks')
   
    
    var importantEvents = {};
    for (var i = 0; i < importantTasks.length; i++) {
      if(!importantTasks[i].completed){
      importantEvents = {
        title: importantTasks[i].taskName,
        start: importantTasks[i].dueDate,
        allDay: false,
        category: importantTasks[i].category,
        id:importantTasks[i].id,
        important: importantTasks[i].important,
        completed: importantTasks[i].completed,
        color:importantTasks[i].color
      }
      oldState.push(importantEvents);
    }
    }
    this.setState(oldState)
  }
  async componentDidMount() {
    var storeEvents = {}
    var cookie = this.getCookie('userLogToken');
    var token = cookie.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    var res = await axios.get('http://localhost:8081/getAllTasks', config)
    var storedtasks = res.data;
    
    for (var i = 0; i < storedtasks.length; i++) {
      if(!storedtasks[i].completed){
      storeEvents = {
        title: storedtasks[i].taskName,
        start: storedtasks[i].dueDate,
        allDay: false,
        category: storedtasks[i].category,
        id: storedtasks[i].id,
        important: storedtasks[i].important,
        completed: storedtasks[i].completed,
        color: storedtasks[i].color
      }
      var oldState = this.state;
      oldState.event.push(storeEvents);
      this.setState(oldState);
    }

      Storage.setItem(storedtasks[i], 'tasks')
    }
    PubSub.subscribe('show important', this.showImportant);
    PubSub.subscribe('show completed', this.showCompleted);
    PubSub.subscribe('manage category', this.manageCategory);
    PubSub.subscribe('show all', this.showAll);
    PubSub.subscribe('Add Event', this.addNewTask); //subscriber to submit button on New Task component
    PubSub.subscribe('change Event', this.editTask);
    PubSub.subscribe('remove Event', this.removeEvent);
  }
  render = () => {
    var toRender;
    if (this.props.match.params.component == 'notifications') {
      toRender = <Notifications />
    }
    if (this.props.match.params.component == 'calendar' /*&& window.location.pathname !='/todoList/calendar'*/) {
      toRender = <CalendarComponent data={this.state.event} />

    } if (this.props.match.params.component == 'important') {

      toRender = <CalendarComponent data={this.state.event} />
    }

    return (
      <div >
        {toRender}
      </div>
    );
  }
}
export default Middle;