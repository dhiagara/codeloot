

import React, { Component } from 'react'

import { Card ,Col,Row} from 'antd';
import { store } from '../../shared/store'
import withRematch from '../../shared/utils/withRematch'
class Fetchfiles extends Component{
state={
  courses:[],
}
 
   did =async()=>{
    const {getCourses}=this.props;
   await getCourses();
    this.setState({courses:this.props.courses});
    console.log('coursés for map ',this.state.courses)

  }

    // const response =  fetch('http://localhost:3001/api/signin/files', {
    //     method: 'GET',
    //     processData: false,
    //     mode: 'cors',
    
    //     headers: {
    //       'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
          
    //     },
        
    // })
    // const file = new Blob(
    //     [response.data], 
    //     {type: 'application/pdf'});
  render(){
    return(

        <div>

      <button onClick={this.did}>

      </button>
<div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={4} vgutter={8}>
      
     {this.state.courses.map((course)=><Col span={8}><Card title={course.cours_name} bordered={false}> {course.sector} </Card> </Col>)}        

  </Row>
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
