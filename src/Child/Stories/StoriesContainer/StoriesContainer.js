import { useMemo, useState } from "react";
import QuestionContainer from "../QuestionContainer/QuestionContainer";
import Button from "../StartButton/Button";
import ImgContainer from "../StartPage/ImgContainer";
import StoryText from "../Text/StoryText";

//from https://stackoverflow.com/questions/44607396/importing-multiple-files-in-react
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = Object.values(
  importAll(require.context("../../../images", false, /\.(png|jpe?g|svg)$/))
).sort(
  (a, b) => +a.default.match(/\/(\d+)/)[1] - +b.default.match(/\/(\d+)/)[1]
);

function StoriesContainer() {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => prev + 1);
  };

  const frames = useMemo(
    () => [
      {
        img: images[0].default,
        //  component: <StoryText>Text</StoryText>
        // type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
      {
        img: images[1].default,
        component: (
          <Button y="70%" x="50%" clicked={nextStory}>
            Touch to start
          </Button>
        ),
        // type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
      {
        img: images[2].default,
        component: (
          <>
            <Button x="85%" y="70%" color="#058ED9" clicked={nextStory}>
              Boy
            </Button>
            <Button x="20%" y="70%" color="#F49097" clicked={nextStory}>
              Girl
            </Button>
          </>
        ),
        // type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
      {
        img: images[4].default,
        component: (
          <StoryText x="50%" y="70%">
            There is a girl named Marie. Marie have a friend named James at
            school.
          </StoryText>
        ),
        clickToContinue: true,
        // type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
      {
        img: images[4].default,
        component: (
          <StoryText x="50%" y="70%">
            One day James invited Marie over to his house to play.
          </StoryText>
        ),
        clickToContinue: true,
        // type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            When they arrived at James house they sat down on the sofa.
          </StoryText>
        ),
        clickToContinue: true,
        // type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            They were chatting away when suddenly they heard a sound “WOOF
            WOOF”.
          </StoryText>
        ),
        clickToContinue: true,
        // type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “How dear ! What’s that I hear, tell me it’s nothing to fear !” says
            Marie.
          </StoryText>
        ),
        clickToContinue: true,
        // type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              How do you think Marie is feeling?
            </StoryText>
            <QuestionContainer
              bt1={<img src={require("../../../images/OtherImages/AngrySmiley.png").default}/>}
              bt2={<img src={require("../../../images/OtherImages/AnnoyedSmiley.png").default}/>}
              bt3={<img src={require("../../../images/OtherImages/CryingLaughingSmiley.png").default}/>}
              bt4={<img src={require("../../../images/OtherImages/SadSmiley.png").default}/>}
              correctAnswer="1"
              next={nextStory}
            />
          </>
        ),
        type: "question",
        // answers: ["1", "2", "3", "4"],
        // correctAnswer: 2,
      },
    ],
    []
  );

  let content;
  if (frames[currentStory].component) {
    content = (
      <ImgContainer
        clicked={frames[currentStory].clickToContinue ? nextStory : null}
        img={frames[currentStory].img}
      >
        {frames[currentStory].component}
      </ImgContainer>
    );
  } else {
    content = (
      <ImgContainer clicked={nextStory} img={frames[currentStory].img} />
    );
  }

  return content;
}

export default StoriesContainer;
