

import React, { Component } from 'react'

import { Card ,Col,Row, Pagination} from 'antd';
import { store } from '../../../../shared/store'
import withRematch from '../../../../shared/utils/withRematch'

const { Meta } = Card;
class Fetchfiles extends Component{

  
state={
  courses:[],
  pages:2,
  coursePage:[],
}

  componentDidMount=async()=>{
    
    const {getCourses}=this.props;
    const tab=[];

    await getCourses();
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
    <Row gutter={8}>
    <div>
     {this.state.coursePage.map((course)=><Col span={4}><Card  
      hoverable="true"
     style={{ marginBottom: 16, width: 140 }}
     cover={<img alt="example" style={{}} src={course.language==="java"? java : course.language==="javaScript"? javascript :  c   } />}
     bordered={false}>
       <Meta
      title={course.cours_name} 
      description= {course.sector}
    />
      </Card> </Col>)}   
      
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
 
})

const mapDispatch = ({ allCourses: {getCourses} }) => ({
  getCourses: () => getCourses()
})


export default withRematch(store, mapState, mapDispatch)(Fetchfiles);
