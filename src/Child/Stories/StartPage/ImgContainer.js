import React from "react";
import styles from "./ImgContainer.module.css";

function ImgContainer({clicked,img,children}) {
  return (
    <div onClick={clicked} style={{backgroundImage: `url('${img}')`}} className={styles['img-container']}>
      {children}
    </div>
  );
}

export default ImgContainer;
