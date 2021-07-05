import React from "react";
import ReactDOM from 'react-dom';
import InputField from './InputField';
import Button from './Button';

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
      submit(){
          var userData=this.state;
    
      }
    render(){
        return (
            <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">
                <InputField className='login-input'  placeholder='Email' name='email'type='text' onChange={this.handleChange} />    
                <InputField className='login-input'  placeholder='Username' name='username'type='text' onChange={this.handleChange} /> 
                <InputField className='login-input'  placeholder='Password' name='password' onChange={this.handleChange} />
                <Button   label="Register" onClick={this.submit}  />
            </div>
            </div>   
            
        );
    }
}
export default Reg;
