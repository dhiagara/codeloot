import React from 'react'
import {
  Upload, Button, Icon, message,Row,Col,Select,Input,Alert
} from 'antd';
import { store } from '../../shared/store'
import withRematch from '../../shared/utils/withRematch'



  class UploadComp extends React.Component {

    state = {
      fileList: [],
      uploading: false,
      selectSector:'',
      coursName : ''
    }
  
    handleUpload =async () => {
      const { fileList } = this.state;
      const { coursName} = this.state;
      const { selectSector } = this.state;
      const {uploadFile}=this.props;
      const {uploadData}=this.props;

      const body={
        coursName,
        selectSector
      };
    const formData = new FormData();
   const file=fileList[0];
   
      console.log(file);
      formData.append('file', file);
    console.log('works',formData.get('file'))
  
      this.setState({
        uploading: true,
      });
      await uploadFile(formData)
      await uploadData(body)
      message.success('FileUploaded');
      this.setState({
        uploading: false,
      });
    // You can use any AJAX library you like
     
    }
  
    render() {
      //sélct
      const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

 const handleChange=(value) =>{
  console.log(`selected ${value}`);
  this.setState({selectSector :value})
  console.log('staté',this.state.selectSector);
}
const onChange = (e) => {
  this.setState({coursName:e.target.value});
};
      const { uploading, fileList ,selectSector,coursName} = this.state;
      const props = {
        onRemove: (file) => {
          this.setState((state) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: (file) => {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
          return false;
        },
        fileList,
      };
  
      return (
        <div>
          <Row gutter={16}>
            <Col span={3}>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
          </Col>
          <Col span ={6}>
          <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select sectors"
    onChange={handleChange}
  >
    {children}
  </Select>
          </Col>
          <Col span={6}>
          <Input placeholder="Coursname" onChange={onChange} ></Input>
          </Col>
          </Row>
          <Row>
          <Col span={6}> 
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0 || !selectSector || !coursName  }
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Uploading' : 'Start Upload' }
          </Button>
          </Col>
          <Col span={6}>
          </Col>
          </Row>
        </div>
      );
    }
  }
  const mapState = state => ({
    
  })
  
  const mapDispatch = ({ upload: { uploadFile,uploadData } }) => ({
    uploadFile: (formData) => uploadFile(formData),
    uploadData: (body) => uploadData(body)
  })
  

export default withRematch(store, mapState, mapDispatch)(UploadComp);
  




