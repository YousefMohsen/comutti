import React from "react";
import styles from "./StartPage.module.css";
import shared from "../Shared.module.css";

function StartPage({clicked}) {
  return (
    <div onClick={clicked} className={[styles.startpage,shared.container].join(' ')}>
      
    </div>
  );
}

export default StartPage;
