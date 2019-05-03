import { init } from '@rematch/core'
import { counter, github, login, sigin,upload, allCourses,getUsers } from './models'


const initialState = {
  counter: 5
}

export const store = init({
  models: {
    counter,
    github,
    login,
    sigin,
    upload,
    allCourses,
    getUsers
  },
  redux: {
    initialState
  }
})
