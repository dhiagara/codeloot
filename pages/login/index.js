import React from "react";
import { store } from "../../shared/store";
import withRematch from "../../shared/utils/withRematch";
import Router from "next/router";

import { Form, Icon, Card, Input, Button, Checkbox, Alert } from "antd";

class Login extends React.Component {
  state = {
    loading: false,
    logedUser: {},
    isAuthenticated: false,
    error: ""
  };
  handleSubmit = async e => {
    const { loginn } = this.props;
    const { error } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        //  console.log('Received values of form: ', values);
        const body = {
          email: values.userName,
          password: values.password
        };

        this.setState({ loading: true });
        await loginn(body);
        this.setState({ error: error });
        console.log("aya", error);
        this.setState({ logedUser: this.props.logedUser });
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    console.log("amazra9", this.props.logedUser);
    if (isAuthenticated) {
      Router.push("/login/userProfile");
    }

    console.log(this.props);
    const { getFieldDecorator, loading } = this.props.form;
    return (
      <div style={{ background: "#002347", padding: "100px 2px 350px 4px" }}>
        <Card
          title={
            this.props.error ? (
              <Alert message={this.props.error} type="error" />
            ) : (
              ""
            )
          }
          bordered={false}
          style={{ marginLeft: "40%", width: 300 }}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password aaa!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="./signin">register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapState = state => ({
  loading: state.login.loading,
  logedUser: state.login.logedUser,
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error
});

const mapDispatch = ({ login: { loginn } }) => ({
  loginn: body => loginn(body)
});

export default withRematch(store, mapState, mapDispatch)(
  Form.create({ name: "normal_login" })(Login)
);
