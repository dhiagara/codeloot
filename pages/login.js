import React from 'react'
import { store } from '../shared/store'
import withRematch from '../shared/utils/withRematch'

import {
  Form, Icon,Card, Input, Button, Checkbox,
} from 'antd';

class Login extends React.Component {
    state =  {
        loading : false
    }
  handleSubmit = async(e) => {
      const {loginn} =  this.props
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
      //  console.log('Received values of form: ', values);
        const body = {
            email:values.userName,
            password:values.password
        }
        console.log(body)
        this.setState({loading : true})
        await loginn(body)
        //const res =  await login(body)
       this.setState({loading : false})

      }
    });
  }

  render() {

      console.log(this.props)  
        const { getFieldDecorator,  loading } = this.props.form;
    return (
        <div style={{ background: '#002347',
             padding: '100px 2px 350px 4px' }}>
    <Card title="Card title" bordered={false} style={{marginLeft:'40%', width: 300 }}>
    <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item> 
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password aaa!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" loading={this.state.loading} className="login-form-button">
            Log in 
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Card>
  </div>
    );
  }
}


const mapState = state => ({
    loading: state.login.loading,
  })
  
  const mapDispatch = ({ login: { loginn } }) => ({
    loginn: (body) => loginn(body)
  })
  

export default withRematch(store, mapState, mapDispatch)(Form.create({ name: 'normal_login' })(Login));