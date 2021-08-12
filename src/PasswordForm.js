import React from "react";
import InputField from './InputField';
import Button from './Button';
import axios from 'axios';

class PasswordForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            emailError: '',
            message:''
        } 
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this); 
}
handleChange(event) {
    var userEmail=this.state;
    userEmail[event.target.name]=event.target.value;
    this.setState(userEmail);
  }
  async submit(){
      var userEmail={
          email: this.state.email
      }
    var res = await axios.post('http://localhost:8081/ResetPassword', userEmail);
    var response=res.data;
    if(response=='-1'){
        this.setState({
            emailError:'Email doesnt exists'
          });
    }else{
        this.setState({
         emailError:'',
         message: 'An email has been sent with your new password. Check your spam folder if you do not see it.'
        });

    }

  }

render(){
    return (
        <div className="inner-container">
    <div className="header">
      Reset Password
    </div>
    <div className="box">
            <InputField className='login-input'  label='Enter your email' name='email'type='text' onChange={this.handleChange}  /> 
            <span className="text-error">{this.state.emailError}</span>
            <Button   label="Reset" onClick={this.submit}  />
            <div className='emailmessage' >
                <span className="text-message">{this.state.message}</span>
            </div>

            
        </div>
        </div>   
        
    );
}
}
export default PasswordForm;