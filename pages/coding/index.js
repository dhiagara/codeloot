

import React, { Component } from 'react'
import { Card ,Col,Row, Pagination,Button} from 'antd';
import { Monaco,Layout } from '../../shared/components'
import { store } from "../../shared/store";
import withRematch from "../../shared/utils/withRematch"
import './style/index.less';

const { Meta } = Card;
class Coding extends Component{






  render(){
   
    return(
   
    <Layout>
   
    <Monaco></Monaco>
  
  </Layout>
 
    )

}
}
const mapState = state => ({
  file: state.CodingModel.file,
 
})

const mapDispatch = ({CodingModel: {getFiles} }) => ({
 getFiles :body => getFiles(body)
})


export default withRematch(store, mapState, mapDispatch)(Coding);
