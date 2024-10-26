import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewBlogPost = () => {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <h1>{location.state.blog.blogTitle}</h1>
            <img src={location.state.coverPhotoUrl} alt='profile' style={{ width: '300px', height: '300px'  }}/>
            <div dangerouslySetInnerHTML={{ __html: location.state.blog.blogContent }}></div>
        </div>
    )
}

export default ViewBlogPost
