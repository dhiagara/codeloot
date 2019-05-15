import React from 'react';
import dynamic from 'next/dynamic';
//import  MonacoEditor from 'react-monaco-editor';


let  MonacoEditor=dynamic(import('react-monaco-editor') ,{
    ssr:false,
})
// let  monaco=dynamic(import('monaco-editor') ,{
//     ssr:false,
// })


 class Monaco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    }
  }
 
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  render() {
    const code = this.state.code;
    // const code = this.state.code;
//     monaco.editor.setModelMarkers(ed.getModel(), 'test', [{
//     startLineNumber: 2,
//     startColumn: 1,
//     endLineNumber: 2,
//     endColumn: 1000,
//     message: "a message",
//     severity: monaco.Severity.Warning
// }]);


   const options = {
      selectOnLineNumbers: true,
      colorDecorators: true,
      acceptSuggestionOnCommitCharacter:true,
      acceptSuggestionOnEnter:true

    };

    return (
      <div>
      <MonacoEditor
        width="400"
        height="520"
        language="javascript"
        theme="vs-dark"
         options={options}
        value={code}
         onChange={() => null}
        editorDidMount={(monaco) =>{

//        monaco.editor.setModelMarkers(this.editor.getModel(), 'test',  [{
//     startLineNumber: 2,
//     startColumn: 1,
//     endLineNumber: 2,
//     endColumn: 1000,
//     message: "a message",
//     severity: monaco.Severity.Warning
// }])
       




        }
        
        
  
        
        }
       
      />
      </div>
    );
 }
 }
export default Monaco;