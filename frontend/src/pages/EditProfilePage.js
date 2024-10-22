import axios from "axios";
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const EditProfilePage = () => {

  const location = useLocation();

  const user = location.state.user;
  console.log("user: ", user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [nameErr, setNameErr] = useState();
  const [usernameErr, setUsernameErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [passwordErr, setPasswordErr] = useState();
  const [error, setError] = useState();
  const [photoErr, setPhotoErr] = useState();

  const [signupSuccessful, setSignupSuccessful] = useState();

  // Create a ref to access the file input field
  const fileInputRef = useRef(null);

  const navigate = useNavigate();


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newUser = {
  //     name,
  //     email,
  //     username,
  //     password,
  //     profilePhoto,
  //   };

  //   axios
  //     .post("http://localhost:3333/user/signup", newUser, { withCredentials: true })
  //     .then((res) => {
  //       console.log(res);
  //       console.log("user added successfully!");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("failed to add user!");
  //     });
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a new FormData object to handle file uploads
    const formData = new FormData();
    formData.append("name", name); // Append name
    formData.append("email", email); // Append email
    formData.append("username", username); // Append username
    formData.append("password", password); // Append password
  
    // Check if the file exists before appending
    if (profilePhoto) {
      formData.append("profilephoto", profilePhoto); // Append profilePhoto with the same field name as multer expects
    }
  
    // Send the form data to the server using axios
    axios
      .put("http://localhost:3333/user/update-profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",  // Important header for handling file uploads
        },
      })
      .then((res) => {
        console.log(res);
        //console.log("User added successfully!");

        setSignupSuccessful("Signup Successful!");

        setNameErr("");
        setUsernameErr("");
        setEmailErr("");
        setPasswordErr("");

        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setProfilePhoto(null);

        // Clear the file input field using the ref
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        alert("user updates!");
        navigate("/dashboard");
        
      })
      .catch((err) => {
        console.log(err);
        console.log("Failed to add user!");

        if (err.response && err.response.data && err.response.data.errors) {
          const errors = err.response.data.errors;
          if (errors.name) setNameErr(errors.name.msg);
          if (errors.username) setUsernameErr(errors.username.msg);
          if (errors.email) setEmailErr(errors.email.msg);
          if (errors.password) setPasswordErr(errors.password.msg);

          if (!errors.name) setNameErr("");
          if (!errors.username) setUsernameErr("");
          if (!errors.email) setEmailErr("");
          if (!errors.password) setPasswordErr("");
          
          setPhotoErr("");
          
        }
        else if(err.response.data.photoError){
            setPhotoErr(err.response.data.photoError);
            setNameErr("");
            setUsernameErr("");
            setEmailErr("");
            setPasswordErr("");
        }
        else{
          if(err.response.data) setError(err.response.data);
          //setUsernameErr("");
          //setPasswordErr("");
        }
      });
  };
  
  return (
    <div>
      <h1>Edit Profile Page</h1>
      {signupSuccessful && <p style={{ color: 'green' }}>{signupSuccessful}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {nameErr && <p style={{ color: 'red' }}>{nameErr}</p>}
        <label>Name:
          <input type='text' value={name} name='name' onChange={(e) => setName(e.target.value)}/>
        </label><br /><br />
        {emailErr && <p style={{ color: 'red' }}>{emailErr}</p>}
        <label>Email:
          <input type='text' value={email} name='email' onChange={(e) => setEmail(e.target.value)}/>
        </label><br /><br />
        {usernameErr && <p style={{ color: 'red' }}>{usernameErr}</p>}
        <label>Username:
          <input type='text' value={username} name='username' onChange={(e) => setUsername(e.target.value)}/>
        </label><br /><br />
        {passwordErr && <p style={{ color: 'red' }}>{passwordErr}</p>}
        <label>Password:
          <input type='password' value={password} name='password' onChange={(e) => setPassword(e.target.value)}/>
        </label><br /><br />
        {photoErr && <p style={{ color: 'red' }}>{photoErr}</p>}
        <label>Upload your photo:<br /><br />
          <input type='file' name='profilephoto' onChange={(e) => setProfilePhoto(e.target.files[0])} ref={fileInputRef}/>
        </label><br /><br />
        <button type='submit'>Update Profile</button>
      </form>
    </div>
  )
}

export default EditProfilePage
