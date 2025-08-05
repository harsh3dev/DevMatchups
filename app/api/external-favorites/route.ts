import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { 
      externalId, 
      title, 
      url, 
      logo, 
      platform, 
      mode, 
      location, 
      status 
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!externalId || !platform) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if already favorited
    const existingFavorite = await prisma.externalHackathonFavorite.findUnique({
      where: {
        userId_externalId_platform: {
          userId,
          externalId,
          platform,
        },
      },
    });

    if (existingFavorite) {
      // If already favorited, unfavorite it
      await prisma.externalHackathonFavorite.delete({
        where: {
          userId_externalId_platform: {
            userId,
            externalId,
            platform,
          },
        },
      });
      return NextResponse.json({ favorited: false });
    }

    // If not favorited, create a new favorite
    // Only create if we have the required fields for creation
    if (!title || !url) {
      return new NextResponse("Missing required fields for creation", { status: 400 });
    }
    
    await prisma.externalHackathonFavorite.create({
      data: {
        userId,
        externalId,
        title,
        url,
        logo,
        platform,
        mode,
        location,
        status,
      },
    });

    return NextResponse.json({ favorited: true });
  } catch (error) {
    console.error("[EXTERNAL_FAVORITES_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { searchParams } = new URL(req.url);
    const externalId = searchParams.get("externalId");
    const platform = searchParams.get("platform");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (externalId && platform) {
      // Check if specific external hackathon is favorited
      const favorite = await prisma.externalHackathonFavorite.findUnique({
        where: {
          userId_externalId_platform: {
            userId,
            externalId,
            platform,
          },
        },
      });
      return NextResponse.json({ favorited: !!favorite });
    }

    // Get all favorited external hackathons
    const favorites = await prisma.externalHackathonFavorite.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("[EXTERNAL_FAVORITES_GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}