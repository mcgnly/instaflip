import React from "react";
import Dropzone from "react-dropzone";
import "./FileUploader.css";

export default ({ onDrop }) => (
	<div className="dropzone">
		<Dropzone onDrop={onDrop} accept=".mp4" className="dropButton">
			<p>GO</p>
		</Dropzone>
		<div className="descriptionText">
			<h4>
				Upload your instagram story or other short .mp4 file. You may
				want to do this over wifi.
			</h4>
			<p>
				Videos under 2 seconds will be automatically repeated, and will
				be cropped automatically after 5 seconds- This helps keep the
				book a manageable size
			</p>
		</div>
	</div>
);
