import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const unstopURL = 'https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&oppstatus=recent';

  try {
    const response = await axios.get(unstopURL);

    if (!response.data) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    return NextResponse.json({ hackathon: response.data }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
