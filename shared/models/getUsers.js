import fetch from 'isomorphic-unfetch'

const getUsers= {
    state: {
      users:[]
        
      }, // initial state
      reducers: {
        setUsers(state,users){
          return {
            users
          }
      },
        
    },
  
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async getUsers (payload,body) {
      try {
        const response = await fetch('http://localhost:3001/api/upload/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(
                payload)
          })
          const users = await response.json()
          this.setUsers(users)
          console.log('balizz 2',users)
            
      } catch (err) {
        console.log(err)
      }
    },
    
  }
}


export default getUsers;
