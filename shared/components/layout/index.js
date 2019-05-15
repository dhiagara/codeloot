import { Layout, Menu, Breadcrumb, Icon, Button, Badge, Row, Col } from "antd";
import { store } from "../../store";
import withRematch from "../../utils/withRematch";
import Router from "next/router";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MainLay extends React.Component {
  state = {
    usersLa1: [],
    usersLa2: [],
    usersLa3: [],
    usersLf1: [],
    usersLf2: [],
    usersLf3: [],
  };
  componentDidMount = async () => {
    // const { isAuthenticated } = this.props;
    // if (!isAuthenticated) {
    //   Router.push("/login");
    // }
    const { getUsers } = this.props;
    let body={
      university:this.props.logedUser.university,
      sector:'la1'
    }
    await getUsers(body);
    this.setState({ usersLa1: this.props.users });

     body={
      university:this.props.logedUser.university,
      sector:'la2'
    }
    await getUsers(body);
    this.setState({ usersLa2: this.props.users });

       body={
      university:this.props.logedUser.university,
      sector:'la3'
    }
    await getUsers(body);
    this.setState({ usersLa3: this.props.users });

    console.log('balizz logedUser univérsitty',this.props.logedUser.university);
  };

  handleLogout = async e => {
    const { logout } = this.props;
    e.preventDefault();

    await logout();
    Router.push("/login");

    console.log(this.props.isAuthenticated);
  };
 

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
             <Row >
            <Button
              onClick={this.handleLogout}
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
        <br></br>
          <Sider width={200} style={{ background: "#fff" ,
           
          }}>
          <div className="logo" /> 
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 , 'paddingTop':'40px', }}
            >
              
               <label style={{ 'marginLeft':'20px', 
               
                  'fontSize': '20px',
                 'textAlign': 'center',
                 }} >
                 {this.props.logedUser.university} students </label>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    la1
                  </span>
                }
              >
              {this.state.usersLa1.map((user)=> <Menu.Item key={user._id} >{user.first_name}</Menu.Item>)}
               
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="user" />
                  la2
                  </span>
                }
              >
                  {this.state.usersLa2.map((user)=> <Menu.Item key={user._id} >{user.first_name}</Menu.Item>)}
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="user" />
                   la3
                  </span>
                }
              >
                  {this.state.usersLa3.map((user)=> <Menu.Item key={user._id} >{user.first_name}</Menu.Item>)}
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
