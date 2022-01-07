import { Avatar } from "antd";
import { ArrowLeftOutlined, TranslationOutlined } from "@ant-design/icons";

import "./Topbar.css";

function Topbar({ userLoggedIn = false }) {
  return (
    <div className="topbar-container">
      <ArrowLeftOutlined style={{ fontSize: "20px" }} />

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
