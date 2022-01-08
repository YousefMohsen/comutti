import { useState } from "react";
import ImgContainer from "../StartPage/ImgContainer";


//from https://stackoverflow.com/questions/44607396/importing-multiple-files-in-react
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
const images = Object
    .values(importAll(require.context('../../../images', false, /\.(png|jpe?g|svg)$/)))
     .sort((a,b) => +a.default.match(/\/(\d+)/)[1] - +b.default.match(/\/(\d+)/)[1]);

function StoriesContainer() {
    console.log(images);
    
    const [currentStory,setCurrentStory] = useState(0)

    const nextStory = () => {
        setCurrentStory(prev => prev + 1)
    }
    
    


    return <ImgContainer img={images[currentStory].default}  clicked={nextStory}/>

  }
  
  export default StoriesContainer;
  