import { init } from '@rematch/core'
import { counter, github, login, sigin } from './models'

const initialState = {
  counter: 5
}

export const store = init({
  models: {
    counter,
    github,
    login,
    sigin
  },
  redux: {
    initialState
  }
})
