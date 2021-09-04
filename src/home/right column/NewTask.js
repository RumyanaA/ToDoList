import React from "react";
import { Component } from "react";
import PubSub from "pubsub-js";
import InputField from "../../InputField";
import SelectCategory from "./SelectCategory";
import Important from "./ImportantComponent";
import Button from "../../Button";
import Storage from "../../Storage";
import DateComponent from "./DateComponent";
import CookiesJar from "../../CookiesJar";
import axios from "axios";

class NewTask extends CookiesJar {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskDescr: '',
            important: false,
            dueDate: '',
            category: '',
            allDay: false,
            categoryError: '',
            dateError: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getData = this.getData.bind(this);
    }
    handleChange(event) {
        var userData = this.state;
        userData[event.target.name] = event.target.value;
        this.setState(userData);
    }
    getData(field, data) {
        this.setState({ [field]: data });
    }
    validation() {
        var dateError = '';
        var categoryError = '';
        if (!this.state.category) {
            categoryError = 'Category field is requiered';
        }
        if (!this.state.dueDate) {
            dateError = 'Please pick date and time for your task!!!!!!!'
        }
        if (dateError || categoryError) {
            this.setState({ dateError, categoryError });
            return false;
        } else {
            return true;
        }

    }
    async submit() {
        if (this.validation()) {
            var categoryId = Storage.getItem('name', this.state.category, 'categories') //task data
            var token = this.getCookie('userLogToken');                             //to insert
            var taskData = {                                                         //in database
                taskName: this.state.taskName,
                taskDescr: this.state.taskDescr,
                important: this.state.important,
                dueDate: this.state.dueDate,
                category: this.state.category,
                
            }
            taskData.createdby = token.token;
            taskData.categoryId = categoryId.id;
            var result = await axios.post('http://localhost:8081/saveNewTask', taskData)
            taskData.id = result.data;
            delete taskData.createdby;                  //remove object createdby property before inserting into storage
            Storage.setItem(taskData, 'tasks')
            var calendarEvent = {                       //task data to send to calendar as event
                title: this.state.taskName,
                start: this.state.dueDate,
                allDay: false,
                important:this.state.important,
                category: this.state.category
            }
            
            var MY_TOPIC = 'Add Event';
            PubSub.publish(MY_TOPIC, calendarEvent); //publisher, goes to middle, rendering events
            
            var MYotherTOPIC = 'Render topic';
            PubSub.publish(MYotherTOPIC, 'cancel task');
        }
    }
    cancel() {
        var MY_TOPIC = 'Render topic';
        PubSub.publish(MY_TOPIC, 'cancel task'); //publisher, goes to right column, rendering default
    }

    render() {
        {
            return (
                <div className='createTask'>
                    <InputField placeholder='Task name' label='' name='taskName' type='text' onChange={this.handleChange} />
                    <InputField placeholder='Task description' label='' name='taskDescr' type='text' onChange={this.handleChange} />
                    <SelectCategory getCategory={this.getData} />
                    <span className="text-error">{this.state.categoryError}</span>
                    <DateComponent getData={this.getData} />
                    <span className="text-error">{this.state.dateError}</span>
                    <Important getImportantVal={this.getData} />
                    <Button className="manageTask" label="Save" onClick={this.submit} />
                    <Button className="manageTask" label="Cancel" onClick={this.cancel} />
                </div>
            )
        }
    }
}
export default NewTask;