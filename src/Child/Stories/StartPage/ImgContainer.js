import React from "react";
import styles from "./ImgContainer.module.css";

function ImgContainer({img,children}) {
  return (
    <div style={{backgroundImage: `url('${img}')`}} className={styles['img-container']}>
      {children}
    </div>
  );
}

export default ImgContainer;
