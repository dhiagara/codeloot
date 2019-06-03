import React from 'react'
import { Layout } from '../../shared/components'
import withRematch from '../../shared/utils/withRematch'
import { store } from '../../shared/store'
import './style/index.less'

import {
  Radio, Card,Form, Input, Tooltip, Alert, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message
  } from 'antd';
  
  const { Option } = Select;
  const sctor=[{
    value: 'xihu',
    label: 'la1',
  },
  {
    value: 'la2',
    label: 'la2',
  },
  {
    value: 'la3',
    label: 'la3',
  }]

  const state = [{
    value: 'Monastir',
    label: 'Monastir',
    children: [{
      value: 'fsm',
      label: 'fsm',
      children:sctor,
    },{
        value: 'isimm',
        label: 'isimm',
        children: sctor,
    },


{
    value: 'isimos',
    label: 'isimos',
    children: sctor,
}
],



  }, {
    value: 'sousse',
    label: 'Sousse',
    children: [{
      value: 'isat',
      label: 'isat',
      children:sctor,
    },{
        value: 'ist',
        label: 'ist',
        children: sctor,
    },


{
    value: 'isimos',
    label: 'isimos',
    children: sctor,
}
],
    
  }];
  
  class Dash extends React.Component {
    state = {
      confirmDirty: false,
    };
  
    handleSubmit = (e) => {
      const {  updateProfile} = this.props
      const {logedUser}= this.props;
      const id=logedUser.id
      console.log('loéusér',logedUser);
       let res ='';
      e.preventDefault();
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          let body={state : values.information[0] , university :values.information[1] ,
             sector : values.information[2]  , ...values,id};
          delete body.information
          console.log('Received values of form: ', body);
         res =await      updateProfile(body)
        }
        if(res.success)
        message.success('profile Updated')
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  
  
    render() {

           const {logedUser}= this.props;
     
      console.log('loéusér',logedUser);
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

  
      return (
          <Layout>
            <div class="wrapper">
            <div class="form-header">Edit Profile</div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
            label={(
              <span>
                firstname
               
              </span>
            )}
          >
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label={(
              <span>
                lasname
               
              </span>
            )}
          >
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>

          <Form.Item
            label="Habitual Residence"
          >
            {getFieldDecorator('information', {
              initialValue: ['zhejiang', 'hangzhou', 'xihu',],
              rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
            })(
              <Cascader options={state} />
            )}
          </Form.Item>
          
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Edit</Button>
          
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
         
          </Form.Item>
        </Form>
      
    
        </div>
        </Layout>
      );
    }
  }
  

  
  const mapState = state => ({
    //loading: state.sigin.loading,
    logedUser: state.login.logedUser,
  })
  
  const mapDispatch = ({        updateProfile: {     updateProfile } }) => ({
      updateProfile: (body) =>     updateProfile(body)
  })
  
  
  export default  withRematch(store, mapState, mapDispatch)(Form.create({ name: 'normal_signin' })(Dash));

