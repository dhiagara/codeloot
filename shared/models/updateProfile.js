import fetch from 'isomorphic-unfetch'

const updateProfile = {
  state: {  
  }, // initial state
  reducers: {
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async updateProfile(payload) {

      try {
        console.log('siging dipateched  : ', payload)
        
        
         const response = await fetch('http://localhost:3001/api/signin/updateProfile', {
           method: 'PATCH',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(
             payload
             , null, 2)
         })
         const logedUser = await response.json()
         
         return logedUser
      } catch (err) {
        console.log(err)
      }
    }
  }
}


export default updateProfile
