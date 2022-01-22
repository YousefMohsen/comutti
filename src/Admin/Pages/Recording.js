import Topbar from '../Components/Topbar'
import ProfileInfoBar2 from '../Components/ProfileInfoBar2'
import React, {Row} from 'react';
import {Typography,Timeline} from 'antd';
import {useParams} from "react-router-dom";

import "./SessionPlaying.css";

const {Title} = Typography;

function Comment(id, text, emotion, time)
{
    return {
        id,
        text,
        emotion,
        time,
    }
    
};

function Story(id, date, image, title)
{
    return  {
        id,
        date,
        image,
        title,
    }
    
};
 
const story = Story("0", '2021-04-05 08:16:22', "/img/admin/dog.png", "Woof Story")

const comment1 = Comment("0", "It is a dog", "0", '02:53');
const comment2 = Comment("1", "No!", "0", '03:13');
const comment3 = Comment("2", "Not audible", "6", '03:26');

const commentArray1 = [
    comment1,
    comment2,
    comment3,
];

const commentArray2 = [
    comment2,
    comment3,
];

const commentArray3 = [
    comment3,
    comment1,
];

function Recording(id, commentArray, story) {
    return {
        id,
        commentArray,
        story,
    }
};

const stories = [
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

const recording1 = Recording("0", commentArray1, stories[0]);
const recording2 = Recording("1", commentArray2, stories[1]);
const recording3 = Recording("2", commentArray3, stories[2]);

const recordings = [
    recording1,
    recording2,
    recording3,
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

const renderTimeline = (comment, index) => {
console.log(comment);

    return(
        <p>{comment.text}</p>
    )
  }

function SessionPlaying(props) {

  const recording = recordings[props.params.recordingId];
  const recordingName = recording.story.title;
  const commentArray = recording.commentArray;

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childName={props.params.childName}/> 
    <div className="container mt-4 ">
      <Title level={4}>{recordingName}</Title>
    </div>
    <div className="container mt-4 ">
    <Row gutter={16}>
      <Timeline>
        
      </Timeline>
    </Row>
    </div>
    </React.Fragment>


  );
}

export default withRouter(SessionPlaying);