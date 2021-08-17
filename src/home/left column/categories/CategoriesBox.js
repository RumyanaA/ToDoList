import axios from "axios";
import React from "react";
import { Component } from "react";
import Button from '../../../Button';
import InputField from "../../../InputField";
import CookiesJar from "../../../CookiesJar";

class CatBox extends CookiesJar {
    constructor(props) {
        super(props);
        this.state={
            categories: []
        }
        
    }
    async componentDidMount() {
        var cookie = this.getCookie('userLogToken');
        var token=cookie.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var res = await axios.get('http://localhost:8081/getCatName', config)
        var categories = res.data;
        this.setState({categories: categories})
      }
  
    render(){
        return(<div className='catbox'>
        <h4 className='catHeader'>Categories</h4>
        <div className='categoriesBox'>
            <ul>
                
                {this.state.categories.map((category, i) => <li key={i}>{category.name}</li>)}
            </ul>

        </div>
        </div>)
    }
}
export default CatBox;