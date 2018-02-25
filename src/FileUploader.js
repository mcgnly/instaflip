import React from "react";
import Dropzone from "react-dropzone";
import './FileUploader.css';

const style = {
	color:'black',
	backgroundColor:'yellow'
}
export default ({ onDrop }) => (
	<div className="dropzone">

		<Dropzone onDrop={onDrop} accept=".mp4" className='dropButton'>
			<p >
				GO
			</p>
		</Dropzone>
		<div className='descriptionText'>
			<h4>Upload your instagram story or other short .mp4 file</h4>
			<p>Videos work best if they are at least 2 seconds long, and will be cropped automatically after 5 seconds- This helps keep the book a manageable size</p>
		</div>
	</div>
);
