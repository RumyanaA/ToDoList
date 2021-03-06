import React from "react";
import InputField from './InputField';
import Button from './Button';
import axios from 'axios';
import CookiesJar from "./CookiesJar";
import { withRouter } from 'react-router-dom';
class Login extends CookiesJar {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            userError: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);

    }
    handleChange(event) {
        var userData = this.state;
        userData[event.target.name] = event.target.value;
        this.setState(userData);
    }
    validation() {
        var usernameError = '';
        var passwordError = '';
        if (!this.state.username) {
            usernameError = 'Username field is requiered';
        }
        if (!this.state.password || this.state.password.length < 7) {
            passwordError = 'Password must be 7 letters long'
        }
        if (usernameError || passwordError) {
            this.setState({ usernameError, passwordError });
            return false;
        } else {
            return true;
        }

    }
    async submit() {
        if (this.validation()) {
            var userData = {
                username: this.state.username,
                password: this.state.password,
            }
            var res = await axios.post('http://localhost:8081/Login', userData);
            var token = res.data;
            if (token == '-1') {
                //   this.userError='User not found';
                this.setState({
                    userError: 'Wrong username or password'
                });
            } else {
                var userObj={
                    token: token,
                    username: this.state.username
                }
                this.setCookie('userLogToken', userObj,'');
                this.props.history.push('/todoList');
            }

            //login user
        }
    }

    render() {
        return (
            <div className="inner-container">
                <div className="header">
                    Login
                </div>
                <div className="box">

                    <InputField className='login-input' placeholder='username' label='' name='username' type='text' onChange={this.handleChange} />
                    <span className="text-error">{this.state.usernameError}</span>
                    <InputField className='login-input' placeholder='password' name='password' type='password' onChange={this.handleChange} />
                    <span className="text-error">{this.state.passwordError}</span>
                    <span className="text-error">{this.state.userError}</span>
                    <Button className="buttons" label="Login" onClick={this.submit} />
                </div>
            </div>

        );
    }
}
export default withRouter(Login);
