import { Layout, Menu, Breadcrumb, Icon, Button, Badge, Row, Col ,Dropdown,Avatar} from "antd";
import { store } from "../../store";
import withRematch from "../../utils/withRematch";
import Router from "next/router";
import Profile from './profileCard'
import './style/index.less';
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
    update:false
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
   

    await logout();
    Router.push("/login");

    console.log(this.props.isAuthenticated);
  };

  handleUpdate  =  e => {
    this.setState({update:true})
    Router.push('/updateProfile')
  };
  handleHome  =  e => {
    Router.push('/login')
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
    const menu = (
      <Menu className="menu" onClick={this.navigate}>
        <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.Item key="setting">setting</Menu.Item>
        <Menu.Item key="logout" onClick={this.handleLogout} >logOut</Menu.Item>
      </Menu>
        );

    return (
      <Layout className="layout ">
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px",background:"#141B41"}}
          >
             <Row type="flex" justify="end">
             <Col span={2}>
             <img alt="example" style={{height:'50px',width:'50px'}} src="https://image.freepik.com/free-vector/university-degree-logo_23-2147501873.jpg"></img>
              </Col>

           
            
              <Col span={14}>
                <label> Welcome to Universities Code</label>
              </Col>
              <Col  span={2}>
            <Button
              onClick={this.handleHome}
              type="primary"
            
            >
              Home
            </Button>
            </Col>
              <Col span={3}>
            <Button
            onClick={this.handleUpdate}
             type="primary"
           >
             Update Profile
           </Button>
           </Col>
              <Col span={2}>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button className="setting">
              <img  style={{height:'50px',width:'50px'}} src="http://images.clipartpanda.com/user-clipart-matt-icons_preferences-desktop-personal.png" />
                &nbsp;&nbsp;
                <i className="down" />
              </Button>
            </Dropdown>
            </Col>
            </Row>
          </Menu>
        </Header>
        <Layout>
        <br></br>
          <Sider width={300}   
         style={{background:"#141B41" , overflow: 'auto',
        height: '100vh',
       
        left: 0,
           
          }}>
          <div className="logo" /> 
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 , 'paddingTop':'40px', background:"#141B41"}}
            >
            <Profile></Profile>
              
             
            </Menu>
          
          </Sider>
          <Layout style={{ padding: "0 24px 24px"  ,background:"#EFF0D1"}}>
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
            {this.state.update      
              ?<div></div>
              :children
            }
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
