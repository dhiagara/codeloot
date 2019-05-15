

import React, { Component } from 'react'
import { Card ,Col,Row, Pagination,Button} from 'antd';
import { Monaco,Layout } from '../../shared/components'
import { store } from "../../shared/store";
import withRematch from "../../shared/utils/withRematch"
import './style/index.less';

const { Meta } = Card;
class Coding extends Component{

state={
  courses:[],
  pages:2,
  coursePage:[],
}

  componentDidMount=async()=>{
    const {file}=this.props;
    const {getFiles}=this.props;
    await getFiles();
    console.log("fromm comp",file)
     //Open the URL on new Window
    //window.open(file);
    
    
  }

   
  render(){
   
    return(
   
    <Layout>
    <Row gutter={12} >
    <Col span={10}>
    <div class='issuu-embed-container'>
    <iframe src={this.props.file}/>
    </div>
    </Col>
    <div>
    <Col  span={8}>
    <Monaco></Monaco>
    </Col>
   
      )}   
      
      </div>    
  </Row>
  
<Button type="primary"  size= "large">Submit your code</Button>
  </Layout>
 
    )

}
}
const mapState = state => ({
  file: state.CodingModel.file,
 
})

const mapDispatch = ({CodingModel: {getFiles} }) => ({
  getFiles: () => getFiles()
})


export default withRematch(store, mapState, mapDispatch)(Coding);
