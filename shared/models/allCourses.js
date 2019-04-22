import fetch from 'isomorphic-unfetch'

const  allCourses= {
    state: {
       
        
      }, // initial state
      reducers: {
       
        
    },
  
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async getCourses (payload,body) {
      try {
        const response = await fetch('http://localhost:3001/api/upload/Courses', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
          })
          const courses = await response.json()
          console.log('les cours',courses)
            
      } catch (err) {
        console.log(err)
      }
    },
    
  }
}


export default allCourses
