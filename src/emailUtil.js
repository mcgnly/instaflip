import React, { Component } from "react";
import emailjs;

const SendEmail = ({ sendToAddress, pdf }) => {
	// parameters: service_id, template_id, template_parameters
	emailjs.send("<YOUR SERVICE ID>","<YOUR TEMPLATE ID>",{name: "James", notes: "Check this out!"});
	return (

	);
};

export default SendEmail;
