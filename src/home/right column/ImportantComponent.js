import React from "react";
import { Component } from "react";
import Checkbox from "../../checkbox";

class Important extends Component {
    constructor(props) {
        super(props);
        this.state = {
            important: false
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleCheckboxChange(event) {
        var currentValue = event.target.checked;
        this.setState({ important: currentValue });
        this.props.getImportantVal('important', currentValue);
    }
    render() {
        return (
            <label>
                <Checkbox name='important'
                    checked={this.state.important}
                    onChange={this.handleCheckboxChange}
                />
                <span>Important</span>
            </label>
        )
    }
}
export default Important;