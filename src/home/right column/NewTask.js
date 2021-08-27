import React from "react";
import { Component } from "react";
import PubSub from "pubsub-js";
import InputField from "../../InputField";
import SelectCategory from "./SelectCategory";
import Important from "./ImportantComponent";
import Button from "../../Button";
import Storage from "../../Storage";
import DateComponent from "./DateComponent";

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskDescr: '',
            important: false,
            dueDate: '',
            category: ''
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
    submit() {
        console.log(this.state.dueDate)
    }
    cancel() {
        var MY_TOPIC = 'Render topic';
        PubSub.publish(MY_TOPIC, 'cancel task');
    }

    render() {
        {
            return (
                <div className='createTask'>
                    <InputField placeholder='Task name' label='' name='taskName' type='text' onChange={this.handleChange} />
                    <InputField placeholder='Task description' label='' name='taskDescr' type='text' onChange={this.handleChange} />
                    <SelectCategory getCategory={this.getData} />
                    <DateComponent getData={this.getData} />
                    <Important getImportantVal={this.getData} />
                    <Button className="manageTask" label="Save" onClick={this.submit} />
                    <Button className="manageTask" label="Cancel" onClick={this.cancel} />
                </div>
            )
        }
    }
}
export default NewTask;