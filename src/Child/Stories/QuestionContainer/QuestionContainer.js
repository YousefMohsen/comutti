import { useState } from "react";
import styles from "./QuestionContainer.module.css";

function QuestionContainer({ bt1, bt2, bt3, bt4, correctAnswer, next }) {
  const [btn1WrongClicked, setBtn1WrongClicked] = useState(false);
  const [btn2WrongClicked, setBtn2WrongClicked] = useState(false);
  const [btn3WrongClicked, setBtn3WrongClicked] = useState(false);
  const [btn4WrongClicked, setBtn4WrongClicked] = useState(false);

  const btnClicked = (number) => {
    if (number === +correctAnswer) {
      next();
    }

    switch (number) {
      case 1:
        setBtn1WrongClicked(true);
        break;
      case 2:
        setBtn2WrongClicked(true);
        break;
      case 3:
        setBtn3WrongClicked(true);
        break;
      case 4:
        setBtn4WrongClicked(true);
        break;
    }
  };

  const btn1Classes = [styles.button,(btn1WrongClicked ? styles.wrong : null)];
  const btn2Classes = [styles.button,(btn2WrongClicked ? styles.wrong : null)];
  const btn3Classes = [styles.button,(btn3WrongClicked ? styles.wrong : null)];
  const btn4Classes = [styles.button,(btn4WrongClicked ? styles.wrong : null)];

  return (
    <div className={styles.container}>
      <button onClick={() => btnClicked(1)} className={btn1Classes.join('')}>
        {bt1}
      </button>
      <button onClick={() => btnClicked(2)} className={btn2Classes.join('')}>
        {bt2}
      </button>
      <button onClick={() => btnClicked(3)} className={btn3Classes.join('')}>
        {bt3}
      </button>
      <button onClick={() => btnClicked(4)} className={btn4Classes.join('')}>
        {bt4}
      </button>
    </div>
  );
}

export default QuestionContainer;
