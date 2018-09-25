import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import STRIPE_PUBLISHABLE from "./constants/stripe";
import PAYMENT_SERVER_URL from "./constants/server";
import UPLOAD_SERVER_URL from "./constants/upload";

const CURRENCY = "EUR";

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
	alert("Payment and upload Successful");
};

const errorPayment = data => {
	alert("Payment or upload Error", data);
};

const stripePost = (token, amount, description) =>
	axios.post(PAYMENT_SERVER_URL, {
		description,
		source: token.id,
		currency: CURRENCY,
		amount: fromEuroToCent(amount)
	});

export const postUpload = (args, pdf) => {
	var fd = new FormData();
	fd.append("file", pdf);
	console.log("pdf to srv", pdf, fd);
	axios({
		method: "post",
		url: UPLOAD_SERVER_URL.toString(),
		data: pdf,
		headers: { "content-type": "application/pdf" }
	}).then(
		res => {
			console.log("res", res);
		},
		err => {
			console.log("err", err);
		}
	);
};

const onToken = (amount, description, args, pdf) => token => {
	Promise.all([stripePost(token, amount, description), postUpload(args, pdf)])
		.then(successPayment)
		.catch(errorPayment);
};

const Checkout = ({ name, description, amount, args, pdf }) => (
	<StripeCheckout
		name={name}
		description={description}
		amount={fromEuroToCent(amount)}
		token={onToken(amount, description, args, pdf)}
		currency={CURRENCY}
		stripeKey={STRIPE_PUBLISHABLE}
	/>
);

export default Checkout;
