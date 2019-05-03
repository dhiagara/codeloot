import { Layout, Menu, Breadcrumb, Icon, Button, Badge, Row, Col } from "antd";
import { store } from "../../store";
import withRematch from "../../utils/withRematch";
import Router from "next/router";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MainLay extends React.Component {
  state = {
    users: []
  };
  componentDidMount = async () => {
    const { getUsers } = this.props;
    const body={
      university:'isimm',
      sector:'la2'
    }
    await getUsers(body);
    this.setState({ users: this.props.users });
    console.log('balizz logedUser univérsitty',this.props.logedUser);
  };

  handleSubmit = async e => {
    const { logout } = this.props;
    e.preventDefault();

    await logout();
    Router.push("/login");

    console.log(this.props.isAuthenticated);
  };
  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }

  // static async getInitialProps ({ isServer, initialState }) {
  //   const {isAuthenticated}=this.props
  //   if(!isAuthenticated){
  //     Router.push('/login')
  //   }
  //   return {}
  // }

  render() {
    const username = this.props.logedUser.username;
    const { children } = this.props;

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Button
              onClick={this.handleSubmit}
              style={{ position: "absolute", top: "15px", right: "16px" }}
              type="primary"
            >
              Logout
            </Button>
            <Icon
              type="setting"
              theme="twoTone"
              style={{
                position: "absolute",
                top: "20px",
                right: "110px",
                fontSize: 20
              }}
            />
            <Icon
              type="notification"
              theme="twoTone"
              style={{
                position: "absolute",
                top: "20px",
                right: "140px",
                fontSize: 20
              }}
            />
            <Row gutter={8}>
              <Col span={4}>
                <Icon
                  type="home"
                  theme="twoTone"
                  style={{
                    fontSize: 20
                  }}
                />
              </Col>
              <Col span={4}>
                <label> {username} </label>
              </Col>
            </Row>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    subnav 1
                  </span>
                }
              >
              {this.state.users.map((user)=> <Menu.Item >{user.first_name}</Menu.Item>)}
               
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Welcome</Breadcrumb.Item>
              <Breadcrumb.Item />
            </Breadcrumb>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapState = state => ({
  logedUser: state.login.logedUser,
  isAuthenticated: state.login.isAuthenticated,
  users: state.getUsers.users
});
const mapDispatch = ({ login: { logout }, getUsers: { getUsers } }) => ({
  logout: () => logout(),
  getUsers: body => getUsers(body)
 
});

export default withRematch(store, mapState, mapDispatch)(MainLay);
