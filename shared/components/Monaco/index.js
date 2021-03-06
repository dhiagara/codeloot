import React from 'react';
import dynamic from 'next/dynamic';
//import  MonacoEditor from 'react-monaco-editor';
import { Card ,Col,Row, Pagination,Button,message,InputNumber} from 'antd';
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
      code: '',
        courses:[],
  pages:2,
  coursePage:[],
  work:'',
  message:'',
  updateCode:'Submit your code',
  noteField:false,
  note:''
    }
   getInitialProps = ({query}) => {
     console.log("queryyyyy",query)
    }
    componentWillUnmount=()=>{
      localStorage.removeItem("file_code");
     

    }


  componentDidMount=async()=>{
    console.log("boom bitc",localStorage.component);
    if(localStorage.component==="teacher"){
      console.log("rtacher");
      this.setState({updateCode:'submit note'})
      this.setState({code:localStorage.file_code,noteField:true});
    }
   else{
    this.setState({code:localStorage.file_code})
    if(localStorage.file_code)
    this.setState({updateCode:'update your code'})
  }
     const  {getFiles}=this.props
     const  file_name=localStorage.file_name
     console.log(file_name);
     const body={
        file_name,
      }
       console.log("body",body);
     
    await getFiles(body)

  }
  handleNote=(note)=>{
    this.setState({note})
  }
 handleClick = async()=>{
   const {studentCode}=this.props
    const {logedUser}=this.props
    const {studentUpdateCode}=this.props
    const {submitNote}=this.props
    console.log('yoo',logedUser);
    const studentID=logedUser.id;
    const  file_name=localStorage.file_name;
    const  id=localStorage.id;
    const {note}=this.state
    console.log( file_name)
    const {code}=this.state
    const body ={
      studentID,
      file_name,
      code
    }  
    const notee={
      file_name,
      id,
      note
    }
    let res=''  
    console.log("boom bitc",localStorage.component);
    if(localStorage.component==="teacher"){
      res = await submitNote(notee);
      console.log("rtacher");
      this.setState({updateCode:'submit note'})
    }
    else{
    if(!localStorage.file_code)
       res=  await studentCode(body);
  else{
   res=  await studentUpdateCode(body);
   localStorage.setItem("file_code",code);

   }}

  console.log("message",res)
  console.log("message succéss",res.message)
  if(res.success===false){
    message.warning( res.message);
}
  else
  message.success( res.message);
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
        width="700"
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
  {this.state.noteField
  ? (<div><Col span={3}><InputNumber min={1} max={20} defaultValue={0} size="large" onChange={this.handleNote}/></Col></div>)
  :<div></div>
  }
  <Col span={3}>
<Button type="primary"  size= "large" onClick={this.handleClick}>{this.state.updateCode}</Button>
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

const mapDispatch = ({CodingModel: {getFiles} ,studentCode :{studentCode,studentUpdateCode,submitNote}}) => ({
 getFiles :body => getFiles(body),
 studentCode :body =>studentCode(body),
 studentUpdateCode:body =>studentUpdateCode(body),
 
 submitNote:body =>submitNote(body),
})


export default withRematch(store, mapState, mapDispatch)(Monaco);





