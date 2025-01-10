import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  password: string;
  bio: string | null;
  role: string | null;
  createdAt: string;
  updatedAt: string;
  resumeUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  skills: any[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const username = searchParams.get("username");

  try {
    if (!id && !email && !username) {
      return NextResponse.json(
        { message: "Please provide an id, email, or username." },
        { status: 400 },
      );
    }

    const conditions = [];
    if (id) conditions.push({ id: id as string });
    if (email) conditions.push({ email: email as string });
    if (username) conditions.push({ username: username as string });

    const user = await prisma.user.findFirst({
      where: {
        OR: conditions,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { user } = await request.json();
    console.log(user);
    // Check if the id is provided
    if (!user.id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }
    // Remove undefined values
    Object.keys(user).forEach((key) => {
      if (user[key] === undefined) {
        delete user[key];
      }
    });
    // If no other details are provided, return an error
    if (Object.keys(user).length === 0) {
      return NextResponse.json(
        { error: "No user details provided for update" },
        { status: 400 },
      );
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
        skills: {
          set: user.skills || [],
        },
      },
    });

    // Return the updated user details
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
