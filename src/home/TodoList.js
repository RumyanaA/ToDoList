import React, { Component } from 'react';
import LeftColumn from './left column/LeftColumn';
import App from '../App';
import Notifications from './mid column/notifications';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RightColumn from './right column/RightColumn';
export default class TodoList extends Component {

    render = () => {
        return (
            <div className='layout'>
                <Switch>
                    <Route path="/todoList/:component" component={Notifications} />

                </Switch>

                <div className='leftColumn'><LeftColumn /></div>
                <div className='screen'></div>
                <div className='rightColumn'><RightColumn/></div>
            </div>
        );
    }
}