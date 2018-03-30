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
				Flipbooks will be generated from about 5 seconds of video-
				uploads shorter than this will be repeated, longer than this
				will be cropped.
			</p>
		</div>
	</div>
);
