import React, { Fragment } from "react";
function Button(props) {
    return (
      <button className={props.className} data-toggle={props.datatoggle} onClick={props.onClick}>
        {props.label}
      </button>
    );
   }
   export default Button;