import { Avatar, Typography } from "antd";

import "./Topbar.css";
const { Title, Text } = Typography;

//this is the profile info bar of a child profile

function ProfileInfoBar2(props) {
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
        <Title level={4}>{props.childName}'s Profile</Title>
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
