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
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(event) {
        var userData=this.state;
        userData[event.target.name]=event.target.value;
        this.setState(userData);
      }
     async submit() {
         
          var userData=this.state;
          var res = await axios.post('http://localhost:8081/userInfo', userData);

          var token = res.data;
          localStorage.setItem('token', token);
        }
    render(){
        return (
            <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">
                <InputField className='login-input'  placeholder='Email' name='email'type='email' onChange={this.handleChange} />    
                <InputField className='login-input'  placeholder='Username' name='username'type='text' onChange={this.handleChange} /> 
                <InputField className='login-input'  placeholder='Password' name='password'type='password' onChange={this.handleChange} />
                <Button   label="Register" onClick={this.submit}  />
            </div>
            </div>   
            
        );
    }
}
export default Reg;
