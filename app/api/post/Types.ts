import { z } from 'zod';

// Define the Zod schema for the Hackathon model
export const hackathonSchema = z.object({
  id: z.number().int().positive().optional(), 
  teamName: z.string().min(1,{message:"team name is required"}),
  hackathonName: z.string().min(1, { message: "Hackathon name is required" }),
  regURL: z.string().url({ message: "Registration URL must be a valid URL" }),
  hackathonMode: z.string().min(1, { message: "Hackathon mode is required" }),
  memberCount: z.string().min(1, { message: "Member count is required" }),
  skills: z.array(z.string()).min(1, { message: "Skills are required" }),
  role: z.string().min(1, { message: "Role is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  regDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Registration date must be a valid date"
  }),
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  userId: z.string().min(1,{ message: "Employer ID must be a positive integer" }),
  createdAt: z.date().optional(), 
  updatedAt: z.date().optional()  
});

