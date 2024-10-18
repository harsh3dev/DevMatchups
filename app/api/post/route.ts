import { hackathonSchema } from './Types';
import { prisma } from '../../../lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await auth();
    console.log("incoming",body,session);
    // const validationResult = hackathonSchema.safeParse(body);
    if(!session?.user.id){
       return NextResponse.json({ error: "Please login to post a hackathon" }, { status: 400 });
    }
    // if (!validationResult.success) {
    //   const errorMessages = validationResult.error.errors.map(err => ({
    //     field: err.path.join('.'),
    //     message: err.message,
    //   }));
    //   return NextResponse.json({ errors: errorMessages }, { status: 400 });
    // }

    const {
      teamName,
      hackathonName,
      regURL,
      hackathonMode,
      memberCount,
      skills,
      role,
      experience,
      regDate,
      location,
      description,
      userId,
    } = body;

    const hackathon = await prisma.hackathon.create({
      data: {
        teamName,
        hackathonName,
        regURL,
        hackathonMode,
        memberCount,
        skills,
        role,
        experience,
        regDate: new Date(regDate),
        location,
        description,
        userId:session?.user?.id
      },
    });

    return NextResponse.json({ Hackathon: hackathon }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
