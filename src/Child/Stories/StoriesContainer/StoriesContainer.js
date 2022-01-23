import { useMemo, useState, useEffect } from "react";
import QuestionContainer from "../QuestionContainer/QuestionContainer";
import Button from "../StartButton/Button";
import ImgContainer from "../StartPage/ImgContainer";
import StoryText from "../Text/StoryText";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

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
  const [currentStory, setCurrentStory] = useState(1);
  const [storyStarted, setStoryStarted] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "DeviceConnector", "2ZN0fs6xMbz93RjiXzrd"),
      (doc) => {
        console.log("Current data: ", doc.data());
        setStoryStarted(doc.data().storyStarted);
      }
    );
  }, []);

  const nextStory = () => {
    setCurrentStory((prev) => prev + 1);
  };

  const restartStory = () => {
    setCurrentStory(0);
  };

  const frames = useMemo(
    () => [
      {
        img: images[0].default,
      },
      {
        img: images[1].default,
        component: (
          <Button y="70%" x="50%" clicked={nextStory}>
            Touch to start
          </Button>
        ),
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
      },
      {
        img: images[4].default,
        component: (
          <StoryText x="50%" y="70%">
            One day James invited Marie over to his house to play.
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            When they arrived at James house they sat down on the sofa.
          </StoryText>
        ),
        clickToContinue: true,
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
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              How do you think Marie is feeling?
            </StoryText>
            <QuestionContainer
              bt1={
                <img
                  src={
                    require("../../../images/OtherImages/AngrySmiley.png")
                      .default
                  }
                />
              }
              bt2={
                <img
                  src={
                    require("../../../images/OtherImages/AnnoyedSmiley.png")
                      .default
                  }
                />
              }
              bt3={
                <img
                  src={
                    require("../../../images/OtherImages/CryingLaughingSmiley.png")
                      .default
                  }
                />
              }
              bt4={
                <img
                  src={
                    require("../../../images/OtherImages/SadSmiley.png").default
                  }
                />
              }
              correctAnswer="1"
              next={nextStory}
            />
          </>
        ),
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “Don’t be silly look at the window and you shall see” replied James
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              What do you think Marie is going to see through the window ?
            </StoryText>
            <QuestionContainer
              bt1={
                <img
                  src={
                    require("../../../images/OtherImages/animals/cat.png")
                      .default
                  }
                />
              }
              bt2={
                <img
                  src={
                    require("../../../images/OtherImages/animals/cow.png")
                      .default
                  }
                />
              }
              bt3={
                <img
                  src={
                    require("../../../images/OtherImages/animals/dog.png")
                      .default
                  }
                />
              }
              bt4={
                <img
                  src={
                    require("../../../images/OtherImages/animals/pig.png")
                      .default
                  }
                />
              }
              correctAnswer="3"
              next={nextStory}
            />
          </>
        ),
      },
      {
        img: images[12].default,
        component: (
          <StoryText x="50%" y="70%">
            She saw a dog “WOOF WOOF”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            They went back chatting away when suddenly they heard another sound
            “MEOW MEOW”.
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “How dear ! What’s that I hear, tell me it’s nothing to fear ! ”
            says Marie
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “Don’t be silly look at the window and you shall see” replied James
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              What do you think Marie is going to see through the window ?
            </StoryText>
            <QuestionContainer
              bt1={
                <img
                  src={
                    require("../../../images/OtherImages/animals/cat.png")
                      .default
                  }
                />
              }
              bt2={
                <img
                  src={
                    require("../../../images/OtherImages/animals/cow.png")
                      .default
                  }
                />
              }
              bt3={
                <img
                  src={
                    require("../../../images/OtherImages/animals/dog.png")
                      .default
                  }
                />
              }
              bt4={
                <img
                  src={
                    require("../../../images/OtherImages/animals/pig.png")
                      .default
                  }
                />
              }
              correctAnswer="1"
              next={nextStory}
            />
          </>
        ),
      },
      {
        img: images[17].default,
        component: (
          <StoryText x="50%" y="70%">
            She did just that and saw a cat “MEOW MEOW”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            They went back chatting away when suddenly they heard another sound
            “QUACK QUACK”.
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “How dear ! What’s that I hear, tell me it’s nothing to fear ! ”
            says Marie
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “Don’t be silly look at the window and you shall see” replied James
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              What do you think Marie is going to see through the window ?
            </StoryText>
            <QuestionContainer
              bt1={
                <img
                  src={
                    require("../../../images/OtherImages/animals/cat.png")
                      .default
                  }
                />
              }
              bt2={
                <img
                  src={
                    require("../../../images/OtherImages/animals/duck.png")
                      .default
                  }
                />
              }
              bt3={
                <img
                  src={
                    require("../../../images/OtherImages/animals/dog.png")
                      .default
                  }
                />
              }
              bt4={
                <img
                  src={
                    require("../../../images/OtherImages/animals/pig.png")
                      .default
                  }
                />
              }
              correctAnswer="2"
              next={nextStory}
            />
          </>
        ),
      },
      {
        img: images[22].default,
        component: (
          <StoryText x="50%" y="70%">
            She did just that and saw a duck “QUACK QUACK”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            They went back chatting away when suddenly they heard another sound
            “OINK OINK”.
          </StoryText>
        ),
        clickToContinue: true,
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
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “Don’t be silly look at the window and you shall see” replied James
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              What do you think Marie is going to see through the window ?
            </StoryText>
            <QuestionContainer
              bt1={
                <img
                  src={
                    require("../../../images/OtherImages/animals/cat.png")
                      .default
                  }
                />
              }
              bt2={
                <img
                  src={
                    require("../../../images/OtherImages/animals/duck.png")
                      .default
                  }
                />
              }
              bt3={
                <img
                  src={
                    require("../../../images/OtherImages/animals/dog.png")
                      .default
                  }
                />
              }
              bt4={
                <img
                  src={
                    require("../../../images/OtherImages/animals/pig.png")
                      .default
                  }
                />
              }
              correctAnswer="4"
              next={nextStory}
            />
          </>
        ),
      },
      {
        img: images[27].default,
        component: (
          <StoryText x="50%" y="70%">
            She did just that and saw a pig “OINK OINK”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            They went back chatting away when suddenly they heard another sound
            “MOO MOO”.
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “How dear ! What’s that I hear, tell me it’s nothing to fear ! ”
            says Marie
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            “Don’t be silly look at the window and you shall see” replied James
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              What do you think Marie is going to see through the window ?
            </StoryText>
            <QuestionContainer
              bt1={
                <img
                  src={
                    require("../../../images/OtherImages/animals/cow.png")
                      .default
                  }
                />
              }
              bt2={
                <img
                  src={
                    require("../../../images/OtherImages/animals/duck.png")
                      .default
                  }
                />
              }
              bt3={
                <img
                  src={
                    require("../../../images/OtherImages/animals/dog.png")
                      .default
                  }
                />
              }
              bt4={
                <img
                  src={
                    require("../../../images/OtherImages/animals/pig.png")
                      .default
                  }
                />
              }
              correctAnswer="1"
              next={nextStory}
            />
          </>
        ),
      },
      {
        img: images[32].default,
        component: (
          <StoryText x="50%" y="70%">
            She did just that and saw a cow “MOO MOO”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <StoryText x="50%" y="70%">
            The day has arrived for Marie’s visit to end.
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              How do you think Marie is feeling?
            </StoryText>
            <QuestionContainer
              bt1={
                <img
                  src={
                    require("../../../images/OtherImages/HappySmiley.png")
                      .default
                  }
                />
              }
              bt2={
                <img
                  src={
                    require("../../../images/OtherImages/AnnoyedSmiley.png")
                      .default
                  }
                />
              }
              bt3={
                <img
                  src={
                    require("../../../images/OtherImages/CryingLaughingSmiley.png")
                      .default
                  }
                />
              }
              bt4={
                <img
                  src={
                    require("../../../images/OtherImages/SadSmiley.png").default
                  }
                />
              }
              correctAnswer="1"
              next={nextStory}
            />
          </>
        ),
      },
      {
        img: images[35].default,
        component: (
          <StoryText x="50%" y="70%">
            As they said goddbye Marie said that she’ll miss the dog going “WOOF
            WOOF”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[36].default,
        component: (
          <StoryText x="50%" y="70%">
            The cat going “ MEOW MEOW”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[37].default,
        component: (
          <StoryText x="50%" y="70%">
            The duck going “QUACK QUACK”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[38].default,
        component: (
          <StoryText x="50%" y="70%">
            The pig going “OINK OINK”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[39].default,
        component: (
          <StoryText x="50%" y="70%">
            And the cow going “MOO MOO”
          </StoryText>
        ),
        clickToContinue: true,
      },
      {
        img: images[7].default,
        component: (
          <>
            <StoryText x="50%" y="20%">
              How are you feeling at the end of our story?
            </StoryText>
            <QuestionContainer
              bt1={
                <img
                  src={
                    require("../../../images/OtherImages/HappySmiley.png")
                      .default
                  }
                />
              }
              bt2={
                <img
                  src={
                    require("../../../images/OtherImages/AngrySmiley.png")
                      .default
                  }
                />
              }
              bt3={
                <img
                  src={
                    require("../../../images/OtherImages/AnnoyedSmiley.png")
                      .default
                  }
                />
              }
              bt4={
                <img
                  src={
                    require("../../../images/OtherImages/SadSmiley.png").default
                  }
                />
              }
              next={nextStory}
            />
          </>
        ),
      },
      {
        img: images[41].default,
        component: (
          <Button y="70%" x="50%" clicked={restartStory}>
            Restart
          </Button>
        ),
      },
    ],
    []
  );

  let content;
  console.log("storyStarted", storyStarted);
  if (!storyStarted) {
    return <ImgContainer clicked={() => {}} img={frames[0].img} />;
  }

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
