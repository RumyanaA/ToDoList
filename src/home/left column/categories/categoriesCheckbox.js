import React, { Component } from 'react';
import CookiesJar from "../../../CookiesJar";
import PubSub from 'pubsub-js';

class CatCheckbox extends CookiesJar {
    constructor(props) {
        super(props);
        this.Checkedcategories=[]
        this.state = {
            categories: []
        }
        this.checkedDefault=true;
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleCheckChieldElement = this.handleCheckChieldElement.bind(this);
    }
    handleAllChecked(event) {
        this.Checkedcategories.length=0;
        var allCategories = this.state.categories
        allCategories.forEach(category => category.isChecked = event.target.checked)
        this.checkedDefault=!this.checkedDefault;
        this.setState({ categories: allCategories })
        for(var i=0;i<allCategories.length;i++){
            if(allCategories[i].isChecked){
                this.Checkedcategories.push(allCategories[i].name)
            }
        }
        var MY_TOPIC = 'manage category';
        PubSub.publish(MY_TOPIC, this.Checkedcategories);
    }
    handleCheckChieldElement = (event) => {
        this.Checkedcategories.length=0;
        var allCategories = this.state.categories
        allCategories.forEach(category=> {
           if (category.name === event.target.value){
              category.isChecked =  event.target.checked
              if(!event.target.checked){
                  this.checkedDefault = event.target.checked
              }          
            }
        })
        this.setState({categories: allCategories})
        for(var i=0;i<allCategories.length;i++){
            if(allCategories[i].isChecked){
                this.Checkedcategories.push(allCategories[i].name)
            }
        }
        if(this.Checkedcategories.length==allCategories.length){
            this.checkedDefault = true;
        }
        var MY_TOPIC = 'manage category';
        PubSub.publish(MY_TOPIC, this.Checkedcategories);
      }
      static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.categories !== prevState.categories){
            return ({ categories: nextProps.categories }) // <- this is setState equivalent
        }
        return null
    }
    render() {
        return (
            <div>
                <input type="checkbox" checked={this.checkedDefault} onClick={this.handleAllChecked} value="checkedall" /> Check
                <ul>
                    {
                        this.state.categories.map((category) => {
                            return (
                                <li>
                                <input key={category.id} 
                                onChange={this.handleCheckChieldElement}
                                 type="checkbox" checked={category.isChecked} 
                                 value={category.name} /> 
                                 {category.name}
                               </li>
                               
                            )
                        })
                        
                    }
                  
                </ul>
                
                
                
            </div>
        )
    }

}
export default CatCheckbox;