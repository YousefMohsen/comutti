import { Avatar, Typography } from "antd";

import "./Topbar.css";
const { Title, Text } = Typography;

//this is the profile info bar of the therapist profile

function ProfileInfoBar({ userLoggedIn = true }) {
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
        <Title level={4}>Welcome Back Mario</Title>
        <Text>
          Here you will find all the profiles of the children you have already
          worked with, with their sessions sorted in chronological order.
        </Text>
      </div>

      </div>


      <div className="profile-right-tems">


      <div className="info-children">
        <Text>
         Children
        </Text>
        <Title level={4}>3</Title>

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
  /* return (
      <div className="topbar-container">
 
        <div className="right-tems">
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            size="medium"
          />

          <p>Jon Snow</p>
          <TranslationOutlined style={{ marginLeft: "15px" }} />
        </div>
      </div>
    );*/
}

export default ProfileInfoBar;
