import logo from './logo.svg';
import './App.css';
import InputField from './InputField';
import React, {Component} from 'react';
import Login from './LoginForm'
import LoginReg from './LoginReg';

export default class App extends Component {
  
  render = () => {
      return (
          <LoginReg/>
      );
  }
}


