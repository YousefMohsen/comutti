import Topbar from '../Components/Topbar';
import ProfileInfoBar from '../Components/ProfileInfoBar';
import { Table, Button, Modal, Form, InputNumber, Input, notification} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import { getDocs,collection,addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const { Column } = Table;

const data = [
  {
    key: 1,
    name: 'John',
    age: 7,
    lastConnection: '2021-02-06 08:28:36',

  },
  {
    key: 2,
    name: 'Jim',
    age: 5,
    lastConnection: '2021-02-05 08:28:36',
  },
  {
    key : 3,
    name: 'Joe',
    age: 5,
    lastConnection: '2021-02-08 08:28:36',
  },
];

function ChildSelection() {

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [childData, setChildData] = useState([]);

  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(null);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    
    async function fetchChildren() {

      collection(db, "Child")
      const fetchedData = await getDocs(collection(db, "Child"));
      const formatedList = fetchedData.docs.map(obj=>obj.data())
      setChildData(formatedList)

    }

    fetchChildren()
  },[])



  const onFinish = (values) => {
    console.log('Success:', values);
    addDoc(collection(db, "Child"), {
      name: values.name,
      age: values.age
    }).then(d=>{
      console.log('success',d)
      notification.success({
        message: 'Child added succesfully'
      });

    }).catch(er=>{
      notification.error({
        message: 'Something went wrong. Child not added.'
      });
      console.log("onAddnewChild.ERROR: ",er);

    })




    setIsModalVisible(false);
    //create new Child
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Informations are not complete'
    });
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
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input a name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please input an age!' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </p>
      </Modal>
    
      <Table dataSource={childData} onRow={(record, rowIndex) => {
        return {
          onClick: event => {navigate('/admin/profile/'+record.name)} , // click row
        };
      }}>
      <Column title="Name" dataIndex="name" key="name"/>
      <Column title="Age" dataIndex="age" key="age"/>

 

  </Table>
    </div>
    </React.Fragment>

  );
}

export default ChildSelection;