import React from "react";
import { Component } from "react";
import PubSub from "pubsub-js";
import InputField from "../../InputField";
import { BsPencil } from 'react-icons/bs';
import SelectCategory from "./SelectCategory";
import DateComponent from './DateComponent';
import moment from 'moment';
import Important from "./ImportantComponent";
import Completed from "./CompletedCheckbox";
import Button from './../../Button';
import Storage from "../../Storage";
import axios from "axios";

class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNameReadonly: true,
            isDescrReadonly: true,
            isCatReadOnly: true,
            isDateReadOnly: true,
            taskName: this.props.taskData.taskName,
            taskDescr: this.props.taskData.taskDescr,
            category: this.props.taskData.category,
            dueDate: this.props.taskData.dueDate,
            important: this.props.taskData.important,
            id: this.props.taskData.id,
            color:this.props.taskData.color,
            completed: this.props.taskData.completed
        }
        this.taskInfo = {
            taskName: this.state.taskName,
            taskDescr: this.state.taskDescr,
            category: this.state.category,
            dueDate: this.state.dueDate,
            important: this.state.important,
            id: this.state.id,
            color:this.state.color,
            completed: this.state.completed
        }
        this.isEditable = this.isEditable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
    }
    isEditable(event) {
        if ('changeName' == event.currentTarget.name) {
            this.setState({ isNameReadonly: false })
        }
        if ('changeDescr' == event.currentTarget.name) {
            this.setState({ isDescrReadonly: false })
        }
        if ('changeCat' == event.currentTarget.name) {
            this.setState({ isCatReadOnly: false })
        }
        if ('changeDate' == event.currentTarget.name) {
            this.setState({ isDateReadOnly: false })
        }
    }
    handleChange(event) {
        var userData = this.state;
        userData[event.target.name] = event.target.value;
        this.setState(userData);
    }
    getData(field, data) {
        this.setState({ [field]: data });
    }
    async submit() {
        var StrTask = JSON.stringify(this.taskInfo)
        var updatedTask={
            taskName: this.state.taskName,
            taskDescr: this.state.taskDescr,
            category: this.state.category,
            dueDate: this.state.dueDate,
            important: this.state.important,
            id: this.state.id,
            completed: this.state.completed,
            color: this.state.color
        }
        var updatedTaskStr = JSON.stringify(updatedTask)
        if (StrTask != updatedTaskStr) {
            if(updatedTask.completed==true){
                updatedTask.color='green'
            }
            Storage.replaceItem('id',this.taskInfo.id,updatedTask,'tasks')
            var result = await axios.put('http://localhost:8081/editTask', updatedTask)
            var success=result.data;
            if(success=='success'){
            var calendarEvent = {                       //task data to send to calendar as event
                title: this.state.taskName,
                start: this.state.dueDate,
                allDay: false,
                id: this.taskInfo.id,
                color:updatedTask.color,
                important:this.state.important,
                category: this.state.category,
                completed: this.state.completed
            }
            Storage.replaceItem('id',this.taskInfo.id,calendarEvent,'events')
            var MY_TOPIC = 'change Event';
            PubSub.publish(MY_TOPIC, calendarEvent);
        }
        }
        var MYotherTOPIC = 'Render topic';
            PubSub.publish(MYotherTOPIC, 'cancel task');
    }
    cancel() {
        var MY_TOPIC = 'Render topic';
        PubSub.publish(MY_TOPIC, 'cancel task'); //publisher, goes to right column, rendering default
    }


    render() {
        return (
            <div>
                <input className='taskTitle' readOnly={this.state.isNameReadonly} name='taskName' value={this.state.taskName} type='text' onChange={this.handleChange}></input>
                <button type='button' name='changeName' onClick={this.isEditable}>
                    <  BsPencil className='bsPencil' />
                </button>
                <input readOnly={this.state.isDescrReadonly} name='taskName' value={this.state.taskDescr} type='text' onChange={this.handleChange}></input>
                <button type='button' name='changeDescr' onClick={this.isEditable}>
                    <  BsPencil className='bsPencil' />
                </button>
                <SelectCategory getCategory={this.getData} isCatReadOnly={this.state.isCatReadOnly} category={this.state.category} />
                <button type='button' name='changeCat' onClick={this.isEditable}>
                    <  BsPencil className='bsPencil' />
                </button>
                <DateComponent class='datepick' classbox='datebox' getData={this.getData} taskDue={moment(this.state.dueDate).toDate()} readonly={this.state.isDateReadOnly} />
                <button className='editDate' type='button' name='changeDate' onClick={this.isEditable}>
                    <  BsPencil className='bsPencil' />
                </button>
                <Important getImportantVal={this.getData} important={this.state.important} />
                <Completed getCompletedVal={this.getData} completed={this.state.completed} />
                <Button className="editSaveTask" label="Save" onClick={this.submit} />
                <Button className="editTask" label="Cancel" onClick={this.cancel} />
                <p className='editWindow'> </p>
            </div>
        )
    }
}
export default EditTask;