import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const devfolioURL = 'https://api.devfolio.co/api/search/hackathons'
  try {
    const response = await axios.post(devfolioURL, {
        "type": "application_open",
        size: 20,
    });

    if (!response.data) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    return NextResponse.json({ hackathon: response.data }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
