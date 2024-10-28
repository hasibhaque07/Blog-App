import React from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';

const ViewBlogPost = () => {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <Link to="/dashboard"><IoArrowBackSharp /></Link>
            <h1>{location.state.blog.blogTitle}</h1>
            <img src={location.state.coverPhotoUrl} alt='profile' style={{ width: '300px', height: '300px'  }}/>
            <div dangerouslySetInnerHTML={{ __html: location.state.blog.blogContent }}></div>
        </div>
    )
}

export default ViewBlogPost
