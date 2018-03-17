import React from "react";

export default ({ changePage }) => (
	<div>
		<h1>ABOUT</h1>
		<p>
			This project was done for fun by Katie McGinley, and was thought up
			over ramen as "the most hipster thing we could think of". If you
			would like to get in touch, please email{" "}
			<a href="mailto:instaflip@mcgnly.com">instaflip@mcgnly.com</a>, or
			visit <a href="mcgnly.com">mcgnly.com</a>
		</p>
		<div onClick={() => changePage("main")}>Go Back to Main Page</div>
	</div>
);
