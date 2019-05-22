import fetch from 'isomorphic-unfetch'

const  studentCode= {
    state: {
     
        
      }, // initial state
      reducers: {
     
        
    },
  
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
  
     async studentCode (payload,body) {
      try {
        const response = await fetch('http://localhost:3001/api/studentWork', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
                body: JSON.stringify(
             payload
             , null, 2)
          })
          const courses = await response.json()
         
          console.log('les courszaw',courses)
          return courses
            
      } catch (err) {
        console.log(err)
      }
    },    
    async studentUpdateCode (payload,body) {  
      try {
        const response = await fetch('http://localhost:3001/api/studentWork/studentUpdateCode', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
                body: JSON.stringify(
             payload
             , null, 2)
          })
          const courses = await response.json()
         
          console.log('les courszaw',courses)
          return courses
            
      } catch (err) {
        console.log(err)
      }
    },  
    async getStudentWorkbyID (payload,body) {
      try {
        const response = await fetch('http://localhost:3001/api/studentWork/getByID', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
                body: JSON.stringify(
             payload
             , null, 2)
          })
          const file_name = await response.json()
          console.log('les cours',file_name)
         
        
          return file_name;
            
      } catch (err) {
        console.log(err)
      }
    },     
  }
}


export default studentCode
