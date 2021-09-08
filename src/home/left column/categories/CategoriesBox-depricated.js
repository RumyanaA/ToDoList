import axios from "axios";
import React from "react";
import CookiesJar from "../../../CookiesJar";
import Storage from "../../../Storage";
import Checkbox from '../../../checkbox';

class CatBox extends CookiesJar {
    constructor(props) {
        super(props);
        this.hasCatName = false;
        this.state = {
            categories: [],
            checkedCategories: []
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleCheckboxChange(position) {
        var updatecheck = this.state.checkedCategories.map((item, index) => (index === position ? !item : item))
        this.setState({ checkedCategories: updatecheck })

    }
    async componentDidMount() {
        var cookie = this.getCookie('userLogToken');
        var token = cookie.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var res = await axios.get('http://localhost:8081/getCatName', config)
        var categories = res.data;
        for (var i = 0; i < categories.length; i++) {
            Storage.setItem(categories[i], 'categories')
        }
        var oldchecked = categories
        oldchecked.fill(true, 0);
        this.setState({ categories: categories, checkedCategories: oldchecked })

    }

    checkFlag() {

        if (this.props.categoryName != undefined) {
            this.hasCatName = true
        } else {
            this.hasCatName = false
        }
    }

    render() {
        this.checkFlag();
        return (<div className='catbox'>
            <h4 className='catHeader'>Categories</h4>
            <div className='categoriesBox'>
                <ul>

                    {/* {this.state.categories.map((category, i) => <li key={i}>{category.name}</li>)} */}
                    {this.state.categories.map((category, index) => <li key={index}>
                        <label>
                            <Checkbox
                                checked={this.state.checkedCategories[index]}
                                onChange={this.handleCheckboxChange(index)}
                            />
                            <span>{category.name}</span>
                        </label>
                    </li>)}
                    {this.hasCatName == true ? <li>{this.props.categoryName}</li> : null}

                </ul>

            </div>
        </div>)
    }
}
export default CatBox;