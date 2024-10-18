import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  region: 'ap-south-1',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export async function POST(req: Request) {
  const form = await req.formData();
  const resume = form.get('resume') as File | null;
  const linkedinUrl = form.get('linkedinUrl') as string | null;
  const githubUrl = form.get('githubUrl') as string | null;
  const resumeUrl = form.get('resumeUrl') as string | null;
  const candidateId = form.get('candidateId') as string;
  const postId = form.get('postId') as string;

  console.log(resume?.type)

  let uploadResult: aws.S3.ManagedUpload.SendData | null = null;

  try {

    const existingApplication = await prisma.application.findUnique({
      where: {
        candidateId_postId: {
          candidateId,
          postId,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json({ error: 'You have already applied for this position.' }, { status: 400 });
    }

    if (resume) {
      console.log("resume type",resume.type);
      const arrayBuffer = await resume.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer); 
      const uploadParams = {
        Bucket: process.env.BUCKET_NAME as string,
        Key: `resumes/${Date.now()}-${resume.name}`,
        Body: buffer,
        ContentType: resume.type,
      };

      uploadResult = await s3.upload(uploadParams).promise();
    }

    await prisma.user.update({
      where: { id: candidateId },
      data: {
        linkedinUrl: linkedinUrl || '',
        githubUrl: githubUrl || '',
        resumeUrl: (uploadResult ? uploadResult.Location : resumeUrl),
      },
    });

    const application = await prisma.application.create({
      data: {
        candidateId,
        postId,
        linkedinUrl: linkedinUrl || null,
        githubUrl: githubUrl || null,
        resumeUrl: uploadResult ? uploadResult.Location : resumeUrl || null,
      },
    });

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
