import React from "react";
import styles from "./BoyOrGirl.module.css";
import shared from "../Shared.module.css";

function BoyOrGirl({clicked}) {
  return (
    <div onClick={clicked} className={[styles.style,shared.container].join(' ')}>
      
    </div>
  );
}

export default BoyOrGirl;