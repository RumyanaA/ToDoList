import React from "react";
import InputField from './InputField';
import Button from './Button';
import ForgottenPassword from "./ForgottenPassword";
class Login extends React.Component{
    constructor(props){
        super(props);
        
    this.state = {
        username: '',
        password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);

}
handleChange(event) {
    var userData=this.state;
    userData[event.target.name]=event.target.value;
    this.setState(userData);
  }
  submit(){
      var userData=this.state;

  }
  
    render(){
        return (
            <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">
            
                <InputField  className='login-input'  placeholder='username' label='' name='username' type='text' onChange={this.handleChange} /> 
                <InputField className='login-input'  placeholder='password' name='password' onChange={this.handleChange} />
                <Button   label="Login" onClick={this.submit}  />
                {/* <ForgottenPassword onClick={this.props.onClick} /> */}
            </div>
            </div>   
            
        );
    }
}
export default Login;
