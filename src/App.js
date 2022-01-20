import "./App.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Redirect } from "react-router"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/img/logo.svg" className="App-logo" alt="logo" />

        <Button className="mb-4" type="primary" shape="round">
          <Link to="/admin/overview"> Admin Page</Link>
        </Button>
        <Button type="secondary" shape="round">
        <Link to="/child"> Child Page</Link>
        </Button>
      </header>
    </div>
  );
}

export default App;
