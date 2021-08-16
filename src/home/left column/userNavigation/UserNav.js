import React from "react";
import { Component } from "react";
import Button from '../../../Button';
import { withRouter } from 'react-router-dom';
import Username from "./Username";

class UserNav extends Component{
    constructor(props){
        super(props);
        
        this.notifications=this.notifications.bind(this);
        this.today=this.today.bind(this);
        this.calendar=this.calendar.bind(this);
        this.important=this.important.bind(this);
        this.completed=this.completed.bind(this);
        this.trash=this.trash.bind(this);
        
    }
    notifications(){
        this.props.history.push('/todoList/notifications');
    }
    today(){

    }
    calendar(){
        this.props.history.push('/todoList/calendar');
    }
    important(){

    }
    completed(){

    }
    trash(){
        
    }
    render(){
        return(<div> <h3><Username/></h3>
            <ul className='ulButtons'>
            <li className='Navli'><Button className='navBarButton' label="Notifications" onClick={this.notifications} /></li>
           <li className='Navli'> <Button className='navBarButton' label="Today" onClick={this.today} /></li>
            <li className='Navli'><Button className='navBarButton' label="Calendar" onClick={this.calendar} /></li>
           <li className='Navli'> <Button className='navBarButton' label="Important" onClick={this.important} /></li>
           <li className='Navli'> <Button className='navBarButton' label="Completed" onClick={this.completed} /></li>
           <li className='Navli'> <Button className='navBarButton' label="Trash" onClick={this.trash} /></li>
            
            </ul>
            </div>
        )
    }
}
export default withRouter(UserNav);