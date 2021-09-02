import React, { Component } from 'react';
import CookiesJar from "../../../CookiesJar";


class CatCheckbox extends CookiesJar {
    constructor(props) {
        super(props);
        this.hasCatName = false;
        this.state = {
            categories: []
        }
        this.checkedDefault=true;
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleCheckChieldElement = this.handleCheckChieldElement.bind(this);
    }
    handleAllChecked(event) {
        var allCategories = this.state.categories
        allCategories.forEach(category => category.isChecked = event.target.checked)
        this.checkedDefault=!this.checkedDefault;
        this.setState({ categories: allCategories })
    }
    handleCheckChieldElement = (event) => {
        var allCategories = this.state.categories
        allCategories.forEach(category=> {
           if (category.name === event.target.value)
              category.isChecked =  event.target.checked
        })
        this.setState({categories: allCategories})
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