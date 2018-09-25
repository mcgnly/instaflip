const UPLOAD_SERVER_URL =
	process.env.NODE_ENV === "production"
		? "http://myapidomain.com"
		: "http://localhost:8080/s3";

export default UPLOAD_SERVER_URL;
