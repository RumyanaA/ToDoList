import React, { Component } from 'react';
import LeftColumn from './left column/LeftColumn';
import Notifications from './mid column/notifications';
import Calendar from './mid column/calendar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RightColumn from './right column/RightColumn';
import Middle from './mid column/middle';
export default class TodoList extends Component {

    render = () => {
        return (
            <div className='layout'>
                <Switch>
                    <Route  path="/todoList/:component" component={Middle} />


                </Switch>

                <div className='leftColumn'><LeftColumn /></div>
                <div className='screen'></div>
                <div className='rightColumn'><RightColumn /></div>
            </div>
        );
    }
}