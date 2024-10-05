import axios from "axios";
import React, { useState } from 'react';

const SignupPage = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [profilePhoto, setProfilePhoto] = useState(null);

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
      .post("http://localhost:3333/user/signup", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",  // Important header for handling file uploads
        },
      })
      .then((res) => {
        console.log(res);
        console.log("User added successfully!");
      })
      .catch((err) => {
        console.log(err);
        console.log("Failed to add user!");
      });
  };
  
  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name:
          <input type='text' name='name' onChange={(e) => setName(e.target.value)}/>
        </label><br /><br />
        <label>Email:
          <input type='text' name='email' onChange={(e) => setEmail(e.target.value)}/>
        </label><br /><br />
        <label>Username:
          <input type='text' name='username' onChange={(e) => setUsername(e.target.value)}/>
        </label><br /><br />
        <label>Password:
          <input type='password' name='password' onChange={(e) => setPassword(e.target.value)}/>
        </label><br /><br />
        <label>Upload your photo:<br /><br />
          <input type='file' name='profilephoto' onChange={(e) => setProfilePhoto(e.target.files[0])}/>
        </label><br /><br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignupPage
