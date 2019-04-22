import React from 'react'
import { store } from '../shared/store'
import withRematch from '../shared/utils/withRematch'

import {
  Radio, Card,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
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
        padding: '50px ' }}>
      <Card title="Sign in " bordered={false} style={{marginLeft:'30%', width: 500 }}>
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
              <Radio value="Other">Other</Radio>
            </Radio.Group>
          )}
        </Form.Item>
          
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
        </Card>
        </div>
      );
    }
  }
  

  
  const mapState = state => ({
    //loading: state.sigin.loading,
  })
  
  const mapDispatch = ({ sigin: { sigin } }) => ({
    sigin: (body) => sigin(body)
  })
  
  
  export default  withRematch(store, mapState, mapDispatch)(Form.create({ name: 'normal_signin' })(Signin));


