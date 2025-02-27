import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const unstopURL = 'https://unstop.com/api/public/opportunity/search-result';

  const params = {
    opportunity: 'hackathons',
    oppstatus: 'recent',
  }

  try {
    const responses = await Promise.all([
      axios.get(unstopURL, { 
        params:{
          ...params,
          page : 1
        }
      }),
      axios.get(unstopURL,{
        params:{
          ...params,
          page : 2
        }
      }),
    ])

    const hackathons = responses.flatMap(response => response.data.data.data || []);

    if (!hackathons.length) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    return NextResponse.json({ hackathon: hackathons }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
