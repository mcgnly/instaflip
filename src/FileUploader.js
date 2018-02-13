import React from "react";
import Dropzone from "react-dropzone";

export default ({ onDrop }) => (
	<div className="dropzone">
		<Dropzone onDrop={onDrop}>
			<p>
				Try dropping some files here, or click to select files to
				upload.
			</p>
		</Dropzone>
	</div>
);
