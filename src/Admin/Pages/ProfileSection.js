import Topbar from '../Components/Topbar'
import ProfileInfoBar2 from '../Components/ProfileInfoBar2'
import React from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link , useParams } from "react-router-dom";

const { Column } = Table;

const data = [
  {
    key : 1,
    name: 'Woof Story',
    date: '2021-02-06 08:28:36',

  },
  {
    key : 2,
    name: 'Jimbo & Garry are going to the beach',
    date: '2021-02-05 08:28:36',

  },
  {
    key : 3,
    name: 'Things & Colors',
    date: '2021-02-08 08:28:36',

  },
];

const withRouter = WrappedComponent => props => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

function AdminMain(props) {

  console.log(props.params.childName)

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childName={props.params.childName}/> 

    <div className="container mt-4 ">
    <Link to="/admin/record">
    <Button  className="mt-3 mb-2 float-right" type="primary"  icon={<PlusOutlined />} size="large">
          

          Create new

        </Button>
        </Link>

    <Table dataSource={data} >
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

export default withRouter(AdminMain);
