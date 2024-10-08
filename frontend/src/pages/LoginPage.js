import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErr, setUsernameErr] = useState();
  const [passwordErr, setPasswordErr] = useState();
  const [error, setError] = useState();

  const handleSubmit = (e) =>{
    e.preventDefault();

    const data = {
      username,
      password,
    };

    axios
      .post("http://localhost:3333/user/login", data, { withCredentials: true })
      .then((res) => {
        console.log("login successful");
        console.log(res);
        console.log(res.data.user);

        setUsernameErr("");
        setPasswordErr("");
        //navigate("/todos");
        alert("login successful!");
      })
      .catch((err) => {
        console.log("login failed");
        console.log(err);

        if (err.response && err.response.data && err.response.data.errors) {
          const errors = err.response.data.errors;
          if (errors.username) setUsernameErr(errors.username.msg);
          if (errors.password) setPasswordErr(errors.password.msg);

          if(!errors.username) setUsernameErr("");
          if(!errors.password) setPasswordErr("");
          setError("");
        }
        else if (err.response && (err.response.data.passwordError || err.response.data.usernameError)) {
          if(err.response.data.passwordError) setPasswordErr(err.response.data.passwordError);
          if(err.response.data.usernameError) setUsernameErr(err.response.data.usernameError);

          if(!err.response.data.passwordError) setPasswordErr("");
          if(!err.response.data.usernameError) setUsernameErr("");
          setError("");
          
        }
        else{
          if(err.response.data) setError(err.response.data);
          setUsernameErr("");
          setPasswordErr("");
        }
      })
  };

  //console.log("usernameErr", usernameErr);
  //console.log("passwordErr", passwordErr);
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const data = {
  //     username,
  //     password,
  //   };

  //   axios
  //     .post("http://localhost:3333/user/login", data, { withCredentials: true })
  //     .then((res) => {
  //       console.log("Login successful");
  //       console.log(res);
  //       console.log(res.data.user);

  //       // If login is successful, navigate to another page
  //       navigate("/todos");
  //     })
  //     .catch((err) => {
  //       console.log("Login failed");
  //       console.log(err); // Log the entire error object for debugging

  //       // Check if err.response exists before accessing err.response.data
  //       if (err.response) {
  //         // Check if err.response.data.errors exist (validation errors)
  //         if (err.response.data && err.response.data.errors) {
  //           const errors = err.response.data.errors;
  //           if (errors.username) setUsernameErr(errors.username.msg);
  //           if (errors.password) setPasswordErr(errors.password.msg);

  //           if (!errors.username) setUsernameErr("");
  //           if (!errors.password) setPasswordErr("");
  //           setError("");
  //         }
  //         // Check for specific errors (like username or password errors)
  //         else if (err.response.data && (err.response.data.passwordError || err.response.data.usernameError)) {
  //           if (err.response.data.passwordError) setPasswordErr(err.response.data.passwordError);
  //           if (err.response.data.usernameError) setUsernameErr(err.response.data.usernameError);

  //           if (!err.response.data.passwordError) setPasswordErr("");
  //           if (!err.response.data.usernameError) setUsernameErr("");
  //           setError("");
  //         }
  //         // If there is a generic error message in err.response.data
  //         else if (err.response.data) {
  //           setError(err.response.data);
  //           setUsernameErr("");
  //           setPasswordErr("");
  //         }
  //       } else {
  //         // If err.response is undefined, it might be a network issue or a server problem
  //         setError("An unexpected error occurred. Please try again later.");
  //         setUsernameErr("");
  //         setPasswordErr("");
  //       }
  //     });
  // };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {usernameErr && <p style={{ color: 'red' }}>{usernameErr}</p>}
        <label>Username:
          <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label><br /><br />
        {passwordErr && <p style={{ color: 'red' }}>{passwordErr}</p>}
        <label>Password:
          <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label><br /><br />
        <button type='submit'>Login</button>
      </form>
      <Link to = "/signup">Signup</Link>
    </div>
    
  )
}

export default LoginPage
