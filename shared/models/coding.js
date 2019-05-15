import fetch from 'isomorphic-unfetch'
import axios from 'axios';
const  CodingModel= {
    state: {
      file:'',
        
      }, // initial state
      reducers: {
        setFile(state,file){
          return {
         file
          }
      },
        
    },
  
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async getFiles (payload,body) {
      console.log('payload',payload)



  

     
      await axios(' http://localhost:3001/api/upload/files', {
        method: 'POST',
        responseType: 'blob',//Force to receive data in a Blob Format
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: JSON.stringify(payload, null, 2)
    })
    .then( async response => {
    //Create a Blob from the PDF Stream
        const file = new Blob(
          [response.data], 
          {type: 'application/pdf'});
    //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    console.log('nozawdwdzadwazz',fileURL );
     this.setFile(fileURL);
       // window.open(fileURL,"_self");
    })
    .catch(error => {
        console.log(error);
    });
    },
   
    
  }
}


export default CodingModel
