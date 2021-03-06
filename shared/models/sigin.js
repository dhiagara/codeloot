import fetch from 'isomorphic-unfetch'

const sigin = {
  state: {
    logedUser:'',
   
  }, // initial state
  reducers: {
    setLogedUser(state,logedUser){
      return {
        logedUser,
      }
  },
  

  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async sigin(payload) {

      try {
        console.log('siging dipateched  : ', payload)
        
        
         const response = await fetch('http://localhost:3001/api/signin', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(
             payload
             , null, 2)
         })
         const logedUser = await response.json()
         this.setLogedUser(logedUser);
         return logedUser
      } catch (err) {
        console.log(err)
      }
    }
  }
}


export default sigin
