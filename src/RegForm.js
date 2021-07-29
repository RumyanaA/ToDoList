import React from "react";
import ReactDOM from 'react-dom';
import InputField from './InputField';
import Button from './Button';
import axios from 'axios';
import ls from 'local-storage';


class Reg extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            username:'',
            password:'',
            usernameError:'',
            emailError:'',
            passwordError:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(event) {
        var userData=this.state;
        userData[event.target.name]=event.target.value;
        this.setState(userData);
      }
      validation(){
          var emailError='';
          var usernameError='';
          var passwordError='';
          const reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(!this.state.username){
              usernameError='Name field is required';
          }
          if(!this.state.password || this.state.password.length<7){
              passwordError='Password must be 7 letters long';
          }
          if(!this.state.email || reg.test(this.state.email===false) ){
              emailError='Email Field is Invalid';
          }
          if(emailError || usernameError || passwordError){
            this.setState({usernameError,emailError,passwordError});
            return false;
        }

        return true;
      }
     async submit() {
         if(this.validation()){
         
          var userData=this.state;
          var res = await axios.post('http://localhost:8081/userInfo', userData);

          var token = res.data;
          localStorage.setItem('token', token);
         }
        }
    render(){
        return (
            <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">
                <InputField className='login-input'  placeholder='Email' name='email'type='email' onChange={this.handleChange} />
                <span className="text-error">{this.state.emailError}</span>    
                <InputField className='login-input'  placeholder='Username' name='username'type='text' onChange={this.handleChange} />
                <span className="text-error">{this.state.usernameError}</span> 
                <InputField className='login-input'  placeholder='Password' name='password'type='password' onChange={this.handleChange} />
                <span className="text-error">{this.state.passwordError}</span>
                <Button   label="Register" onClick={this.submit}  />
            </div>
            </div>   
            
        );
    }
}
export default Reg;
