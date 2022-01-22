import Topbar from '../Components/Topbar'
import ProfileInfoBar2 from '../Components/ProfileInfoBar2'
import React from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link , useParams } from "react-router-dom";

const { Column } = Table;

const data = [
  {
    key: 1,
    id : "0",
    date: '2021-04-05 08:16:22',
    image: "/img/admin/dog.png",
    title: "Woof Story",
  },
  {
    key: 2,
    id : "1",
    date: '2021-02-06 08:28:36',
    image: "/img/admin/forrest.png",
    title: "Adventure in the woods",
  },
  {
    key : 3,
    id : "2",
    date: '2021-02-07 08:26:50',
    image: "/img/admin/supermarket.png",
    title: "Let's buy some milk !",
  },
];

const withRouter = WrappedComponent => props => {
  const params = useParams();

  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};


function ProfileSection(props) {

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childName={props.params.childName}/> 

    <div className="container mt-4 ">
    <Link to={`/admin/profile/stories/${props.params.childName}`}>
    <Button  className="mt-3 mb-2 float-right" type="primary"  icon={<PlusOutlined />} size="large">
      Create new
    </Button>
    </Link>

    <Table dataSource={data} >
      <Column title="Title" dataIndex="title" key="title" />
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

export default withRouter(ProfileSection);
