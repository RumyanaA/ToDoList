import React from "react";
import { Component } from "react";
import PubSub from "pubsub-js";
import InputField from "../../InputField";
import Button from "../../Button";
import Storage from "../../Storage";

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskDescr: '',
            important: false,
            category: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);

    }
    handleChange(event) {
        var userData = this.state;
        userData[event.target.name] = event.target.value;
        this.setState(userData);
    }
    async submit(){

    }
    cancel(){
        var MY_TOPIC = 'Render topic';
        PubSub.publish(MY_TOPIC, 'cancel task');
    }



    render() {
        {
            return (
                <div>
                <InputField placeholder='Task name' label='' name='taskName' type='text' onChange={this.handleChange} />
                <InputField placeholder='Task description' label='' name='taskDescr' type='text' onChange={this.handleChange} />
                <Button className="" label="Save" onClick={this.submit} />
                <Button className="" label="Cancel" onClick={this.cancel} />
                </div>
            )
        }
    }
}
export default NewTask;