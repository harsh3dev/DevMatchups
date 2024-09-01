import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    
    const idparam = await req.json();
    console.log("idparam ",idparam);
    const  id = idparam.id;
    console.log("id ",id);

   

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
