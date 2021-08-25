import React from "react";
import  { Cookies }  from 'react-cookie';
const cookies = new Cookies();

class CookiesJar extends React.Component {
    constructor(props) {
        super(props);
    }
     setCookie = (key, value, expire) => {
        cookies.set(key, value, {expires:expire})
    }
     getCookie = (key) => {
        return cookies.get(key)
    }
}
export default CookiesJar;