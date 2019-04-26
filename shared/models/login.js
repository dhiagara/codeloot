import fetch from 'isomorphic-unfetch'
import jwt from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty'

var bearer = 'Bearer ' ;
const login = {
  state: {
    loading :  false,
    logedUser:'',
    token:'',
    isAuthenticated: false,
    user :{}
    
  }, // initial state
  reducers: {
    setLoading (state,loading) {
      return {
        loading
      }
    },
 
    setLogedUser(state,logedUser){
        return {
          logedUser,
         isAuthenticated:!isEmpty(logedUser)
        }
    },
    setToken(state,token){
      return {
        token
      }
  },
   
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    
  
    async loginn (payload,body) {
        console.log(payload)
       
       
        
      try {
        bearer= "Bearer "+ localStorage.jwtToken
         
          let loading = true
        this.setLoading(loading)  
        const response = await fetch('http://localhost:3001/api/signin/login',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': bearer,
            },
            body: JSON.stringify(
            payload
            ,null,2)
          })
        const logedUser = await response.json()
        const token =logedUser.token;
        console.log(logedUser.userProfile);
        this.setToken(token);
        
      
        localStorage.setItem('jwtToken',token);
        loading = false
        this.setLoading(loading)
        console.log('response azwza :' ,  logedUser)
        this.setLogedUser(jwt.decode(token));
        return logedUser



      } catch (err) {
        console.log(err)
      }
    }
  }
}


export default login
