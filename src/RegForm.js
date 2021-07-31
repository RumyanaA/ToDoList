import React from "react";
import Cookies from 'universal-cookie';
import InputField from './InputField';
import Button from './Button';
import axios from 'axios';



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
         
            var userData={
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            }
          var res = await axios.post('http://localhost:8081/Register', userData);
          var token = res.data;
          const cookies = new Cookies();
        //   var now=new Date();
        //   var date=new Date(now.getTime()+2*60000);
          
          cookies.set('userToekn', token);
          
          
         }
        }
    render(){
        return (
            <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">
                <InputField className='login-input'  placeholder='Email' name='email'type='text' onChange={this.handleChange} />
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
