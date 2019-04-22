import fetch from 'isomorphic-unfetch'

const upload = {
    state: {
        loading :  false,
        logedUser:''
        
      }, // initial state
      reducers: {
        setLoading (state,loading) {
          return {
            loading
          }
        }
    },
  
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async uploadFile (payload,body) {
        console.log(payload)
      try {
        const response = await fetch('http://localhost:3001/api/upload/upload', {
            method: 'POST',
            processData: false,
            mode: 'cors',
            headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
            },
            
            body: payload
          })
          const fileUploaded = await response.json()
          console.log(fileUploaded)
            
      } catch (err) {
        console.log(err)
      }
    },
    async uploadData (payload,body) {
      console.log('consol',JSON.stringify(
        payload))
    try {
      const response = await fetch('http://localhost:3001/api/upload/uploadData', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          payload)
        })
        const dataUploaded = await response.json()
        console.log('datauploadd',dataUploaded)
          
    } catch (err) {
      console.log(err)
    }
  }





  }
}


export default upload
