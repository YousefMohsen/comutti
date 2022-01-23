import { useState } from "react";
import styles from "./QuestionContainer.module.css";

function QuestionContainer({ bt1, bt2, bt3, bt4, correctAnswer, next }) {
  const [btn1WrongClicked, setBtn1WrongClicked] = useState(false);
  const [btn2WrongClicked, setBtn2WrongClicked] = useState(false);
  const [btn3WrongClicked, setBtn3WrongClicked] = useState(false);
  const [btn4WrongClicked, setBtn4WrongClicked] = useState(false);

  const btnClicked = (number) => {
    if (!correctAnswer || number === +correctAnswer) {
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

  console.log(styles);
  const btn1Classes = [styles.button,(btn1WrongClicked ? styles.wrong : '')].join(' ');
  const btn2Classes = [styles.button,(btn2WrongClicked ? styles.wrong : '')].join(' ');
  const btn3Classes = [styles.button,(btn3WrongClicked ? styles.wrong : '')].join(' ');
  const btn4Classes = [styles.button,(btn4WrongClicked ? styles.wrong : '')].join(' ');

  return (
    <div className={styles.container}>
      <button onClick={() => btnClicked(1)} className={btn1Classes}>
        {bt1}
      </button>
      <button onClick={() => btnClicked(2)} className={btn2Classes}>
        {bt2}
      </button>
      <button onClick={() => btnClicked(3)} className={btn3Classes}>
        {bt3}
      </button>
      <button onClick={() => btnClicked(4)} className={btn4Classes}>
        {bt4}
      </button>
    </div>
  );
}

export default QuestionContainer;
