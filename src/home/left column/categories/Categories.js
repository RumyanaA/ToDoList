import axios from "axios";
import React from "react";
import Button from '../../../Button';
import InputField from "../../../InputField";
import CookiesJar from "../../../CookiesJar";
import Storage from "../../../Storage";
import CatCheckbox from './categoriesCheckbox';
import PubSub from "pubsub-js";
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
            id: '',
            isChecked: true
        }
        var result = await axios.post('http://localhost:8081/addCategory', catInfo)
        this.catData.id=result.data;
        Storage.setItem(this.catData, 'categories');
        var oldState=this.state;
        oldState.catArray.push(this.catData);
        this.setState({
            name: '',
            note: '',
            hideCategoryDiv: true,
            catArray: oldState.catArray
        })
    }
    async componentDidMount() {
        var cookie = this.getCookie('userLogToken');
        var token = cookie.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var res = await axios.get('http://localhost:8081/getCatName', config)
        var allCategories = res.data;
        var storeCategories = {};
        var oldState = this.state;
        for (var i = 0; i < allCategories.length; i++) {
            storeCategories = {
                name: allCategories[i].name,
                note: allCategories[i].note,
                id: allCategories[i].id,
                isChecked: true
            }
            
            oldState.catArray.push(storeCategories);
            Storage.setItem(storeCategories, 'categories')
        }
        this.setState(oldState);
        var topic='get categories'
        PubSub.publish(topic,oldState.catArray)
    }
    
    handleChange(event) {
        var catData = this.state;
        catData[event.target.name] = event.target.value;
        this.setState(catData);
    }
    render() {
        return (<div className='catComponet'>
            <CatCheckbox categories={this.state.catArray}/>
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
