import React from "react";
import InputField from './InputField';
import Button from './Button';

class PasswordForm extends React.Component{
    constructor(props){
        super(props);  
}

render(){
    return (
        <div className="inner-container">
    <div className="header">
      Reset Password
    </div>
    <div className="box">
        {/* onChange={this.handleChange} */}
        
            <InputField className='login-input'  label='Enter your email' name='email'type='text'  /> 
            
            <Button   label="Reset" onClick={this.props.onClick}  />
            
        </div>
        </div>   
        
    );
}
}
export default PasswordForm;