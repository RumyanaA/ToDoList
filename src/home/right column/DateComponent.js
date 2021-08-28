import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class DateComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            StartDate: new Date()
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    handleDateChange(date){
        this.setState({startDate: date});
        this.props.getData('dueDate', moment(date).format("YYYY-MM-DD"));
    }
    render(){
        return(
            <DatePicker 
            placeholderText='Task due...'
            selected={this.state.startDate} 
            onChange={this.handleDateChange}
            calendarClassName="rasta-stripes"
            // showTimeSelect
            // timeFormat="HH:mm"
            //   timeIntervals={30}
            //   timeCaption='time'
            name="startDate"
            // dateFormat="MMMM d, yyyy h:mm aa"
            dateFormat="MMMM d, yyyy">            
            </DatePicker>
        )
    }

}
export default DateComponent;