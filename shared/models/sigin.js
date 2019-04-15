import fetch from 'isomorphic-unfetch'

const sigin = {
  state: {
    loading: false,
  }, // initial state
  reducers: {
    setToken(state, loading) {
      return {
        loading
      }
    },

  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async sigin(payload) {

      try {
        console.log('siging dipateched  : ', payload)
        // let loading = true
        // this.setLoading(loading)
        // const response = await fetch('http://localhost:3001/api/signin', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(
        //     payload
        //     , null, 2)
        // })
        // const logedUser = await response.json()
        // loading = false
        // this.setLoading(loading)
        // console.log('response azwza :', logedUser)

        // return logedUser
      } catch (err) {
        console.log(err)
      }
    }
  }
}


export default sigin
