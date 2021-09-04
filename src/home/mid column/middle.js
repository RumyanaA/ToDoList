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
    this.showAll = this.showAll.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.manageCategory = this.manageCategory.bind(this);

  }
  addNewTask(msg, data) { //function for publishing
    var oldState = this.state.event;
    oldState.push(data);
    this.setState(oldState);

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
      events = {
        title: tasks[i].taskName,
        start: tasks[i].dueDate,
        allDay: false,
        category: tasks[i].category
      }
      oldState.push(events);
    }
    this.setState(oldState)
  }
  showImportant(msg, data) {
    var oldState = this.state.event;
    oldState.length = 0;
    var importantTasks = Storage.getItems(data, true, 'tasks')
    var importantEvents = {};
    for (var i = 0; i < importantTasks.length; i++) {
      importantEvents = {
        title: importantTasks[i].taskName,
        start: importantTasks[i].dueDate,
        allDay: false,
        category: importantTasks[i].category
      }
      oldState.push(importantEvents);
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
      storeEvents = {
        title: storedtasks[i].taskName,
        start: storedtasks[i].dueDate,
        allDay: false,
        category: storedtasks[i].category
      }
      var oldState = this.state;
      oldState.event.push(storeEvents);
      this.setState(oldState);

      Storage.setItem(storedtasks[i], 'tasks')
    }
    PubSub.subscribe('show important', this.showImportant);

    PubSub.subscribe('manage category', this.manageCategory);
    PubSub.subscribe('show all', this.showAll);
    PubSub.subscribe('Add Event', this.addNewTask); //subscriber to submit button on New Task component
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