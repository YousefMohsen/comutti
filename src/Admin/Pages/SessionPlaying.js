import Topbar from "../Components/Topbar";
import ProfileInfoBar2 from "../Components/ProfileInfoBar2";
import {
  Form,
  Radio,
  Typography,
  Input,
  Button,
  notification,
  Spin,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  where,
  query,
  setDoc,
} from "firebase/firestore";

import "./SessionPlaying.css";

const { Title } = Typography;

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

function Comment(id, time, text, emoji) {
  return {
    id,
    time,
    text,
    emoji,
  };
}

let comments = [];
let comment = Comment();
let indexComment = 0;

let currentDate = new Date();
let startTime = currentDate.getTime();

const onFinish = (values) => {
  if (values.text !== undefined || values.emoji !== undefined) {
    console.log("startTime: ", startTime);
    currentDate = new Date();
    const currentTime = currentDate.getTime();
    const duration = currentTime - startTime;
    console.log("duration: ", duration);
    comment = Comment(indexComment, duration, values.text, values.emoji);
    comments.push(comment);
    console.log("success", comments);
    notification.success({ message: "Comment added succesfully" });
  } else {
    notification.error({ message: "You have to enter something" });
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
  notification.error({ message: "An error occured" });
};

const handleStop = (childId, comments, story, startTime) => {
  console.log("story", story);
  console.log("Success:", comments);
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
    child: childId,
    comments: commentArrayString,
    duration: duration,
    story: story,
    time: currentTime,
  })
    .then((d) => {
      console.log("success", d);

      setDoc(doc(db, "DeviceConnector", "2ZN0fs6xMbz93RjiXzrd"), {
        //end child session
        storyStarted: false,
      });

      notification.success({
        message: "Session recorded correctly",
      });
    })
    .catch((er) => {
      console.log("onAddnewRecording.ERROR: ", er);
      notification.error({
        message: "An error occured during the recording of the session",
      });
    });
};

function SessionPlaying(props) {
  const navigate = useNavigate();

  currentDate = new Date();
  startTime = currentDate.getTime();

  const [storyData, setStoryData] = useState("");

  const fetchProfileData = async (storyID) => {
    console.log("storyID", storyID);
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
  const startStoryOnChildDevice = () => {
    setDoc(doc(db, "DeviceConnector", "2ZN0fs6xMbz93RjiXzrd"), {
      storyStarted: true,
    });
  };

  useEffect(() => {
    async function fetchData() {
      const storyID = props.params.storyId;
      fetchProfileData(storyID);
    }
    startStoryOnChildDevice();
    fetchData();
  }, []);

  if (!storyData) {
    //wait until data is ready
    return (
      <div className="d-flex justify-content-center align-items-center pt-5">
        <Spin />
      </div>
    );
  }

  console.log("story", storyData);
  console.log("storyData", storyData);

  const childId = props.params.childId;
  const storyName = storyData.title;
  const emojiSize = 100;
  return (
    <React.Fragment>
      <Topbar />

      <ProfileInfoBar2 childId={props.params.childId} />
      <div className="container mt-4 ">
        <div className="row">
          <div className="col-6 ">
            <Title level={4}>{storyName}</Title>
          </div>
          <div className="col-6 ">
            <Title className="mt-b" level={4}>
              {'Story recording'}
            </Title>
          </div>
        </div>
      </div>
      <div className="container mt-4 ">
        <div className="row">
          <div className="col-6 ">
            <Form
              className=""
              name="commentForm"
              labelCol={{ span: 8 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item name="emoji" rules={[{ required: false }]}>
                <Radio.Group className="emoji-container">
                  <Radio.Button value="1" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_1.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="2" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_2.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="3" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_3.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="4" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_4.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="5" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_5.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="6" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_6.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="7" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_7.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="8" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_8.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="9" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_9.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                  <Radio.Button value="10" style={{ height: "auto" }}>
                    <img
                      src="/img/admin/emoji_10.png"
                      alt="broken"
                      height={emojiSize}
                      width={emojiSize}
                    />
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="text"
                rules={[
                  { required: false, message: "Dario is trying to say..." },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="col-6">
            <img
              className="rec-demo-image"
              src="/img/admin/recordingDemoP.png"
              alt="recDemo"
            />
          </div>
        </div>

        <div className=" pb-2 row d-flex justify-content-center">
          <Button
            type="primary"
            onClick={() => {
              handleStop(childId, comments, storyData, startTime);
              navigate("/admin/profile/" + childId);
            }}
          >
            Finish Session
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(SessionPlaying);
