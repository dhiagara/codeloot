

import React, { Component } from 'react'

import { Card ,Col,Row} from 'antd';
import { store } from '../../shared/store'
import withRematch from '../../shared/utils/withRematch'
class Fetchfiles extends Component{

 
   did =()=>{
    const {getCourses}=this.Props
    
    getCourses();

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

      
<div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}></Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>Card content</Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>Card content</Card>
      </Col>
    </Row>
  </div>
  </div>
    
    )


}
}
const mapState = state => ({
    
})

const mapDispatch = ({ allCourses: {getCourses} }) => ({
  getCourses: () => getCourses()
})


export default withRematch(store, mapState, mapDispatch)(Fetchfiles);
