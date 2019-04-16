import { init } from '@rematch/core'
import { counter, github,login } from './models'

const initialState = {
  counter: 5
}

export const store = init({
  models: {
    counter,
    github,
    login
  },
  redux: {
    initialState
  }
})
