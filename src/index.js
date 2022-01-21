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
import ChildSelection from './Admin/Pages/ChildSelection';
import StorySelection from './Admin/Pages/StorySelection';
import SessionPlaying from './Admin/Pages/SessionPlaying';


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter> 
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="admin" element={<AdminMain />} />
      <Route path="admin/overview" element={<ChildSelection />} />
      <Route path="admin/profile/stories/:childName" element={<StorySelection />} />
      <Route path="admin/profile/:childName" element={<ProfileSection />} />
      <Route path="admin/profile/stories/new/:storyId" element={<SessionPlaying />} />
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
