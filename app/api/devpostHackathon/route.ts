import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const devpostURL = 'https://devpost.com/api/hackathons?order_by=recently-added&per_page=20'
  try {
    const response = await axios.get(devpostURL);

    if (!response.data) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    return NextResponse.json({ hackathon: response.data }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
