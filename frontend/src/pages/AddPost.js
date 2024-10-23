import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react';


const AddPost = ({ placeholder }) => {
    const editor = useRef(null);
	const [content, setContent] = useState('');

	// const config = useMemo(
	// 	{
	// 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
	// 		placeholder: placeholder || 'Start typings...'
	// 	},
	// 	[placeholder]
	// );
  return (
    <div>
      <label>Title:
        <input type='text' />
      </label>
      <JoditEditor
			ref={editor}
			value={content}
			// config={config}
			// tabIndex={1} // tabIndex of textarea
			// onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {setContent(newContent)}}
		/>
    </div>
  )
}

export default AddPost
