import { mailSender } from "./mailSender";

export async function sendVerificationEmail(email:string, token:string) {

	const confirmLink = `https://dev-matchups.vercel.app/new-verification?token=${token}`;

	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			`<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
		);
		console.log("Email sent successfully: ", mailResponse?.response);
	} 
	catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}


export async function sendPasswordResetEmail(email:string, token:string) {

	const confirmLink = `http://localhost:3000/new-password?token==${token}`;

	try {
		const mailResponse = await mailSender(
			email,
			"Reset your password",
			`<p>Click <a href="${confirmLink}">here</a> to to reset your password.</p>`,
		);
		console.log("Email sent successfully: ", mailResponse?.response);
	} 
	catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
