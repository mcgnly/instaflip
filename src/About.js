import React from "react";
import "./About.css";

export default ({ changePage }) => (
	<div>
		<h1>ABOUT</h1>
		<p className="aboutText">
			This project was done for fun by Katie McGinley, and was thought up
			over ramen as "the most hipster thing we could think of". If you
			would like to get in touch, please email{" "}
			<a href="mailto:instaflip@mcgnly.com">instaflip@mcgnly.com</a>, or
			visit <a href="www.mcgnly.com">mcgnly.com</a> to read about some of the
			other projects I have done.
		</p>
		<p>
			If you liked this project and would like to help support it,
			consider making a pledge at{" "}
			<a href="https://www.patreon.com/mcgnly">patreon.com/mcgnly</a>
		</p>
		<div className="pageChange" onClick={() => changePage("main")}>
			Go Back to Main Page
		</div>
	</div>
);

// <mcgnly />;
