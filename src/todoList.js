import React, {Component} from 'react';
import InputField from './InputField';
export default class TodoList extends Component {
    constructor(props){
        super(props);
    }
  
    render = () => {
        return (
            <InputField  className='login-input'  placeholder='username' label='' name='username' type='text' onChange={this.handleChange} />
        );
    }
  }