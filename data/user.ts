import { prisma } from "@/lib/prisma";
import { User } from "@/lib/types/User";



export async function GetUserByEmail(email: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      // throw new Error("An error occurred while fetching user by email");
    }
}


export async function GetUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        return { error: "User not found" };
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching user by ID");
    }
  }