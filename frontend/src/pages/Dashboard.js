import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

import "./Dashboard.css";

const Dashboard = () => {

  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);

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

  useEffect(() => {
    axios
      .get("http://localhost:3333/blog/", { withCredentials: true })
      .then((res) => {
        console.log("blogs got successfully!");
        console.log(res);

        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      })
  }, []);

  //console.log("user: ", user);
  //console.log("name: ", user.name);

  console.log("blogs: ",blogs);

  // Construct the URL to access the profile photo
  const profilePhotoUrl = user.profilePhoto 
    ? `http://localhost:3333/uploadFolder/profilePhotos/${user.profilePhoto}`
    : "http://localhost:3333/uploadFolder/profilePhotos/default.jpg";

  const handleDeleteBlog = (id) => {
    axios
      .delete(`http://localhost:3333/blog/${id}` , { withCredentials: true })
      .then((res) => {
        console.log(res);
        alert("Blog deleted");

        const updatedBlogs = blogs.filter((blog) => blog._id !== id);
        setBlogs(updatedBlogs);
      })
      .catch((err) => {
        console.log("Blog deletion error!");
        console.log(err);
      })

  }

  return (
    <div style={{ display: "flex"}}>
      <div style={{ marginRight: "50px"}}>
        <img src={profilePhotoUrl} alt='profile' style={{ width: '150px', height: '`50px' }}/>
        <Link to="/profile-page" state={{user, profilePhotoUrl}}><p>{ user.name }</p></Link>
        <Link to="/add-post" ><button>New Post</button></Link>
      </div>
      <div>
        {blogs && blogs.map((blog) => {
          
          const coverPhotoUrl = blog.coverPhoto 
            ? `http://localhost:3333/uploadFolder/blogPhotos/${blog.coverPhoto}`
            : "";
          
          return(
            <div className="blog-container" key={blog._id}>
              <img src={coverPhotoUrl} alt='profile' style={{ width: '60px', height: '60px'  }}/>
              <h1>{blog.blogTitle}</h1>
              <div>
                <Link to="/view-blog-post" state={{blog, coverPhotoUrl}}><IoEyeSharp /></Link>
                <Link to="/edit-blog-post" state={{blog, coverPhotoUrl}}><CiEdit /></Link>
                <MdDelete onClick={() => handleDeleteBlog(blog._id)}/>
              </div>
        
              {/* <div dangerouslySetInnerHTML={{ __html: blog.blogContent }}></div> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
