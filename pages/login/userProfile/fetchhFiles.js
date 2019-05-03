

import React, { Component } from 'react'

import { Card ,Col,Row} from 'antd';
import { store } from '../../../shared/store'
import withRematch from '../../../shared/utils/withRematch'
const { Meta } = Card;
class Fetchfiles extends Component{

  
state={
  courses:[],
}

  componentDidMount=async()=>{
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
    function =(arams)=> {

      
    }

  render(){
    const javascript="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
    const c="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png"
    const java="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkTjHq7H4du8tOz6hs-QBkfJxVTlqobWaEvLY7KJ0MDjvavEV0"
    return(
        <div>
         <br></br>
      My courses
<div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={8}>

     {this.state.courses.map((course)=><Col span={4}><Card  
     style={{ marginBottom: 16, width: 140 }}
     cover={<img alt="example" style={{}} src={course.language==="java"? java : course.language==="javaScript"? javascript : c } />}
     bordered={false}>
       <Meta
      title={course.cours_name} 
      description= {course.sector}
    />
      </Card> </Col>)}        
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
