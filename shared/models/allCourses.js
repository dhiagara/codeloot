import fetch from 'isomorphic-unfetch'
import { updateLocale } from 'moment';

const  allCourses= {
    state: {
      courses:[]
        
      }, // initial state
      reducers: {
        setCourses(state,courses){
          return {
           courses
          }
      },
        
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
          this.setCourses(courses)
          console.log('les cours',courses)
            
      } catch (err) {
        console.log(err)
      }
    },

    async updateCourse (payload,body) {
      try {
        const response = await fetch('http://localhost:3001/api/upload/updateCourses', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload, null, 2)
          })
          const courses = await response.json()
          console.log('les cours',courses)
         return courses
         
            
      } catch (err) {
        console.log(err)
      }
    },







    async getCourseBySector (payload,body) {
      try {
       
        const response = await fetch('http://localhost:3001/api/upload/CourseBySector', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload, null, 2)
          })
          const courses = await response.json()
          this.setCourses(courses)
          console.log('les cours',courses)
            
      } catch (err) {
        console.log(err)
      }
    },
     async getCourseByfileName (payload,body) {
      try {
      
        const response = await fetch('http://localhost:3001/api/upload/CourseByfileName', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload, null, 2)
          })
          const courses = await response.json()
         return courses
            
      } catch (err) {
        console.log(err)
      }
    },
    
    
  }
}


export default allCourses
