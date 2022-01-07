import { Avatar } from "antd";
import { ArrowLeftOutlined, TranslationOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

import "./Topbar.css";

function Topbar({ userLoggedIn = false }) {
    const navigate = useNavigate();

  return (
    <div className="topbar-container">
      <ArrowLeftOutlined style={{ fontSize: "20px" }} onClick={() => navigate(-1)}/>

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
  );
}

export default Topbar;
