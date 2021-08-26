import React from "react";
import { Component } from "react";
import PubSub from "pubsub-js";
import InputField from "../../InputField";
import { Hint } from "react-autocomplete-hint";
import SelectCategory from "./SelectCategory";
import Button from "../../Button";
import Checkbox from "../../checkbox";
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
        this.getCategory = this.getCategory.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);


    }
    handleCheckboxChange = event =>
    this.setState({ important: event.target.checked })
    

    handleChange(event) {
        var userData = this.state;
        userData[event.target.name] = event.target.value;
        this.setState(userData);
    }
    getCategory(field,data) {
        // var oldState= this.state;
        // oldState[field]=data;
        this.setState({[field]:data});

    }
     submit() {
        console.log(this.state.category)
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

                    <SelectCategory getCategory={this.getCategory} />
                    <label>
          <Checkbox name='important'
            checked={this.state.important}
            onChange={this.handleCheckboxChange}
          />
          <span>Important</span>
        </label>
                        <Button className="manageTask" label="Save" onClick={this.submit} />
                        <Button className="manageTask" label="Cancel" onClick={this.cancel} />
                </div>
                    )
        }
    }
}
                    export default NewTask;