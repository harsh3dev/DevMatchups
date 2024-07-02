import { NextResponse } from 'next/server';

import { prisma } from '../../../lib/prisma';

export async function GET(req: Request) {
  try {
    console.log("incoming")
    const hackathon=await prisma.hackathon.findMany();
    console.log(hackathon);
    return NextResponse.json({ Hackathon: hackathon }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
