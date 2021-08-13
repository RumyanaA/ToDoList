import React from "react";
import { Component } from "react";
import UserNav from "../left column/userNavigation/UserNav";
class RightColumn extends Component{
    render = () => {
        return (
            <div >
            <UserNav/>
            </div>
        );
    }
}
export default RightColumn;