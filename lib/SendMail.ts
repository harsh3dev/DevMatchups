import { mailSender } from "./mailSender";

const url = process.env.NODE_ENV === "production" ? "https://devmatchups.vercel.app" : "http://localhost:3000";

export async function sendVerificationEmail(email:string, token:string) {

	const confirmLink = `${url}/new-verification?token=${token}&email=${email}`;

	try {
		const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Email Verification</title>
			<style>
				body {
					font-family: Arial, sans-serif;
					line-height: 1.6;
					margin: 0;
					padding: 0;
					background-color: #f3f4f6;
				}
				.container {
					max-width: 600px;
					margin: 0 auto;
					padding: 20px;
				}
				.email-body {
					background-color: #ffffff;
					border-radius: 8px;
					overflow: hidden;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
				}
				.header {
					background-color: #2563eb;
					color: #ffffff;
					padding: 20px;
					text-align: center;
				}
				.header h1 {
					margin: 0;
					font-size: 24px;
					font-weight: bold;
				}
				.content {
					padding: 20px;
				}
				.content p {
					color: #4b5563;
					margin-bottom: 16px;
				}
				.button {
					display: block;
					width: 200px;
					margin: 0 auto;
					padding: 12px 24px;
					background-color: #2563eb;
					color: #ffffff;
					text-align: center;
					text-decoration: none;
					border-radius: 6px;
					font-weight: bold;
					transition: background-color 0.3s ease;
				}
				.button:hover {
					background-color: #1d4ed8;
				}
				.link {
					color: #2563eb;
					word-break: break-all;
				}
				.footer {
					background-color: #f3f4f6;
					padding: 20px;
					text-align: center;
					font-size: 14px;
					color: #6b7280;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<div class="email-body">
					<div class="header">
						<h1>Email Verification</h1>
					</div>
					<div class="content">
						<p>Hello,</p>
						<p>
							Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:
						</p>
						<a href="${confirmLink}" class="button">Verify Email</a>
						<p>
							If you didn't create an account, you can safely ignore this email.
						</p>
						<p>
							If you're having trouble clicking the button, copy and paste the following link into your browser:
						</p>
						<p class="link">${confirmLink}</p>
					</div>
					<div class="footer">
						<p>&copy; 2024 DevMatchups. All rights reserved.</p>
					</div>
				</div>
			</div>
		</body>
		</html>`
    );
		console.log("Email sent successfully: ", mailResponse?.response);
	} 
	catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}


export async function sendPasswordResetEmail(email:string, token:string) {

	const confirmLink = `${url}/new-password?token==${token}`;

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
