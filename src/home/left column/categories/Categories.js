import axios from "axios";
import React from "react";
import { Component } from "react";
import Button from '../../../Button';
import InputField from "../../../InputField";
import CookiesJar from "../../../CookiesJar";
class Categories extends CookiesJar {
    constructor(props) {
        super(props);
        this.addCategory = this.addCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.cancelCategory = this.cancelCategory.bind(this);
        this.state = {
            hideCategoryDiv: true,
            name: '',
            note: '',
            catArray: []
        }
        this.getCat()


    }
    async getCat() {
        // var res = await axios.get('/getCatNameAndId')
        // for(var i=0;i<res.data.length-1;i++){
        //     this.setState({catArray: this.catArray.push(res.data.name[i])})
        // }
        // var catId = res.data._id;

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
        var result = await axios.post('http://localhost:8081/addCategory', catInfo)
        var categoryId = result.data;
        this.setCookie(catInfo.name, categoryId);
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
            <h4 className='catHeader'>Categories</h4>
            <div className='categoriesBox'>
                <ul>
                    {this.state.catArray.map((item, i) => <li key={i} name={item.name} />)}
                </ul>

            </div>
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
