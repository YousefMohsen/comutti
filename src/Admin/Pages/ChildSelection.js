import Topbar from '../Components/Topbar';
import ProfileInfoBar from '../Components/ProfileInfoBar';
import React from 'react';
import { Table, Tag, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link , useNavigate} from "react-router-dom";

const { Column, ColumnGroup } = Table;

const data = [
  {

    name: 'John',
    date: '2021-02-06 08:28:36',

  },
  {
    name: 'Jim',
    date: '2021-02-05 08:28:36',

  },
  {
    name: 'Joe',
    date: '2021-02-08 08:28:36',

  },
];

/*const history = useHistory();

function handleClick() {
  history.push("/admin/overview/profile");
}*/

function ChildSelection() {

  const navigate = useNavigate();

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar />

    <div className="container mt-4 ">
    <Link to="/admin/record">
    <Button  className="mt-3 mb-2 float-right" type="primary"  icon={<PlusOutlined />} size="large" color='#ff5c5c'>
          

          Add new child

        </Button>
        </Link>

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