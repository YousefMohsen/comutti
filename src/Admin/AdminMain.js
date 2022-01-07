import Topbar from './Components/Topbar'
import ProfileInfoBar from './Components/ProfileInfoBar'
import React from 'react';


function AdminMain() {
  return (
    <React.Fragment>


    <Topbar />
    <ProfileInfoBar/>

    <div className="container">
      
        <div>This is the admin page</div>

    </div>
    </React.Fragment>

  );
}

export default AdminMain;
