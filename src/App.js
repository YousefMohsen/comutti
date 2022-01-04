import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
  import { getDocs,collection } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./firebase/firebase";


function App() {


  useEffect(() => {

    async function test() {
      
      const querySnapshot = await getDocs(collection(db, "Child"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });

    }

    test()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Button className="mb-4" type="primary" shape="round">
          <Link to="/admin"> Admin Page</Link>
        </Button>
        <Button type="secondary" shape="round">
        <Link to="/child"> Child Page</Link>
        </Button>
      </header>
    </div>
  );
}

export default App;
