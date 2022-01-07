import { Avatar, Button, PageHeader, Typography } from "antd";
import { ArrowLeftOutlined, TranslationOutlined } from "@ant-design/icons";

import "./Topbar.css";
const { Title, Text } = Typography;

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
        <Title level={4}>Darios porfile</Title>
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
