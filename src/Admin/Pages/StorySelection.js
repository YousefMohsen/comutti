import Topbar from '../Components/Topbar';
import ProfileInfoBar from '../Components/ProfileInfoBar';
import React, { useState } from 'react';
import { Table, Card} from 'antd';
import { useNavigate} from "react-router-dom";

const { Column } = Table;

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

function StorySelection() {

  const navigate = useNavigate();


  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar />

    <div className="container mt-4 ">
      
      
      <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
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

export default StorySelection;