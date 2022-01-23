import Topbar from '../Components/Topbar';
import ProfileInfoBar2 from '../Components/ProfileInfoBar2';
import React, { useState, useEffect } from "react";
import {Card, Col, Row} from 'antd';
import {useParams, Link } from "react-router-dom";
import { getDocs,collection,addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

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

/*const data = [
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
];*/

const renderCard = (data, index) => {
//todo use real soty id instead of ${index} 
  return(
    <Col span={8}>
        <Card title={data.story.title} align-items="center" key={data.story.id} style={{ width: 300 }}>
          <p><img src={data.story.icon} alt="broken" height={150} width={150} /></p>
          <p><Link to={`/admin/profile/stories/new/${data.childName}/${data.story.id}`}>Launch</Link></p>
        </Card>
    </Col>
  )
}

function StorySelection(props) {
  const [storyList, setStoryList] = useState([]);

  useEffect(() => {
    
    async function fetchStories() {

      const fetchedData = await getDocs(collection(db, "Story"));
      const formatedList = fetchedData.docs.map(obj=>{return{id:obj.id, ...obj.data()}})
      setStoryList(formatedList)

    }

    fetchStories()
  },[])

console.log('storylist',storyList)
  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childName={props.params.childName} childId={props.params.childName}/> 

    <div className="container mt-4 ">
    <Row gutter={16}>
      {storyList.map((story,index)=>renderCard({story,childName:props.params.childName},index))}
    </Row>

    </div>)
    </React.Fragment>

  );
}

export default withRouter(StorySelection);