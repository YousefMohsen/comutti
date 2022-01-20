import Topbar from '../Components/Topbar';
import ProfileInfoBar2 from '../Components/ProfileInfoBar2';
import React from 'react';
import {Card, Col, Row} from 'antd';
import { useParams } from "react-router-dom";

import "./StorySelection.css";

const withRouter = WrappedComponent => props => {
  const params = useParams();

  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};

function StorySelection(props) {

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childName={props.params.childName}/> 

    <div className="container mt-4 ">

      <Row gutter={16}>
      <Col span={8}>
        <Card title="Woof Story" align-items="center" style={{ width: 300 }}>
          <p><img src="/img/admin/dog.png" alt="broken" height={150} width={150} /></p>
          <p>Launch</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Adventure in the woods" align-items="center" style={{ width: 300 }}>
          <p><img src="/img/admin/forrest.png" alt="broken" height={150} width={150} /></p>
          <p>Launch</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Let's buy some milk !" align-items="center" style={{ width: 300 }}>
          <p><img src="/img/admin/supermarket.png" alt="broken" height={150} width={150} /></p>
          <p>Launch</p>
        </Card>
      </Col>
    </Row>

    </div>
    </React.Fragment>

  );
}

export default withRouter(StorySelection);