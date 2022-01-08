import { useState } from "react";
import StoriesContainer from "./Stories/StoriesContainer/StoriesContainer";

function ChildMain() {

    const [storyStarted,setStoryStarted] = useState(false);


    return !storyStarted ? (
      <div className="container">
      <div>This is the CHIILD page</div>
        <button onClick={_ => setStoryStarted(true)}>Start Story</button>
      </div>
    ) : <StoriesContainer/>;
  }
  
  export default ChildMain;
  