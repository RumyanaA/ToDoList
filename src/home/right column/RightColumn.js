import React from "react";
import { Component } from "react";
import PubSub from "pubsub-js";
import NewTask from "./NewTask";
import UserNav from "../left column/userNavigation/UserNav";
import Default from "./default";
import EditTask from "./EditTask";
class RightColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toRender: <Default/>
        }
        this.mySubscriber = this.mySubscriber.bind(this);
        this.editTask = this.editTask.bind(this);
        
    }
    componentDidMount() {
        PubSub.subscribe('Render topic', this.mySubscriber); //subscriber to New Task button
        PubSub.subscribe('Edit task', this.editTask)
        
    }
   
    mySubscriber(msg, data) { //subscribers have function for publishing
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
    editTask(msg,data){
        this.setState({toRender:<Default/>}) 
        this.setState({toRender: <EditTask taskData={data} />})
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