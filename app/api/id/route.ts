import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    
    const idparam = await req.json();
    console.log("idparam ",idparam);
    const  id     = parseInt(idparam.id);
    console.log("id ",id);

   
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID must be a number' }, { status: 400 });
    }

    console.log("incoming", id);

    const hackathon = await prisma.hackathon.findUnique({
      where: {
        id: id,
      },
    });

    if (!hackathon) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    return NextResponse.json({ hackathon: hackathon }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
