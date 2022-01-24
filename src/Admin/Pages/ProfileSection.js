import Topbar from "../Components/Topbar";
import ProfileInfoBar2 from "../Components/ProfileInfoBar2";
import React, { useState, useEffect } from "react";
import {
  getDoc,
  collection,
  doc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";

const { Column } = Table;

const data = [
  {
    key: 1,
    id: "0",
    date: "2021-04-05 08:16:22",
    image: "/img/admin/dog.png",
    title: "Woof Story",
  },
  {
    key: 2,
    id: "1",
    date: "2021-02-06 08:28:36",
    image: "/img/admin/forrest.png",
    title: "Adventure in the woods",
  },
  {
    key: 3,
    id: "2",
    date: "2021-02-07 08:26:50",
    image: "/img/admin/supermarket.png",
    title: "Let's buy some milk !",
  },
];

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

function ProfileSection(props) {
  const [profileData, setProfileData] = useState("");
  const [recordings, setRecordings] = useState([]);

  const fetchRecordings = async (childID) => {
    //gets all recording for child with childID
    const q = query(collection(db, "Recording"), where("child", "==", childID));
    const querySnapshot = await getDocs(q);
    const mappedRecordings = [];
    querySnapshot.forEach((doc) => {
        const docData = doc.data()
        let unix_timestamp = docData.time;
        let date = new Date(unix_timestamp);
        let day = date.getDate();
        let month = date.getMonth() +1;
        let year = date.getFullYear();
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        
        // Will display time in 10:30:23 format
        var formattedDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        
      mappedRecordings.push({ ...docData, id: doc.id, title: docData.story.title, date: formattedDate });
    });

    setRecordings(mappedRecordings);
  };
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
      const childID = props.params.childName; //TODO: change "childname" to "childID";
      fetchRecordings(childID);
      fetchProfileData(childID);
    }

    fetchData();
  }, []);

  const navigate = useNavigate();

  console.log("recordings", recordings);
  console.log("profileData", profileData);

  return (
    <React.Fragment>
      <Topbar />

      <ProfileInfoBar2 childName={profileData.name}  childId={ props.params.childName}/>

      <div className="container mt-4 ">
        <Link to={`/admin/profile/stories/${props.params.childName}`}>
          <Button
            className="mt-3 mb-2 float-right"
            type="primary"
            icon={<PlusOutlined />}
            size="large"
          >
            Create new
          </Button>
        </Link>

        <Table
          dataSource={recordings}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate(
                  "../admin/profile/stories/recording/" +
                    props.params.childName +
                    "/" +
                    record.id
                );
              }, // click row
            };
          }}
        >
          <Column title="Title" dataIndex="title" key="title" />
          <Column
            title="Date"
            dataIndex="date"
            key="date"
            sorter={{
              compare: (a, b) => a - b,
              multiple: 2,
            }}
            width="200px"
          />
        </Table>
      </div>
    </React.Fragment>
  );
}

export default withRouter(ProfileSection);
