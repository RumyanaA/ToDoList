import React from "react";
import { Component } from "react";
import Checkbox from "../../checkbox";

class Completed extends Component {
    constructor(props) {
        super(props);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleCheckboxChange(event) {
        var currentValue = event.target.checked;
        this.props.getCompletedVal('completed', currentValue);
    }
    render() {
        return (
            <label className='completed'> 
                <Checkbox name='completed'
                    checked={this.props.completed}
                    onChange={this.handleCheckboxChange}
                />
                <span>Completed</span>
            </label>
        )
    }
}
export default Completed;