import React from "react";
import { Component } from "react";
import Button from '../../../Button';
import { withRouter } from 'react-router-dom';
import CookiesJar from "../../../CookiesJar";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsPeopleCircle } from 'react-icons/bs';
import { BsGear } from 'react-icons/bs';

class Username extends CookiesJar {
    container = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.username = '';
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.logout = this.logout.bind(this);
        this.getName()
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    getName() {
        var cookie = this.getCookie('userLogToken');
        this.username = cookie.username;
    }
    handleButtonClick() {
        if (this.state.open == false) {
            this.setState({ open: true })
        } else {
            this.setState({ open: false })
        }
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        if (
            this.container.current &&
            !this.container.current.contains(event.target)
        ) {
            this.setState({
                open: false,
            });
        }
    };
    logout() {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        var expiredCookie = this.getCookie('userLogToken');
        this.setCookie('userLogToken', expiredCookie, date)
        this.props.history.push('/');

    }
    render() {
        return (
            <div className='user'>
                <p className='userSet'><BsPeopleCircle className='userCircle' />{this.username}</p>
                <div className="App">
                    <div className="container" ref={this.container}>
                        <button type="button" class="button" onClick={this.handleButtonClick}>
                            <  BsGear className='bsGear' />
                        </button>
                        {this.state.open && (
                            <div class="dropdown">
                                <ul className='dropdownUL'>
                                    <li className='lis'> <Button label='Logout' onClick={this.logout} /></li>
                                    <li className='lis'>My Profile</li>
                                    <li className='lis'>Settings</li>
                                    <li className='lis'>Support</li>
                                    {/* <li className='lis'>Logout</li> */}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Username);