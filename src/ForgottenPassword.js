import React from "react";
function ForgottenPassword(props){
    return(
    <a className='password-link' onClick={props.onClick} href >Forgot password?</a>
    );
}
export default ForgottenPassword;

