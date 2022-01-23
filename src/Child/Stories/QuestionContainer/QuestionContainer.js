import styles from "./QuestionContainer.module.css";

function QuestionContainer() {
  return <div className={styles.container}>
      <button className={styles.button}>1</button>
      <button className={styles.button}>2</button>
      <button className={styles.button}>3</button>
      <button className={styles.button}>4</button>
  </div>;
}

export default QuestionContainer;
