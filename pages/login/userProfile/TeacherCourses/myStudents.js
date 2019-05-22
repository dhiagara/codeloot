import React, { Component } from 'react';
import { Table, Divider, Tag,Row,Col,Select,Input} from 'antd';
import { store } from "../../../../shared/store";
import withRematch from "../../../../shared/utils/withRematch";
import './style/index.less';
const Search = Input.Search;

class Students extends Component {
  state = {
    loading: false,
    logedUser: {},
    isAuthenticated: false,
    error: '',
    students:[],
    studentsMap:[],
    value:''
  };


  componentDidMount=async()=>{
    const {logedUser}=this.props;
    const {myStudents}=this.props;
    console.log('from StudentsCompnent',logedUser)
   const {id}=logedUser
   
    
    const body ={
      proffID:id
    }
    console.log("id",body)
     const students= await myStudents(body);
     console.log("fromstudentsComonent",students)
     this.setState({students,studentsMap:students});

  }
    render() {
    const { Column, ColumnGroup } = Table;
    const Option = Select.Option;
    const {value}=this.state
    
    const handleChange = value => {
      const {students}= this.state
      const  studentsMap=[];
      console.log(`selected ${value}`);
      this.setState({ selectSector: value });
      if(value.length){
      let j=0;
        for (let index = 0; index < students.length; index++) {
              for(let c=0;c<value.length;c++)
                if(students[index].sector==value[c]){
                    studentsMap[j]=students[index];
                    j++;
                  }
        }
        this.setState({studentsMap})
    }
    
    else
    this.setState({studentsMap:this.state.students})

    };
    const {studentsMap}=this.state;
    const handleonSearch = value=>{
      this.setState({value})
    }



  


    const children = [];
    for (let i = 1; i < 4; i++) {
      children.push(<Option key={'la' + i}>{'la' + i}</Option>);
      children.push(<Option key={'lf' + i}>{'lf' + i}</Option>);
    }

    return (
        <div style={{ background: '#ECECEC', padding: '30px' }}>
      <div className="main">
        <div className="filter">
        <Row gutter={6}> 
        <Col span={8}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="filter by  sectors" 
                onChange={handleChange}
            >
              {children}
            </Select>
          </Col>
          <Col span={12}>
          <Search
           onSearch={handleonSearch}
          placeholder="Search by name"
       
    /> 
          </Col>
</Row>
</div>

     
  <Table dataSource={this.state.studentsMap.filter(tab=>
        tab.first_name.indexOf(value)>=0
      )}>
    <ColumnGroup title="Name">
      <Column
        title="first_name"
        dataIndex="first_name"
        key="first_name"
      />
      <Column
        title="Last_name"
        dataIndex="last_name"
        key="last_name"
      />
    </ColumnGroup>
    <Column
      title="email"
      dataIndex="email"
      key="email"
    />
    <Column
      title="sector"
      dataIndex="sector"
      key="sector"
    />
    
    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
          <a href="javascript:;">Invite {record.lastName}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      )}
    />
  </Table>
      </div>
      </div>
    );
  }
}

const mapState = state => ({
  logedUser: state.login.logedUser,
});


const mapDispatch = ({students:{myStudents}}) => ({
  myStudents:body=>myStudents(body),
});

export default withRematch(store, mapState, mapDispatch)(Students);
