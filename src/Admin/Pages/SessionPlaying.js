import Topbar from '../Components/Topbar'
import ProfileInfoBar2 from '../Components/ProfileInfoBar2'
import {Form, Radio, Typography, Input, Button, notification} from 'antd';
import {useNavigate, useParams} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import { db } from "../../firebase/firebase";
import {addDoc, getDoc, collection, doc, where, query, getDocs} from "firebase/firestore";

import "./SessionPlaying.css";

const {Title} = Typography;

const withRouter = WrappedComponent => props => {
  const params = useParams();

  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};

function Comment(id, time, text, emoji) {
  return {
      id,
      time,
      text,
      emoji,
  }
};

let comments = [];
let comment = Comment();
let indexComment = 0;

let currentDate = new Date();
let startTime = currentDate.getTime();

const onFinish = (values) => {
  if(values.text!==undefined||values.emoji!==undefined)
  {
    console.log("startTime: ", startTime);
    currentDate = new Date();
    const currentTime = currentDate.getTime();
    const duration = currentTime - startTime;
    console.log("duration: ", duration);
    comment = Comment(indexComment, duration, values.text, values.emoji);
    comments.push(comment);
    console.log('success', comments);
    notification.success({message: 'Comment added succesfully'});
  }
  else {
    notification.error({message: 'You have to enter something'});
  }
};


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
  notification.error({message: 'An error occured'});
};

const handleStop = (childId, comments, story, startTime) => {
  console.log('Success:', comments);
  //convert each object comment into a string and then push it into an array of string
  let commentString = "";
  let commentArrayString = [];
  let comment = Comment();
  for (let index = 0; index < comments.length; index++) {
    comment = comments[index];
    commentString = JSON.stringify(comment);
    commentArrayString.push(commentString);
  }
  currentDate = new Date();
  const currentTime = currentDate.getTime();
  const duration = currentTime - startTime;
  //create new recording
  addDoc(collection(db, "Recording"), {
    child : childId,
    comments: commentArrayString,
    duration: duration,
    story: story,
    time: currentTime,
  }).then(d=>{
    console.log('success',d);
    notification.success({
      message: 'Session recorded correctly'
    });
  }).catch(er=>{
    console.log("onAddnewRecording.ERROR: ",er);
    notification.error({
      message: 'An error occured during the recording of the session'
    });
  })
};

function SessionPlaying(props) {

  currentDate = new Date();
  startTime = currentDate.getTime();

  const [storyData, setStoryData] = useState("");

  const fetchProfileData = async (storyID) => {
    console.log('storyID',storyID)
    //gets the story with storyID
    const docRef = doc(db, "Story", storyID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const storyData = { ...docSnap.data(), id: docSnap.id };
      setStoryData(storyData);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    async function fetchData() {
      const storyID = props.params.storyId; 
      fetchProfileData(storyID);
    }

    fetchData();
  }, []);


  console.log("story", storyData);
  

  const navigate = useNavigate();

  const childId=props.params.childId;
  const storyName = storyData.title;

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childId={props.params.childId}/> 
    <div className="container mt-4 ">
      <Title level={4}>{storyName}</Title>
    </div>
    <div className="container mt-4 ">
      <Form name="commentForm" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item name="emoji" rules={[{required: false}]}>
          <Radio.Group>
            <Radio.Button value="1" style={{ height: 100}}><img src="/img/admin/emoji_1.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="2" style={{ height: 100}}><img src="/img/admin/emoji_2.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="3" style={{ height: 100}}><img src="/img/admin/emoji_3.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="4" style={{ height: 100}}><img src="/img/admin/emoji_4.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="5" style={{ height: 100}}><img src="/img/admin/emoji_5.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="6" style={{ height: 100}}><img src="/img/admin/emoji_6.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="7" style={{ height: 100}}><img src="/img/admin/emoji_7.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="8" style={{ height: 100}}><img src="/img/admin/emoji_8.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="9" style={{ height: 100}}><img src="/img/admin/emoji_9.png" alt="broken" height={100} width={100} /></Radio.Button>
            <Radio.Button value="10" style={{ height: 100}}><img src="/img/admin/emoji_10.png" alt="broken" height={100} width={100} /></Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="text" rules={[{ required: false, message: 'Dario is trying to say...' }]}>
          <Input.TextArea/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>

      <Button type="primary" onClick={() => {handleStop(childId, comments, storyData, startTime) ;navigate('/admin/profile/'+childId)}}>
        Finish Session
      </Button>
      
      </div>
    </React.Fragment>


  );
}

export default withRouter(SessionPlaying);