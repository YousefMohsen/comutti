import Topbar from '../Components/Topbar';
import ProfileInfoBar2 from '../Components/ProfileInfoBar2';
import React from 'react';
import {Card, Col, Row} from 'antd';
import {useParams, Link } from "react-router-dom";

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

const data = [
  {
    key: 1,
    image: "/img/admin/dog.png",
    title: "Woof Story",
  },
  {
    key: 2,
    image: "/img/admin/forrest.png",
    title: "Adventure in the woods",
  },
  {
    key : 3,
    image: "/img/admin/supermarket.png",
    title: "Let's buy some milk !",
  },
];

const renderCard = (card, index) => {

  return(
    <Col span={8}>
        <Card title={card.title} align-items="center" key={card.key} style={{ width: 300 }}>
          <p><img src={card.image} alt="broken" height={150} width={150} /></p>
          <p><Link to={`/admin/profile/stories/new/${card.key}`}>Launch</Link></p>
        </Card>
    </Col>
  )
}

function StorySelection(props) {

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childName={props.params.childName}/> 

    <div className="container mt-4 ">
    <Row gutter={16}>
      {data.map((renderCard))}
    </Row>

    </div>)
    </React.Fragment>

  );
}

export default withRouter(StorySelection);