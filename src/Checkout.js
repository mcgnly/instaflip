import React from "react";
import axios from "axios";
import fs from "fs";
import StripeCheckout from "react-stripe-checkout";

import STRIPE_PUBLISHABLE from "./constants/stripe";
import PAYMENT_SERVER_URL from "./constants/server";
import UPLOAD_SERVER_URL from "./constants/upload";

const CURRENCY = "EUR";

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
	// redirect to a success page
	alert("Payment and upload Successful");
};

const errorPayment = data => {
	alert("Payment or upload Error", data);
};

const stripePost = (token, amount, description) =>
{
	console.log('token, amount, description', token, amount, description);
	return (axios.post(PAYMENT_SERVER_URL, {
		description,
		source: token.id,
		currency: CURRENCY,
		amount: fromEuroToCent(amount),
		metadata:{order_id:token.created}
	})
	);
}

export const postUpload = (args, pdf) => {
	
	var fd = new FormData();
	fd.append("pdf", pdf);
	fd.append("order_id", args.order_id);
	fd.append("description", args.description);
	console.log("what does my form data look like?", fd);
	axios({
		method: "post",
		url: UPLOAD_SERVER_URL.toString(),
		data: fd,
		headers: { "content-type": "multipart/form-data" }
	}).then(
		res => {
			console.log("res", res);
		},
		err => {
			console.log("err", err);
		}
	);
};

const onToken = (amount, description, pdf) => token => {
	const args ={
		description, 
		order_id: token.created,
	};
	// console.log('args', args, 'token', token)

	Promise.all([stripePost(token, amount, description), postUpload(args, pdf)])
		.then(successPayment)
		.catch(errorPayment);
};

const Checkout = ({ name, description, amount, pdf }) => (
	<StripeCheckout
		name={name}
		description={description}
		amount={fromEuroToCent(amount)}
		token={onToken(amount, description, pdf)}
		currency={CURRENCY}
		stripeKey={STRIPE_PUBLISHABLE}
		shippingAddress
		billingAddress
	/>
);

export default Checkout;
