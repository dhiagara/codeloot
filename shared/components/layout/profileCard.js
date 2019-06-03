import { store } from "../../../shared/store";
import withRematch from "../../../shared/utils/withRematch";
import  './profile.less'
import { Layout, Menu, Breadcrumb, Icon, Button, Badge, Row, Col } from "antd";

import jwt from 'jsonwebtoken'
  class User extends React.Component {
      componentDidMount(){
        if(localStorage.jwtToken){ 
          store.dispatch.login.setLogedUser(jwt.decode(localStorage.jwtToken))
        }
       
       }
    static defaultProps = {
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      pic: 'picture.jpg'
    }
  
   
  
    render() {
      const {logedUser}= this.props;
      console.log('waaaat',logedUser);
      
      const {firstName,lastName, pic, Profession,university,sector} = this.props;
      return (
          <div class="body">
        <div className='UserCard'>
          <div className='UserCardTop'>
            <img src={pic} />
            
          </div>
          <div className='UserCardBottom'>
        
          <div class="list">
				<ul>
					<li><a>first Name :{firstName}</a></li>
					<li><a>last Name :{lastName}</a></li>
					<li><a>Profession :{Profession}</a></li>
          <li><a>university :{university}</a></li>
		
					<li><a>{sector}</a></li>
				</ul>
             
          
          </div>
          <Button
             
             style={{  top: "15px", right: "16px",left:"60px" }}
             type="primary"
           >
            My Profile
           </Button>
         
          </div>
        </div>
        </div>
      );
    }
  }
  
  
  class Profile extends React.Component {
    constructor(props) {
      
      super(props);
         const {logedUser}= this.props;
      console.log('waaawzawzaat',logedUser);
      this.state = {
        
        users: [
          {
            firstName:logedUser.username,
            lastName:logedUser.lastName,
           Profession: logedUser.gender,
            pic:  'http://images.clipartpanda.com/user-clipart-matt-icons_preferences-desktop-personal.png',
            sector: logedUser.sector,
            university: logedUser.university
          },
               
        ],
        searchText: ''
      }
    }
    
    gettingUser = res => {
      const users = [...this.state.users, res];
      this.setState({users});
    }
    
  
    
    render() {
    
      
      return (
        <div className='App'>
          <main className='listOfCards'>
            {
              this.state.users
              .map((user, index) => (
                <User key={index} firstName={user.firstName} lastName={user.lastName} pic={user.pic}
                 Profession={user.Profession}  university={user. university}  sector={user.  sector} />
              ))
            }
           
          </main> 
        </div>
      );
    }
  }
    const mapState = state => ({
    //loading: state.sigin.loading,
    logedUser: state.login.logedUser,
  })
  export default  withRematch(store, mapState)(Profile);
 