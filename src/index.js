import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ChildMain from "./Child/ChildMain";
import AdminMain from './Admin/AdminMain'
import LoginPage from './Admin/Pages/LoginPage'
import ProfileSection from './Admin/Pages/ProfileSection'
import { Link } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter> 
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="admin" element={<AdminMain />} />
      <Route path="admin/overivew" element={<Link to="/admin/overivew/profile"> profile section</Link>
} />
      <Route path="admin/overivew/profile" element={<ProfileSection />} />

      <Route path="admin/login" element={<LoginPage />} />
      <Route path="child" element={<ChildMain />} />
    </Routes>



    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
