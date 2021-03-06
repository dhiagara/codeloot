import React from 'react'
import { store } from '../shared/store'
import withRematch from '../shared/utils/withRematch'
import Router from 'next/router'

import {
  Radio, Card,Form, Input, Tooltip, Alert, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
  } from 'antd';
  
  const { Option } = Select;
  const sctor=[{
    value: 'LA1',
    label: 'LA1',
  },
  {
    value: 'LA2',
    label: 'LA2',
  },
  {
    value: 'LA3',
    label: 'LA3',
  },
  {
  value: 'LF1',
  label: 'LA1',
},
{
  value: 'LF2',
  label: 'LF2',
},
{
  value: 'LF3',
  label: 'LF3',
}
]

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
  
  class Signin extends React.Component {
    state = {
      confirmDirty: false,
    };
  
    handleSubmit = (e) => {
      const {sigin} = this.props
    
      e.preventDefault();
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          let body={state : values.information[0] , university :values.information[1] ,
             sector : values.information[2]  , ...values};
          delete body.information
          console.log('Received values of form: ', body);
          await  sigin(body)
        }
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

          const {logedUser}=this.props
          console.log('from signin component méssa',logedUser.message)
        if(logedUser.success){
          Router.push('/login',)
        }
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
        <div style={{ background: '#002347',
         padding: "8% 10px 7% 70px" }}>
      <Card title={this.props.logedUser.message? <Alert message={this.props.logedUser.message} type="error" /> :''} bordered={false} style={{marginLeft:'30%', width: 500 }}>
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
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
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
          
          <Form.Item
          label="Profession"
        >
          {getFieldDecorator('gender')(
            <Radio.Group>
              <Radio value="Teacher">Teacher</Radio>
              <Radio value="Students">Student</Radio>
             
            </Radio.Group>
          )}
        </Form.Item>
          
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
            Or <a href="./login">Login</a>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
         
          </Form.Item>
        </Form>
      
        </Card>
        </div>
      );
    }
  }
  

  
  const mapState = state => ({
    //loading: state.sigin.loading,
    logedUser: state.sigin.logedUser,
  })
  
  const mapDispatch = ({ sigin: { sigin } }) => ({
    sigin: (body) => sigin(body)
  })
  
  
  export default  withRematch(store, mapState, mapDispatch)(Form.create({ name: 'normal_signin' })(Signin));


