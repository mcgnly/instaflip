import React from "react";

export default ({ changePage }) => (
	<div>
		<h1>ORDER YOUR FLIPBOOK</h1>
		<p>
			If you would prefer to buy a professionally printed and bound
			flipbook, please enter your details below: visit{" "}
			<a href="mcgnly.com">mcgnly.com</a>
		</p>
		<div onClick={() => changePage("main")}>Go Back to Main Page</div>
	</div>
);
