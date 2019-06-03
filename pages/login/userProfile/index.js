import React from "react";
import { Layout } from "../../../shared/components";
import Upload from "./upload";
import Fetchfiles from "./TeacherCourses/fetchhFiles";
import { store } from "../../../shared/store";
import withRematch from "../../../shared/utils/withRematch";
import Router from "next/router";
import { Tabs } from 'antd';
import { Link } from 'react-router-dom'
import Practice from './userWorkCours'
import Courses from  './studentCourse'
import Students from './TeacherCourses/myStudents'

const TabPane = Tabs.TabPane;
class Profile extends React.Component {
  state = {
    
    current:"1",
  };
  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }
  navigate = e => {
    console.log('key', e.key);
    this.setState({ current: e.key });
  };

  render() {
    const { logedUser } = this.props;
    const gender = logedUser.gender;
    const teacher = (
      <Layout>
        <Upload />
        <br></br>
      My courses
        <div className="card-container">
    <Tabs type="card"  defaultActiveKey={this.state.current}  onClick={this.navigate}>
      <TabPane tab="My courses" key="1"> 
      <Fetchfiles />
      </TabPane>
      <TabPane tab="Students work" key="2">
       <Students></Students>
      </TabPane>
     
    </Tabs>
  </div>






        
      </Layout>
    );
    const admin = <Layout />;
    const etudiant =( <Layout>
    
    <div className="card-container">
    <Tabs type="card"  defaultActiveKey={this.state.current}  onClick={this.navigate}>
      <TabPane tab="My courses" key="1"> 
      <Courses></Courses>
      </TabPane>
      <TabPane tab="I don't know" key="2">
       
      </TabPane>
      <TabPane tab="userWorkCours" key="3">
      <Practice></Practice>
      </TabPane>
    </Tabs>
  </div>

    </Layout>)
    
    
    
  
   

    return (
      <div>
      
        {gender === "Teacher"
          ? teacher
          : gender === "admin"
          ? admin
          : etudiant}
      </div>
    );
  }
}

const mapState = state => ({
  logedUser: state.login.logedUser,
  isAuthenticated: state.login.isAuthenticated
});

export default withRematch(store, mapState)(Profile);
