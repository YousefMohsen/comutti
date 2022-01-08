import React from "react";
import styles from "./ImgContainer.module.css";

function ImgContainer({clicked,img}) {
  return (
    <div onClick={clicked} style={{backgroundImage: `url('${img}')`}} className={styles['img-container']}>
      
    </div>
  );
}

export default ImgContainer;
