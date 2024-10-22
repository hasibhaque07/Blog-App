import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProfilePage = () => {

  const location = useLocation();

  const user = location.state.user;
  const profilePhotoUrl = location.state.profilePhotoUrl;

  //console.log(location.state);
  return (
    <div>
      <h1>profile page</h1>
      <img src={profilePhotoUrl} alt='profile' style={{ width: '150px', height: '150px' }}/>
      <p><strong>Name: </strong>{user.name}</p>
      <p><strong>Username: </strong>{user.username}</p>
      <p><strong>Email: </strong>{user.email}</p>
      {/* <p><strong>Password: </strong>{user.password}</p> */}
      <Link to="/edit-profile-page" state={{user}}><button>Edit Profile</button></Link>
    </div>
  )
}

export default ProfilePage
