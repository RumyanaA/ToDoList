import React from "react";
import { Component } from "react";
import UserNav from "./userNavigation/UserNav";
import Categories from "./categories/Categories";
class LeftColumn extends Component{
    render = () => {
        return (
            <div>
            <UserNav/>
            <Categories/>
            </div>
        );
    }
}
export default LeftColumn;