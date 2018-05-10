const EMAIL_SERVER_URL =
	process.env.NODE_ENV === "production"
		? "http://myapidomain.com"
		: "http://localhost:8080/mail";

export default EMAIL_SERVER_URL;
