import React from "react";
import { Component } from "react";
import UserNav from "./userNavigation/UserNav";
class LeftColumn extends Component{
    render = () => {
        return (
            <div>
            <UserNav/>
            </div>
        );
    }
}
export default LeftColumn;