import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";
import otpGenerator from 'otp-generator'; // Ensure you have this package installed
import { sendVerificationEmail } from "@/lib/SendMail";

const userSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Email type is invalid" })
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming request body:", body);

    const { email } = userSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    });

    let existingOtp = await prisma.otp.findUnique({
      where: {
        otp_email: {
          otp,
          email
        }
      }
    });

    // Ensure unique OTP
    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
      });

      existingOtp = await prisma.otp.findUnique({
        where: {
          otp_email: {
            otp,
            email
          }
        }
      });
    }

    // Save the OTP to the database
    await prisma.otp.create({
      data: {
        otp,
        email
      }
    });

    // Send the OTP via email
    await sendVerificationEmail(email, otp);

    return NextResponse.json({ message: "OTP created and sent successfully" }, { status: 201 });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ user: null, message: "Internal Server Error" }, { status: 500 });
  }
}
