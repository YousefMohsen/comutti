import Topbar from '../Components/Topbar'
import ProfileInfoBar2 from '../Components/ProfileInfoBar2'
import React from 'react';
import { Table, Tag, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Column, ColumnGroup } = Table;

const data = [
  {

    name: 'Woof Story',
    date: '2021-02-06 08:28:36',

  },
  {
    name: 'Jimbo & Garry are going to the beach',
    date: '2021-02-05 08:28:36',

  },
  {
    name: 'Things & Colors',
    date: '2021-02-08 08:28:36',

  },
];

function handleClick()
{}

function AdminMain() {
  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 />

    <div className="container mt-4 ">
    <Link to="/admin/record">
    <Button  className="mt-3 mb-2 float-right" type="primary"  icon={<PlusOutlined />} size="large">
          

          Create new

        </Button>
        </Link>

    <Table dataSource={data} onRow={(record, rowIndex) => {
      return {
        onClick: event => <Link to="/admin/heyyy"> </Link>
      };
    }
  }>
      <Column title="Name" dataIndex="name" key="name" />
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

export default AdminMain;
