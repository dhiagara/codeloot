import fetch from 'isomorphic-unfetch';


var bearer = 'Bearer ';
const students= {
  state: {
      students
   
  }, // initial state
  reducers: {
  
    setStudents(state, students) {
      return {
        students,
      };
    },
  },

  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions

    async myStudents(payload, body) {
   

      try {
          const response = await fetch('http://localhost:3001/api/students', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
          body: JSON.stringify(payload, null, 2),
        });
        const students = await response.json();
        console.log("responseeee",students)
        this.setStudents(students);
        return students
          } catch (err) {
        console.log(err);
        return false;
      }
    },

  },
};

export default students;
