import axios from "axios";
import React from "react";
import { Component } from "react";
import Button from '../../../Button';
import InputField from "../../../InputField";
import CookiesJar from "../../../CookiesJar";

class CatBox extends CookiesJar {
    constructor(props) {
        super(props);
        this.hasCatName= false;
        this.state={
            categories: [],
            
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

      checkFlag(){

        if(this.props.categoryName!=undefined){
            this.hasCatName=true
            console.log(this.props.categoryName);
            console.log(this.state.hasCatName);
        }else{
            this.hasCatName=false
            console.log( this.props.categoryName);
            console.log(this.hasCatName);
        }
      }
  
    render(){
        this.checkFlag();
        return(<div className='catbox'>
        <h4 className='catHeader'>Categories</h4>
        <div className='categoriesBox'>
            <ul>
                
                {this.state.categories.map((category, i) => <li key={i}>{category.name}</li>)}
                {this.hasCatName==true ? <li>{this.props.categoryName}</li> : null}
                
            </ul>

        </div>
        </div>)
    }
}
export default CatBox;