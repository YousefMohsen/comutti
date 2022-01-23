import Topbar from '../Components/Topbar'
import ProfileInfoBar2 from '../Components/ProfileInfoBar2'
import React from 'react';
import {Form, Radio, Typography, Input, Button, notification} from 'antd';
import {useNavigate, useParams} from "react-router-dom";
import {collection,addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import "./SessionPlaying.css";

const {Title} = Typography;

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

const onFinish = (values) => {
  console.log(values)
  if(values.text!==undefined||values.emoji!==undefined)
  {
    comment = Comment(indexComment, "124", values.text, values.emoji);
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

const handleStop = (comments, story, duration) => {
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
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  //create new recording
  addDoc(collection(db, "Recording"), {
    comments: commentArrayString,
    duration: duration,
    story: story,
    time: timestamp,
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

const handleStop2 = () => {
  console.log('Success:', comments);
  notification.success({
    message: 'Session recorded correctly'
  });
};


function SessionPlaying(props) {

  const navigate = useNavigate();

  
  comments =[];
  const storyId=props.params.storyId;
  const storyIndex = data.findIndex(x => x.id === storyId);
  const story = data[storyIndex];
  const storyName = story.title;

  return (
    <React.Fragment>

    <Topbar />

    <ProfileInfoBar2 childName={props.params.childName}/> 
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

      <Button type="primary" onClick={() => {handleStop(comments, story, '123') ;navigate('/admin/profile/'+props.params.childName)}}>
        Finish Session
      </Button>
      
      </div>
    </React.Fragment>


  );
}

export default withRouter(SessionPlaying);