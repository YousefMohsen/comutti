import Topbar from '../Components/Topbar';
import ProfileInfoBar from '../Components/ProfileInfoBar';
import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate} from "react-router-dom";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: 1,
    name: 'John',
    date: '2021-02-06 08:28:36',

  },
  {
    key: 2,
    name: 'Jim',
    date: '2021-02-05 08:28:36',

  },
  {
    key : 3,
    name: 'Joe',
    date: '2021-02-08 08:28:36',
  },
];

function ChildSelection() {

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    setIsModalVisible(false);
    //create new Child
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar />

    <div className="container mt-4 ">
      <Button className="mt-3 mb-2 float-right" type="primary" icon={<PlusOutlined />} size="large" color='#ff5c5c' onClick={showModal}> 
            Add new child
      </Button>
      <Modal title="Enter the child informations" visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <p>
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item label="Name" name="childName" rules={[{ required: true, message: 'Please input a name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please input an age!' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      </p>
      </Modal>
    
      <Table dataSource={data} onRow={(record, rowIndex) => {
        return {
          onClick: event => {navigate('/admin/overview/profile/'+record.name)} , // click row
        };
      }}>
      <Column title="Name" dataIndex="name" key="name"/>
      <Column title="Date" dataIndex="date" key="date" sorter={{
      compare: (a, b) => a - b,
      multiple: 2,
   
    }}
  
    width="200px"
    />

 

  </Table>
    </div>
    </React.Fragment>

  );
}

export default ChildSelection;