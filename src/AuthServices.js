import axios from 'axios';
class AuthServices{
    static async verifyUser (code) {
         var res = await axios.get('http://localhost:8081/' + "activate/" + code)
          return res.data;
        
      };
}
  export default AuthServices;