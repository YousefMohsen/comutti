import Topbar from '../Components/Topbar'
import ProfileInfoBar2 from '../Components/ProfileInfoBar2'
import React, { useState,useEffect } from 'react';
import { getDocs,collection,addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {Typography,Timeline, Row} from 'antd';
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

const comment1 = Comment("0", "It is a dog", "/img/admin/emoji_1.png", '02:53');
const comment2 = Comment("1", "No!", "/img/admin/emoji_1.png", '03:13');
const comment3 = Comment("2", "Not audible", "/img/admin/emoji_6.png", '03:26');

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
        <Timeline.Item><img src={comment.emotion} alt="broken" height={20} width={20} /> "{comment.text}" ({comment.time})</Timeline.Item>
    )
  }

  

function SessionPlaying(props) {

  
  //get the Recording table
  const [recordingData, setRecordingData] = useState([]);
  useEffect(() => {
      
    async function fetchRecordings() {

      collection(db, "Recording");
      const fetchedData = await getDocs(collection(db, "Recording"));
      const formatedList = fetchedData.docs.map(obj=>obj.data());
      setRecordingData(formatedList);
    }

    fetchRecordings()
  },[])

  //find the right recording with the id in the path
  const recording = recordingData[0];
  const recData = {...recording.data() , id: recording.id};
  console.log(recData.id);
  //const recording0 = recordingData[0];
  //let commentsRec0 = recording0.comments;
  //const recordingIndex = recordingData.find(x => x.key === profileData.id);
  //const recording = recordingData[recordingIndex];
  //const recordingName = recording.story.title;
  const recordingName = "";
  //const commentArray = recording.comments;
  const commentArray = [];

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childName={props.params.childName}/> 
    <div className="container mt-4 ">
      <Title level={4}>{recordingName}</Title>
    </div>
    <div className="container mt-4 ">
      <Timeline>
        {commentArray.map((comment,index)=>renderTimeline(comment,index))}
      </Timeline>
    </div>
    </React.Fragment>


  );
}

export default withRouter(SessionPlaying);