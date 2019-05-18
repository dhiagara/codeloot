import React from 'react';
import dynamic from 'next/dynamic';
//import  MonacoEditor from 'react-monaco-editor';
import { Card ,Col,Row, Pagination,Button} from 'antd';
import { store } from "../../store";
import withRematch from "../../utils/withRematch"
import './style/index.less';
import Link from 'next/link'

const { Meta } = Card;
let  MonacoEditor=dynamic(import('react-monaco-editor') ,{
    ssr:false,
})
// let  monaco=dynamic(import('monaco-editor') ,{
//     ssr:false,
// })


 class Monaco extends React.Component {
  
    state = {
      code: '// type your code...',
        courses:[],
  pages:2,
  coursePage:[],
  work:'',
    }
  

  componentDidMount=async()=>{
     const  {getFiles}=this.props
     const  file_name=localStorage.file_name
     console.log(file_name);
     const body={
        file_name,
      }
       console.log("body",body);
     
    await getFiles(body)

  }
 handleClick = async()=>{
   const {studentCode}=this.props
    const {logedUser}=this.props
    console.log('yoo',logedUser);
    const studentID=logedUser.id;
    const  file_name=localStorage.file_name;
    console.log( file_name)
    const {code}=this.state
    const body ={
      studentID,
      file_name,
      code
    }    
    await studentCode(body);

   

  }
  onChange=(newValue, e)=> {
    console.log('onChange', newValue);
    const code=newValue;
    
   this.setState({code})
  }
  render() {
    const code = this.state.code;
 
   const options = {
      selectOnLineNumbers: true,
      colorDecorators: true,
      acceptSuggestionOnCommitCharacter:true,
      acceptSuggestionOnEnter:true

    };

    return (

      
    <div>
    <Row gutter={12} >
    <Col span={10}>
    <div class='issuu-embed-container'>
    <iframe src={this.props.file}/>
    </div>
    </Col>
    <div>
    <Col  span={8}>
      <div>
      <MonacoEditor
        width="400"
        height="600"
        language="javascript"
        theme="vs-dark"
         options={options}
        value={code}
         onChange={this.onChange}
        editorDidMount={(monaco) =>{

        }

        }
       
      />
      </div>
    </Col>
   
      )}   
      
      </div>    
  </Row>
  <Row >
  <Col span={3}>
<Button type="primary"  size= "large" onClick={this.handleClick}>Submit your code</Button>
</Col >
<Col span={3}>
<Link   href="/login/userProfile"><Button size= "large" >Back to courses</Button></Link> 
</Col>
</Row>
  </div>
  
 
    )

}
}
const mapState = state => ({
  file: state.CodingModel.file,
  logedUser : state.login.logedUser,
 
})

const mapDispatch = ({CodingModel: {getFiles} ,studentCode :{studentCode}}) => ({
 getFiles :body => getFiles(body),
 studentCode :body =>studentCode(body)
})


export default withRematch(store, mapState, mapDispatch)(Monaco);





