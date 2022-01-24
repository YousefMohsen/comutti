import { Avatar, Button } from "antd";
import { ArrowLeftOutlined, TranslationOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./Topbar.css";

function Topbar({ userLoggedIn = true }) {
  const navigate = useNavigate();

  if (userLoggedIn) {
    return (
      <div className="topbar-container">
        <ArrowLeftOutlined
          style={{ fontSize: "20px" }}
          onClick={() => navigate(-1)}
        />
        <div className="right-tems">
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            size="medium"
          />

          <p>Mario Snow</p>
          <TranslationOutlined style={{ marginLeft: "15px" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="topbar-container">
      <img src="logo.png" alt="didn't load correctly"/>
      <div className="right-tems">
        <Button style={{ marginRight: "10px" }} type="primary">
          Login{" "}
        </Button>
        <Button type="default">Register </Button>
      </div>
    </div>
  );
}

export default Topbar;
