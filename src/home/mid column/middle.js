import React from "react";
import { Component } from "react";
import { withRouter } from 'react-router-dom';
import Calendar from "./calendar";
import Notifications from "./notifications";
class Middle extends Component{
    constructor(props){
        super(props);
        this.urlParam=props.match.params.component;
    }
    //get
    render = () => {
        var toRender;
        if(this.props.match.params.component=='notifications'){
            toRender=<Notifications/>
        }
        // if(this.urlParam=='notifications'){
        //     toRender=<Notifications/>
        // }
        if(this.props.match.params.component=='calendar'){
            toRender=<Calendar/>
        }
        // if(this.urlParam=='notifications'){
        //     toRender=<Notifications/>
        // }
        return (
            <div>
            {toRender}
            </div>
        );
    }
}
export default Middle;