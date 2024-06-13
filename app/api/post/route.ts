import { NextResponse } from 'next/server';
import { hackathonSchema } from './Types';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validationResult = hackathonSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json({ errors: errorMessages }, { status: 400 });
    }

    const {
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
      Employerid,
    } = validationResult.data;
    

    const hackathon = await prisma.hackathon.create({
      data: {
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
        Employerid,
      },
    });

    return NextResponse.json({ Hackathon: hackathon }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
