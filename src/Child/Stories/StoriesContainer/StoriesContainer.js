import { useState } from "react";
import BoyOrGirl from "../BoyOrGirl/BoyOrGirl";
import StartPage from "../StartPage/StartPage";

function StoriesContainer() {
    
    const [currentStory,setCurrentStory] = useState(0)

    const nextStory = () => {
        console.log(currentStory);
        setCurrentStory(prev => prev + 1)
    }
    
    const stories = [
        <StartPage clicked={nextStory}/> ,
        <BoyOrGirl/> 
    ]

    


    return stories[currentStory]

  }
  
  export default StoriesContainer;
  