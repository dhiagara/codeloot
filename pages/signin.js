import React from 'react'
import { store } from '../shared/store'
import withRematch from '../shared/utils/withRematch'

import {
  Radio, Card,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
  } from 'antd';
  
  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
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
      value: 'hangzhou',
      label: 'isat',
      children:sctor,
    },{
        value: 'hangzhwou',
        label: 'ist',
        children: sctor,
    },


{
    value: 'hangzhwou',
    label: 'isimos',
    children: sctor,
}
],
    
  }];
  
  class Signin extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          let body={...values};



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
  
    handleWebsiteChange = (value) => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
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
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (
        <div style={{ background: '#002347',
        padding: '50px ' }}>
<Card title="Card title" bordered={false} style={{marginLeft:'30%', width: 500 }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
            label="Habitual Residence"
          >
            {getFieldDecorator('state', {
              initialValue: ['zhejiang', 'hangzhou', 'xihu',],
              rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
            })(
              <Cascader options={state} />
            )}
          </Form.Item>
          
          <Form.Item
          label="Profission"
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
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I have read the <a href="">agreement</a></Checkbox>
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
  

  

  
  export default (Form.create({ name: 'normal_signin' })(Signin));


