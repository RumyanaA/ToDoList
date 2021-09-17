import React from "react";
import { Component } from "react";
import Button from '../../../Button';
import { withRouter } from 'react-router-dom';
import Username from "./Username";
import PubSub from 'pubsub-js'

class UserNav extends Component{
    constructor(props){
        super(props);
        
        this.home=this.home.bind(this);
        this.calendar=this.calendar.bind(this);
        this.important=this.important.bind(this);
        this.completed=this.completed.bind(this);
        
        
    }
    home(){
        this.props.history.push('/todoList');
    }
    calendar(){
        this.props.history.push('/todoList/calendar');
        var MY_TOPIC = 'show all';
        PubSub.publish(MY_TOPIC, 'important');
    }
    important(){  
        this.props.history.push('/todoList/important');     
        var MY_TOPIC = 'show important';
        PubSub.publish(MY_TOPIC, 'important');
    }
    completed(){
        this.props.history.push('/todoList/completed');
        var MY_TOPIC = 'show completed';
        PubSub.publish(MY_TOPIC, 'completed');
    }
    
    render(){
        return(<div> <h3><Username/></h3>
            <ul className='ulButtons'>
            <li className='Navli'><Button className='navBarButton' label="Home" onClick={this.home} /></li>
            <li className='Navli'><Button className='navBarButton' label="Calendar" onClick={this.calendar} /></li>
           <li className='Navli'> <Button className='navBarButton' label="Important" onClick={this.important} /></li>
           <li className='Navli'> <Button className='navBarButton' label="Completed" onClick={this.completed} /></li>
           
            
            </ul>
            </div>
        )
    }
}
export default withRouter(UserNav);