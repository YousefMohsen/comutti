import { Avatar, Typography } from "antd";
import React, { useState, useEffect } from "react";
import {
  getDoc,
  doc

} from "firebase/firestore";
import "./Topbar.css";
import { db } from "../../firebase/firebase";
const { Title, Text } = Typography;

//this is the profile info bar of a child profile

function ProfileInfoBar2(props) {
  console.log('bar.props',props)
  const [profileData, setProfileData] = useState("");
  const fetchProfileData = async (childID) => {
    //gets all recording for child with childID
    const docRef = doc(db, "Child", childID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const profileData = { ...docSnap.data(), id: docSnap.id };
      setProfileData(profileData);
      // getDoc(profileData[0]).then(d=>console.log("Document data:", d))
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    async function fetchData() {
      //props.params.childName
      //.firestore().collection('cues')
      // const res =  db.collection('articles').doc('BHAQ2CraCAuM51UiYNj9').get()
      const childID = props.childId; //TODO: change "childname" to "childID";
      fetchProfileData(childID);
    }

    fetchData();
  }, []);
  return (
    <div className="profile-bar-container">
      <div className="profile-left-items">

      <Avatar
        style={{
          backgroundColor: "#f56a00",
          verticalAlign: "middle",
        }}
        size={100}
      />
      <div className="info-section">
        <Title level={4}>{profileData.name}'s Profile</Title>
        <Text>
          Here you will find all the recordings regarding the child. You can consult them or create new ones.
        </Text>
      </div>

      </div>


      <div className="profile-right-tems">


      <div className="info-stories">
        <Text>
         Stories
        </Text>
        <Title level={4}>4</Title>
      </div>
      <div className="info-minutes">
        <Text>
         Minutes
        </Text>
        <Title level={4}>25</Title>
      </div>
      </div>

    </div>
  );
}

export default ProfileInfoBar2;
