import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        this.props.getData('dueDate', date.toString());
    }
    render(){
        return(
            <DatePicker 
            placeholderText='Task due...'
            selected={this.state.startDate} 
            onChange={this.handleDateChange}
            calendarClassName="rasta-stripes"
            showTimeSelect
            timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption='time'
            name="startDate"
            dateFormat="MMMM d, yyyy h:mm aa">            
            </DatePicker>
        )
    }

}
export default DateComponent;