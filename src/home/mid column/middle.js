import React from "react";
import { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import CalendarComponent from "./calendarComponent";
import Notifications from "./notifications";
import Storage from "../../Storage";
import PubSub from 'pubsub-js';
import CookiesJar from "../../CookiesJar";
class Middle extends CookiesJar{
    constructor(props){
        super(props);
        this.urlParam=props.match.params.component;
        this.state={
            event:[]
        }
        this.showImportant = this.showImportant.bind(this);
        this.showAll = this.showAll.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
    }
    addNewTask(msg, data) { //function for publishing
       if(data.important){
        var oldState = this.state.event;
        oldState.push(data);
        this.setState(oldState);
       }
      }
    showAll(msg,data){
        var oldState=this.state.event;
        var importantTasks=Storage.getItems(data, false,'tasks')
        var importantEvents={};
        for(var i=0;i<importantTasks.length;i++){
          importantEvents={
            title: importantTasks[i].taskName,
            start: importantTasks[i].dueDate,
            allDay: false
          }
          oldState.push(importantEvents);
        }
        this.setState(oldState)
    }
    showImportant(msg,data){
        var oldState=this.state.event;
        oldState.length=0;
        var importantTasks=Storage.getItems(data, true,'tasks')
        var importantEvents={};
        for(var i=0;i<importantTasks.length;i++){
          importantEvents={
            title: importantTasks[i].taskName,
            start: importantTasks[i].dueDate,
            allDay: false
          }
          oldState.push(importantEvents);
        }
        this.setState(oldState)
      }
    async componentDidMount(){
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
            allDay: false
          }
          var oldState = this.state;
          oldState.event.push(storeEvents);
          this.setState(oldState);
    
          Storage.setItem(storedtasks[i], 'tasks')
        }
        PubSub.subscribe('show important', this.showImportant);
        PubSub.subscribe('show all', this.showAll);
        PubSub.subscribe('Add Event', this.addNewTask); //subscriber to submit button on New Task component
    }
    render = () => {
        var toRender;
        if(this.props.match.params.component=='notifications'){
            toRender=<Notifications/>
        }
        if(this.props.match.params.component=='calendar' || this.props.match.params.component=='important'){
            toRender=<CalendarComponent data={this.state.event}/>
        }
        
        return (
            <div >
            {toRender}
            </div>
        );
    }
}
export default Middle;