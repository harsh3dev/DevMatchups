import { prisma } from "@/lib/prisma";


export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch(e) {
    console.log(e, "path: data/verification-token.ts");
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch(e) {
    console.log(e, "path: data/verification-token.ts");
    return null;
  }
};