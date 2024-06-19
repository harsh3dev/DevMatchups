import { mailSender } from "./mailSender";

export async function sendVerificationEmail(email:string, otp:string) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			 otp
		);
		console.log("Email sent successfully: ", mailResponse?.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
