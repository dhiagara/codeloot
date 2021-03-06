

import React, { Component } from 'react'

import { Card ,Col,Row, Pagination} from 'antd';
import { store } from '../../../../shared/store'
import withRematch from '../../../../shared/utils/withRematch'
import Router from "next/router";

const { Meta } = Card;
class Courses extends Component{

  
state={
  courses:[],
  pages:2,
  coursePage:[],
  fail :'no files'
}

  componentDidMount=async()=>{
    
    const {getCourseBySector}=this.props;
    const tab=[];
    const sector=this.props.logedUser.sector;
   
    const body = {
    sector
    };

    await getCourseBySector(body);
     this.setState({courses:this.props.courses,pages:Math.ceil(this.props.courses.length/12)});
      if(this.state.pages==1){
     for (let i = 0; i< this.state.courses.length; i++){
      tab[i]=this.state.courses[i];
    }}
    else{
      for (let i = 0; i< 12; i++){
        tab[i]=this.state.courses[i];
      }
    }
    this.setState({coursePage:tab});
     console.log('coursés for map ',this.state.courses)
     console.log('coursePage ',this.state.coursePage);

      console.log('coursePage lént ',this.state.coursePage.length);
  }

  onChange =  e=>{
    let j =(e*12)-12
    let tab=[]
    if(e===this.state.pages){
      for (let i = j; i <this.state.courses.length; i++)
        tab[i] =this.state.courses[i]
    }
    else{
     for (let i = j; i <e*12; i++)
     tab[i] =this.state.courses[i]
     }
     this.setState({coursePage:tab}, function(){
      console.log('nééds to bé fk',this.state.coursePage);
     });
    }
    
    handleOnClick = async e=>{
      const  file_name=e.currentTarget.getAttribute('id')
       localStorage.setItem("file_name", file_name);
      console.log('cooidiin',e.currentTarget.getAttribute('id'));
       Router.push("/coding");
    }
     

   
  render(){
    const javascript="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
    const c="https://blog.softheme.com/wp-content/uploads/2015/10/c-prog.png"
    const java="http://www.fondsecran.eu/a/get_photo/366135/1024/1024"
    const php="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTdF2k5v3EdkQucWurnDokFgulFF5LKXQTzgCnPGChheuKjYEhg"

  

    return(
        <div>
         <br></br>
      My courses
<div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row grid={{ gutter: 8, xl: 8, lg: 6, md: 4, sm: 2, xs: 1 }} key="row1">
    <div>
     { this.state.courses.length
     ? this.state.coursePage.map((course)=><Col id={course.file_name.toString()} md={{ span: 12, }}  xl={{ span: 4 }}  xs={{ span: 16 }} lg={{ span: 6, }}><Card 
     id={course.file_name.toString()} 
     onClick={this.handleOnClick} 
      key="wazwaz"
      hoverable="true"
     style={{ marginBottom: 16, width: 140 }}
     cover={<img alt="example" style={{}} src={course.language==="java"? java : course.language==="javaScript"? javascript :  c   } />}
     bordered={false}>
       <Meta
      title={course.cours_name} 
      description= {'Professor : '+course.userName}
    />
      </Card> </Col>)
      : this.state.fail
      }   
      
      </div>    
  </Row>
  <Pagination onChange={this.onChange} total={this.props.courses.length} />
  </div>
  </div>
    )

}
}
const mapState = state => ({
  courses: state.allCourses.courses,
  logedUser: state.login.logedUser,
})

const mapDispatch = ({ allCourses: {getCourseBySector}, CodingModel:{getFiles} }) => ({
    getCourseBySector: body => getCourseBySector(body),
    getFiles :body => getFiles(body)
})


export default withRematch(store, mapState, mapDispatch)(Courses);
