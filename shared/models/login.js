import fetch from 'isomorphic-unfetch'

const login = {
  state: {
    loading :  false,
    logedUser:''
    
  }, // initial state
  reducers: {
    setLoading (state,loading) {
      return {
        loading
      }
    },
    setLogedUser(state,logedUser){
        return {
          logedUser
        }
    },
   
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async loginn (payload,body) {
        console.log(payload)
        
      try {
          let loading = true
        this.setLoading(loading)  
        const response = await fetch('http://localhost:3001/api/signin/login',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            payload
            ,null,2)
          })
        const logedUser = await response.json()
        loading = false
        this.setLoading(loading)
        console.log('response azwza :' ,  logedUser)
       this.setLogedUser(logedUser.userProfile)
        return logedUser
      } catch (err) {
        console.log(err)
      }
    }
  }
}


export default login
