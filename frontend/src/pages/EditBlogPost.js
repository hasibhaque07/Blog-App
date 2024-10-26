import axios from "axios";
import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";


const EditBlogPost = ({ placeholder }) => {

    const location = useLocation();
    const blog = location.state.blog;
    const coverPhotoUrl = location.state.coverPhotoUrl;

    console.log("editpage: ",location.state);

    const editor = useRef(null);
	const [content, setContent] = useState(blog.blogContent);
	const [blogTitle, setBlogTitle] = useState(blog.blogTitle);
	const [coverPhoto, setCoverPhoto] = useState(null);

	const [blogSuccess, setBlogSuccess] = useState("");
	const [error, setError] = useState();
	const [photoErr, setPhotoErr] = useState();

	// Create a ref to access the file input field
	const fileInputRef = useRef(null);

	const navigate = useNavigate();

	// const config = useMemo(
	// 	{
	// 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
	// 		placeholder: placeholder || 'Start typings...'
	// 	},
	// 	[placeholder]
	// );

  const handleSubmit = (e) => {
	e.preventDefault();
	//console.log("Title: ", blogTitle);
	//console.log("content: ", content);

	if(blogTitle){
		const formData = new FormData();

		formData.append("blogTitle", blogTitle);
		formData.append("blogContent", content);

		if(coverPhoto){
			formData.append("coverPhoto", coverPhoto);
		}
		
		axios
			.put(`http://localhost:3333/blog/${blog._id}`, formData, {
				withCredentials: true,
				headers: {
				"Content-Type": "multipart/form-data",  // Important header for handling file uploads
				},
			})
			.then((res) => {
				console.log("blog updated successfully!");
				console.log(res);
				setBlogSuccess("Blog Updated successfully!");

				setError("");
				setPhotoErr("");

				setBlogTitle("");
				setContent("");
				// Clear the file input field using the ref
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}

				navigate("/dashboard");
			})
			.catch((err) => {
				console.log("failed to add blog!");
				console.log("error: ", err);

				if(err.response.data.photoError){
					setPhotoErr(err.response.data.photoError);
					setError("");
				}
				else{
				if(err.response.data) setError(err.response.data);
				setPhotoErr("");
				}
			})
	}
	else{
		setError("Title is empty!");
	}

  }
  return (
    <div>
	  <h1>New Blog Post:</h1>
	  {blogSuccess && <p style={{ color: 'green' }}>{blogSuccess}</p>}
	  {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
		<label>Title:
		<input 
  			type='text'
			name="blogTitle" 
			value={blogTitle}
  			onChange={(e) => setBlogTitle(e.target.value)} 
		/>
		</label><br /><br />
        <img src={coverPhotoUrl} alt='profile' style={{ width: '300px', height: '300px'  }}/><br /><br />
		{photoErr && <p style={{ color: 'red' }}>{photoErr}</p>}
        <label>Change Cover photo:
          <input type='file' name='coverPhoto' onChange={(e) => setCoverPhoto(e.target.files[0])} ref={fileInputRef}/>
        </label><br /><br />
		<JoditEditor
				ref={editor}
				value={content}
				// config={config}
				// tabIndex={1} // tabIndex of textarea
				// onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
				onChange={newContent => {setContent(newContent)}}
		/>
		<button>Update Post</button>
	  </form>
    </div>
  )
}

export default EditBlogPost
