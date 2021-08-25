import axios from "axios";
import React from "react";
import CookiesJar from "../../../CookiesJar";
import Storage from "../../../Storage";

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
        Storage.setItem(categories,'categories');
        this.setState({categories: categories})
      }

      checkFlag(){

        if(this.props.categoryName!=undefined){
            this.hasCatName=true
        }else{
            this.hasCatName=false
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