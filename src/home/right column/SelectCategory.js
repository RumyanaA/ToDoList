import React from "react";
import { Component } from "react";
import { Hint } from 'react-autocomplete-hint';
import Storage from "../../Storage";

class SelectCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hintData: [],
            category: this.props.category
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.getStoredCat = this.getStoredCat.bind(this);
        this.onFillOption=this.onFillOption.bind(this);
    }
    getStoredCat() {
        var categories = Storage.getAll('name', 'categories');
        this.setState({ hintData: categories });
    }
    handleChange(event) {
        this.setState({
            category: event.target.value
        });
        var catExistance = this.state.hintData.filter(cat => cat==event.target.value);
        if(catExistance.length>0){
        this.props.getCategory('category', event.target.value);
        }else{
            this.props.getCategory('category', '');
        }
        

    }
    onFillOption(data){
        var catExistance = this.state.hintData.filter(cat => cat==data);
        if(catExistance.length>0){
        this.props.getCategory('category', data);
        }else{
            this.props.getCategory('category', '');
        }
    }
    componentDidMount() {
        this.getStoredCat();
    }
    render() {
        return (
            <div>
                <Hint options={this.state.hintData} allowTabFill onFill={this.onFillOption} >
                    <input className={this.props.stylename} readOnly={this.props.isCatReadOnly} value={this.state.category} name='category' type='text' onChange={this.handleChange}
                    />
                </Hint>
            </div>
        )
    }
}
export default SelectCategory;