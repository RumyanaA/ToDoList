import React, { Fragment } from "react";
function Button(props) {
    return (
      <button className="button" onClick={props.onClick}>
        {props.label}
      </button>
    );
   }
   export default Button;