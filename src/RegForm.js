import React from "react";
import InputField from './InputField';
import Button from './Button';
import axios from 'axios';
import CookiesJar from "./CookiesJar";

class Reg extends CookiesJar {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
            userError: '',
            message: ''
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
        var emailError = '';
        var usernameError = '';
        var passwordError = '';
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.username) {
            usernameError = 'Name field is required';
        }
        if (!this.state.password || this.state.password.length < 7) {
            passwordError = 'Password must be 7 letters long';
        }
        if (!this.state.email || reg.test(this.state.email === false)) {
            emailError = 'Email Field is Invalid';
        }
        if (emailError || usernameError || passwordError) {
            this.setState({ usernameError, emailError, passwordError });
            return false;
        }

        return true;
    }
    async submit() {
        if (this.validation()) {

            var userData = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            }
            var res = await axios.post('http://localhost:8081/Register', userData);
            var response = res.data;
            if (response == 'e.email') {

                this.setState({
                    usernameError: '',
                    emailError: 'Email already exists',
                    passwordError: ''
                });
            } else if (response == 'e.username') {
                this.setState({
                    emailError: '',
                    passwordError: '',
                    usernameError: 'Username already exists'
                });
            } else {
                this.setState({
                    emailError: '',
                    passwordError: '',
                    usernameError: '',
                    message: 'Confirmation email has been sent. If you do not see it, check your spam folder.'
                });


            }


        }
    }
    render() {
        return (
            <div className="inner-container">
                <div className="header">
                    Register
                </div>
                <div className="box">
                    <InputField className='login-input' placeholder='Email' name='email' type='text' onChange={this.handleChange} />
                    <span className="text-error">{this.state.emailError}</span>
                    <InputField className='login-input' placeholder='Username' name='username' type='text' onChange={this.handleChange} />
                    <span className="text-error">{this.state.usernameError}</span>
                    <InputField className='login-input' placeholder='Password' name='password' type='password' onChange={this.handleChange} />
                    <span className="text-error">{this.state.passwordError}</span>
                    <Button className="button" label="Register" onClick={this.submit} />
                    <div className='emailmessage' >
                        <span className="text-message">{this.state.message}</span>
                    </div>
                </div>
            </div>

        );
    }
}
export default Reg;
