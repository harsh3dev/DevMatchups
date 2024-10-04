import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const email = searchParams.get('email');
  const username = searchParams.get('username');

  try {
    if (!id && !email && !username) {
      return NextResponse.json({ message: 'Please provide an id, email, or username.' }, { status: 400 });
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
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
