import React from "react";
import { Component } from "react";
import { Hint } from 'react-autocomplete-hint';
import Storage from "../../Storage";
import InputField from "../../InputField";
import { text } from "body-parser";
class SelectCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hintData: [],

            category: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.getStoredCat = this.getStoredCat.bind(this);
    }
    getStoredCat() {
        var categories = Storage.getAll('name', 'categories');
        this.setState({ hintData: categories });
    }
    handleChange(event) {
        this.setState({
            category: event.target.value
        });
        this.props.getCategory(this.state.category);

    }
    componentDidMount() {
        this.getStoredCat();
    }
    render() {
        return (
            <div>
                <Hint options={this.state.hintData} allowTabFill >
                    <input className='input-with-hint' name='category' type='text' onChange={this.handleChange}
                    />
                </Hint>
            </div>
        )
    }
}
export default SelectCategory;