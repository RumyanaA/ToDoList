import React from "react";
import { Component } from "react";
import PubSub from "pubsub-js";
import NewTask from "./NewTask";
import UserNav from "../left column/userNavigation/UserNav";
import Default from "./default";
class RightColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toRender: <Default/>
        }
        this.mySubscriber = this.mySubscriber.bind(this);
    }
    componentDidMount() {
        PubSub.subscribe('Render topic', this.mySubscriber);
    }
    mySubscriber(msg, data) {
        switch (data) {
            case 'create task':
               this.setState({toRender:<NewTask/>}) 
                break;
                case 'cancel task':
               this.setState({toRender:<Default/>}) 
                break;
            default:
                this.setState({toRender:<Default/>})
                
        }
    }
    render = () => {
        return (
            <div >
                {this.state.toRender}
            </div>
        );
    }
}
export default RightColumn;