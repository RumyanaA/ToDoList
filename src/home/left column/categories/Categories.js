import axios from "axios";
import React from "react";
import { Component } from "react";
import Button from '../../../Button';
import InputField from "../../../InputField";
import CatBox from "./CategoriesBox";
import CookiesJar from "../../../CookiesJar";
import Storage from "../../../Storage";
class Categories extends CookiesJar {
    constructor(props) {
        super(props);
        this.addCategory = this.addCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.cancelCategory = this.cancelCategory.bind(this);
        this.catData={};
        this.state = {
            hideCategoryDiv: true,
            name: '',
            note: '',
            catArray: []
        }
        


    }
    
    addCategory() {
        this.setState({ hideCategoryDiv: false })
    }
    cancelCategory() {
        this.setState({
            name:'',
            note: '',
            hideCategoryDiv: true
        })
    }
    async saveCategory() {
        
        var token = this.getCookie('userLogToken');
        
        var catInfo = {
            name: this.state.name,
            note: this.state.note,
            createdby: token.token
        }
        this.catData={
            name: catInfo.name,
            note: catInfo.note,
            categoryId: ''
        }
        var result = await axios.post('http://localhost:8081/addCategory', catInfo)
        this.catData.categoryId=result.data;
        Storage.setItem(this.catData, 'categories');
        this.setCookie(catInfo.name, this.catData.categoryId);
        this.setState({
            name: '',
            note: '',
            hideCategoryDiv: true
        })


    }
    
    handleChange(event) {
        var catData = this.state;
        catData[event.target.name] = event.target.value;
        this.setState(catData);
    }
    render() {
        return (<div className='catComponet'>
            <CatBox categoryName={this.catData.name}/>
            <Button className='addCat' label="+ Add Category" onClick={this.addCategory} />
            <div className='addcategoryBox' hidden={this.state.hideCategoryDiv}>
                <InputField value={this.state.name} className='categoryName' placeholder='name' label='' name='name' type='text' onChange={this.handleChange} />
                <InputField value={this.state.note} className='categoryNote' placeholder='note' label='' name='note' type='text' onChange={this.handleChange} />
                <div>
                    <Button className='saveCat' label="Save" onClick={this.saveCategory} />
                    <Button className='CancelCat' label="Cancel" onClick={this.cancelCategory} />
                </div>
            </div>
        </div>
        )
    }
}
export default Categories;
