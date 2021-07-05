import React from "react";
import Login from "./LoginForm";
import Reg from "./RegForm";
import Button from './Button';
import PasswordForm from "./PasswordForm";
import ForgottenPassword from "./ForgottenPassword";

class LoginReg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false,
            isPassResetOpen: false,
            generatedPassword: ''
        };
        this.showLogBox = this.showLogBox.bind(this);
        this.showRegBox = this.showRegBox.bind(this);
        this.passwordForm= this.passwordForm.bind(this);
        this.sendPassword=this.sendPassword.bind(this);
    }
    showLogBox() {
        this.setState({ isLoginOpen: true, isRegisterOpen: false,isPassResetOpen: false });
    }

    showRegBox() {
        this.setState({  isLoginOpen: false, isRegisterOpen: true, isPassResetOpen: false });
    }
    passwordForm(){
        this.setState({ isLoginOpen: false, isRegisterOpen: false, isPassResetOpen: true });
    }
    sendPassword(){
        //generated password from back-end
        var userData=this.state;
    userData.generatedPassword='aspirin3';
    this.setState(userData);
        this.setState({ isLoginOpen: true, isRegisterOpen: false,isPassResetOpen: false });
    }
    render() {

        if (this.state.isLoginOpen) {
            return (
                <div className='log-form'>
                    <Button label="Login" onClick={this.showLogBox} />
                    <Button label="Register" onClick={this.showRegBox} />
                    <Login onClick={this.passwordForm}/>
                    <ForgottenPassword onClick={this.passwordForm} />
                </div>)
        } else if(this.state.isRegisterOpen){
            return (
                <div className='log-form'>
                    <Button label="Login" onClick={this.showLogBox} />
                    <Button label="Register" onClick={this.showRegBox} />
                    <Reg />
                </div>)
        } else if(this.state.isPassResetOpen){
            return (
                <div className='log-form'>
                    <Button label="Login" onClick={this.showLogBox} />
                    <Button label="Register" onClick={this.showRegBox} />
                    <PasswordForm onClick={this.sendPassword} />
                </div>)
        }

    }
}
export default LoginReg;