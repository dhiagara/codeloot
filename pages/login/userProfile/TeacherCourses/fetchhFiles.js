import React, { Component } from "react";

import {
  Card,
  Col,
  Row,
  Pagination,
  Popover,
  Button,
  Modal,
  Select,
  Input,
  message
} from "antd";
import { store } from "../../../../shared/store";
import withRematch from "../../../../shared/utils/withRematch";
const Search = Input.Search;

const { Meta } = Card;
class Fetchfiles extends Component {
  state = {
    courses: [],
    pages: 2,
    coursePage: [],
    selectSector: "",
    coursName: "",
    language: "",
    file_name:''
  };

  componentDidMount = async () => {
    const { getCourses } = this.props;
    const tab = [];

    await getCourses();
    this.setState({
      courses: this.props.courses,
      pages: Math.ceil(this.props.courses.length / 12)
    });
    if (this.state.pages == 1) {
      for (let i = 0; i < this.state.courses.length; i++) {
        tab[i] = this.state.courses[i];
      }
    } else {
      for (let i = 0; i < 12; i++) {
        tab[i] = this.state.courses[i];
      }
    }
    this.setState({ coursePage: tab });
    console.log("coursés for map ", this.state.courses);
    console.log("coursePage ", this.state.coursePage);
  };

  onChange = e => {
    let j = e * 12 - 12;
    let tab = [];
    if (e === this.state.pages) {
      for (let i = j; i < this.state.courses.length; i++)
        tab[i] = this.state.courses[i];
    } else {
      for (let i = j; i < e * 12; i++) tab[i] = this.state.courses[i];
    }
    this.setState({ coursePage: tab }, function() {
      console.log("nééds to bé fk", this.state.coursePage);
    });
  };


  handleOnClick = async e=>{
    const  file_name=e.currentTarget.getAttribute('id')
    this.setState({file_name})
    console.log('cooidiin',e.currentTarget.getAttribute('id'));
     
  }

  cardClick = e => {
   
    return (
      <Popover placement="rightTop" title="yooo" content="yooo" trigger="click">
        <Button>RT</Button>
      </Popover>
    );
  };
  handleOk =async e => {
    const {updateCourse}=this.props
    const {file_name}=this.state;
    const{coursName}=this.state;
    const{ selectSector}=this.state;
    const{language}=this.state;


    const body={
      coursName,
      selectSector,
      language,
      file_name
    };
    console.log(body);

  

    const res=await updateCourse(body);
    if(res.success===false)
      message.warning( res.message)
    else
    message.success( res.message);
  
    

    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  showModal = () => {
    console.log(this.state.file_name)
    this.setState({
      visible: true
    });
  };
  handleVisibleChange=(e)=>{
    console.log('azawza',e.target.key)
  }

  render() {
    const handleChange = value => {
      console.log(`selected ${value}`);
      this.setState({ selectSector: value });
      console.log("staté", this.state.selectSector);
    };
    const onChange = e => {
      this.setState({ coursName: e.target.value });
    };
    const handleSelect = e => {
      this.setState({ language: e });
      console.log("staté", this.state.language);
    };

    const content = (
      <div>
        <a onClick={this.showModal}>update</a>
        <p />
        <a>delete</a>
      </div>
    );
    const javascript =
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png";
    const c = "https://blog.softheme.com/wp-content/uploads/2015/10/c-prog.png";
    const java = "http://www.fondsecran.eu/a/get_photo/366135/1024/1024";
    const php =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTdF2k5v3EdkQucWurnDokFgulFF5LKXQTzgCnPGChheuKjYEhg";

    const children = [];
    for (let i = 1; i < 4; i++) {
      children.push(<Option key={"LA" + i}>{"LA" + i}</Option>);
      children.push(<Option key={"LF" + i}>{"LF" + i}</Option>);
    }
    const { selectSector, coursName, language } = this.state;

    return (
      <div>
        <Modal
          title="UpdateCourse"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={this.handleOk}
              disabled={!selectSector || !coursName || !language}
            >
              Submit
            </Button>
          ]}
        >
          <Input placeholder="Coursname" onChange={onChange} />
          <br />
          <br />
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select sectors"
            onChange={handleChange}
          >
            {children}
          </Select>
          <br />
          <br />

          <Select
            defaultValue="language"
            style={{ width: 150 }}
            onChange={handleSelect}
          >
            <Option value="javaScript">javaScript</Option>
            <Option value="C">C</Option>
            <Option value="java">java</Option>
          </Select>
        </Modal>

        <div style={{ background: "#EFF0D1", padding: "30px" }}>
          <div>
            <div className="main">
              <div className="filter">
                <Row gutter={6}>
                  <Col span={8}>
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="filter by  sectors"
                    />
                  </Col>
                  <Col span={12}>
                    <Search placeholder="Search by name" />
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <Row gutter={8}>
            <div>
              {this.state.coursePage.map(course => (
                <Col
                  md={{ span: 12 }}
                  xl={{ span: 4 }}
                  xs={{ span: 16 }}
                  lg={{ span: 6 }}
                >
                  {" "}
                  <Popover
                    placement="rightTop"
                    content={content}
                    trigger="click"
                   key={course.file_name}
                    title="Update"
                  >
                    <Card
                    onClick={this.handleOnClick} 
                    id={course.file_name.toString()} 
                      hoverable="true"
                      style={{ marginBottom: 16, width: 140 }}
                      cover={
                        <img
                          alt="example"
                          style={{}}
                          src={
                            course.language === "java"
                              ? java
                              : course.language === "javaScript"
                              ? javascript
                              : c
                          }
                        />
                      }
                      bordered={false}
                    >
                      <Meta
                        title={course.cours_name}
                        description={course.sector}
                      />
                    </Card>{" "}
                  </Popover>{" "}
                </Col>
              ))}
            </div>
          </Row>
          <Pagination
            onChange={this.onChange}
            total={this.props.courses.length}
          />
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  courses: state.allCourses.courses
});

const mapDispatch = ({ allCourses: { getCourses ,updateCourse} }) => ({
  getCourses: () => getCourses(),
  updateCourse:body=>updateCourse(body),
});

export default withRematch(store, mapState, mapDispatch)(Fetchfiles);
