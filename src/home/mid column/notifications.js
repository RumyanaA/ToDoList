import React, {Component} from 'react';

class Notifications extends Component{
    constructor(props){
        super(props);
        this.urlParam=props.match.params.component;
    }
    //get
    render = () => {
        return (
            <div /*className='screen'*/>
            <h1 className='h1'>{this.urlParam}</h1>
            </div>
        );
    }
}
export default Notifications;