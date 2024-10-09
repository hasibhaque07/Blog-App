import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {

  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3333/user/", { withCredentials: true })
      .then((res) => {
        console.log("user found!");
        console.log(res);

        setUser(res.data.user[0]);
      })
      .catch((err) => {
        console.log("There was an error!");
        console.log(err);
      })
  }, []);

  //console.log("user: ", user);
  //console.log("name: ", user.name);

  // Construct the URL to access the profile photo
  const profilePhotoUrl = user.profilePhoto 
    ? `http://localhost:3333/uploadFolder/profilePhotos/${user.profilePhoto}`
    : "http://localhost:3333/uploadFolder/profilePhotos/default.jpg";

  return (
    <div>
        <img src={profilePhotoUrl} alt='profile' style={{ width: '150px', height: '150px' }}/>
        <p>{ user.name }</p>
      
    </div>
  )
}

export default Dashboard
