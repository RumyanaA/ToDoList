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
      event: [],
      checkedCategories:[]
    }
    this.token=null;
    this.showImportant = this.showImportant.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.showAll = this.showAll.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.manageCategory = this.manageCategory.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.getCategories=this.getCategories.bind(this);
  }
  getCategories(msg,data){
    
    var catNames=[]
    for(var i=0;i<data.length;i++){
      catNames.push(data[i].name)
    }
    this.setState({checkedCategories:catNames})
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
    var tasksFromCategory
    var tasksTostate
    var oldState = this.state.event;
    oldState.length = 0;
    for (var i = 0; i < data.length; i++) {
      if(this.props.match.params.component=='important'){
         tasksFromCategory= Storage.getItems('category', data[i], 'tasks')
         tasksTostate = tasksFromCategory.filter(task=>task.important==true)
      }else if(this.props.match.params.component=='completed'){
       tasksFromCategory = Storage.getItems('category', data[i], 'tasks')
       tasksTostate = tasksFromCategory.filter(task=>task.completed==true)
      }else{
        tasksFromCategory= Storage.getItems('category', data[i],'tasks')
        tasksTostate=tasksFromCategory.filter(task=>task.completed==false)
      }
      var eventsFromCategory = {};
      for (var j = 0; j < tasksTostate.length; j++) {
        eventsFromCategory = {
          title: tasksTostate[j].taskName,
          start: tasksTostate[j].dueDate,
          allDay: false,
          important:tasksTostate[j].important,
          completed:tasksTostate[j].completed,
          color:tasksTostate[j].color,
          id:tasksTostate[j]._id,
          category: tasksTostate[j].category
        }
        oldState.push(eventsFromCategory);
      }
    }
    this.setState({event:oldState, checkedCategories:data})
    
  }

  showAll(msg, data) {
    var allTasksFromCat=[]
    var oldState = this.state.event;
    var categories=this.state.checkedCategories;
    oldState.length = 0;
    var tasks = Storage.getField('tasks')
    for(var j=0;j<categories.length;j++){
      allTasksFromCat.push(...tasks.filter(item=>item.category==categories[j]));
    }
    
    var events = {};
    for (var i = 0; i < allTasksFromCat.length; i++) {
      if(!allTasksFromCat[i].completed){
      events = {
        title: allTasksFromCat[i].taskName,
        start: allTasksFromCat[i].dueDate,
        allDay: false,
        color: allTasksFromCat[i].color,
        important: allTasksFromCat[i].important,
        completed:allTasksFromCat[i].completed,
        id:allTasksFromCat[i]._id,
        category: allTasksFromCat[i].category
      }
      oldState.push(events);
    }
    }
    this.setState({event:oldState})
  
  }
  showCompleted(msg, data) {
    var completedTasksFromCat=[]
    var categories=this.state.checkedCategories
    var oldState = this.state.event;
    oldState.length = 0;
    var completedTasks = Storage.getItems(data, true, 'tasks')
    for(var j=0;j<categories.length;j++){
      completedTasksFromCat.push(...completedTasks.filter(item=>item.category==categories[j]));
    }
    var completedEvents = {};
    for (var i = 0; i < completedTasksFromCat.length; i++) {
      completedEvents = {
        title: completedTasksFromCat[i].taskName,
        start: completedTasksFromCat[i].dueDate,
        allDay: false,
        category: completedTasksFromCat[i].category,
        id: completedTasksFromCat[i]._id,
        important: completedTasksFromCat[i].important,
        completed: completedTasksFromCat[i].completed,
        color:completedTasksFromCat[i].color
      }
      oldState.push(completedEvents);
    }
    this.setState({event:oldState})
  }
  showImportant(msg, data) {
    var categories=this.state.checkedCategories
    var importantTasksFromCat=[];
    var oldState = this.state.event;
    oldState.length = 0;
    var importantTasks = Storage.getItems(data, true, 'tasks')
    for(var j=0;j<categories.length;j++){
      importantTasksFromCat.push(...importantTasks.filter(item=>item.category==categories[j]));
    }
   
    
    var importantEvents = {};
    for (var i = 0; i < importantTasksFromCat.length; i++) {
      if(!importantTasksFromCat[i].completed){
      importantEvents = {
        title: importantTasksFromCat[i].taskName,
        start: importantTasksFromCat[i].dueDate,
        allDay: false,
        category: importantTasksFromCat[i].category,
        id:importantTasksFromCat[i]._id,
        important: importantTasksFromCat[i].important,
        completed: importantTasksFromCat[i].completed,
        color:importantTasksFromCat[i].color
      }
      oldState.push(importantEvents);
    }
    }
    this.setState({event:oldState})
  }
  async componentDidMount() {
    var MYotherTOPIC = 'Render topic';
            PubSub.publish(MYotherTOPIC, 'cancel task');
            var categories=[]
       
    var storeEvents = {}
    var cookie = this.getCookie('userLogToken');
    var token = cookie.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    var res = await axios.get('http://localhost:8081/getAllTasks', config)
    var storedtasks = res.data;
    Storage.clearField('tasks')
    var oldState = this.state.event;
    categories=Storage.getPropValues('name','isChecked',true,'categories')
       this.setState({checkedCategories:categories})
    for (var i = 0; i < storedtasks.length; i++) {
      if(!storedtasks[i].completed && categories.includes(storedtasks[i].category)){
        
      storeEvents = {
        title: storedtasks[i].taskName,
        start: storedtasks[i].dueDate,
        allDay: false,
        category: storedtasks[i].category,
        id: storedtasks[i]._id,
        important: storedtasks[i].important,
        completed: storedtasks[i].completed,
        color: storedtasks[i].color
      }
      
      oldState.push(storeEvents);
      
    } 
    
    this.setState({event:oldState});
      Storage.setItem(storedtasks[i], 'tasks')
      
    }
    
    if (this.props.match.params.component == 'important'){
      
      this.showImportant('show important','important')
    }
    if (this.props.match.params.component == 'completed'){
      this.showCompleted('show completed','completed')
    }
    PubSub.subscribe('show important', this.showImportant);
    PubSub.subscribe('show completed', this.showCompleted);
    PubSub.subscribe('manage category', this.manageCategory);
    this.token=PubSub.subscribe('show all', this.showAll);
    PubSub.subscribe('Add Event', this.addNewTask); //subscriber to submit button on New Task component
    PubSub.subscribe('change Event', this.editTask);
    PubSub.subscribe('remove Event', this.removeEvent);
    PubSub.subscribe('get categories', this.getCategories)
  }
  componentWillUnmount(){
    PubSub.unsubscribe('show all');
    PubSub.unsubscribe('show important');
    PubSub.unsubscribe('show completed');
    PubSub.unsubscribe('manage category');
    // PubSub.unsubscribe('get categories');
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
     if (this.props.match.params.component == 'completed') {

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