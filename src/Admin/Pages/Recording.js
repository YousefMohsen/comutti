import Topbar from "../Components/Topbar";
import ProfileInfoBar2 from "../Components/ProfileInfoBar2";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { Typography, Timeline, Spin } from "antd";
import { useParams } from "react-router-dom";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  where,
  query,
  getDocs,
} from "firebase/firestore";

import "./SessionPlaying.css";

const { Title } = Typography;

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

const renderTimeline = (comment, index) => {
  console.log(comment);
  let com = JSON.parse(comment);
  let minute = com.time/1000;
  let imgSource = "/img/admin/emoji_"+com.emoji+".png";
  console.log(imgSource);

  return (
    <Timeline.Item>
      <img src={imgSource} alt="broken" height={20} width={20} /> "{com.text}" ({minute}s)
    </Timeline.Item>
  );
};

function Recording(props) {
  const [recordingData, setRecordingData] = useState(null);

  const fetchRecordingData = async (recordingID) => {
    //gets all recording for child with childID
    const docRef = doc(db, "Recording", recordingID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const recordingData = { ...docSnap.data(), id: docSnap.id };
      setRecordingData(recordingData);
      // getDoc(profileData[0]).then(d=>console.log("Document data:", d))
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    async function fetchData() {
      const recordingID = props.params.recordingId;

      fetchRecordingData(recordingID);
    }

    fetchData();
  }, []);

  if (!recordingData) {
    //wait until data is ready
    return (
      <div className="d-flex justify-content-center align-items-center pt-5">
        <Spin />
      </div>
    );
  }
  const recordingName = recordingData.story.title;
  const commentArray = recordingData.comments;

  return (
    <React.Fragment>
      <Topbar />

      <ProfileInfoBar2 childName={props.params.childName} />
      <div className="container mt-4 ">
        <Title level={4}>{recordingName}</Title>
      </div>
      <div className="container mt-4 ">
        <Timeline>
          {commentArray.map((commentArray, index) => renderTimeline(commentArray, index) )}
        </Timeline>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Recording);
