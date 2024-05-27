import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

// TEAM DETAILS: teamName,
// HACKATHON DETAILS: hackathonName, registrationLink. hackathonMode
// memberCount, skills[], role, experience, education
// leadName, leadEmail, leadLinkedin, leadGithub, number
// regDate, location
// description

export const UserSchema: ZodType<FormData> = z
.object({
    teamName: z.string().min(1, { message: "Team name is required" }),
    hackathonName: z.string().min(1, { message: "Hackathon name is required" }),
    regURL: z.string(),
    hackathonMode: z.string().min(1, { message: "Hackathon mode is required" }),
    memberCount: z.string().min(1, { message: "Member count must be at least 1" }),
    skills: z.string().min(1, { message: "Enter at least 1 skill" }),
    role: z.string().min(1, { message: "Role is required" }),
    experience: z.string().min(1, { message: "Experience is required" }),
    leadName: z.string().min(1, { message: "Lead name is required" }),
    leadEmail: z.string().email({ message: "Invalid lead email" }),
    leadLinkedin: z.string().url({ message: "Invalid LinkedIn URL" }).includes("linkedin.com", { message: "Invalid LinkedIn URL" }),
    leadGithub: z.string()
      .url({ message: "Invalid GitHub URL" })
      .includes("github.com", { message: "Invalid GitHub URL" }),
    leadNumber: z.string().optional(),
    regDate: z.string().min(1, { message: "Please enter last date to register" }),
    location: z.string().min(1, { message: "Location is required" }),
    description: z.string().optional(),
});


export type FormData = {
  teamName: string;
  hackathonName: string;
  regURL: string;
  hackathonMode: string;
  memberCount: string;
  skills: string;
  role: string;
  experience: string;
  leadName: string;
  leadEmail: string;
  leadLinkedin: string;
  leadGithub: string;
  leadNumber?: string;
  regDate: string;
  location: string;
  description?: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  label: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  helper?: boolean;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "teamName"
  | "hackathonName"
  | "regURL"
  | "hackathonMode"
  | "memberCount"
  | "skills"
  | "role"
  | "experience"
  | "leadName"
  | "leadEmail"
  | "leadLinkedin"
  | "leadGithub"
  | "leadNumber"
  | "regDate"
  | "location"
  | "description";
// 1. Team Name
// 2. Hackathon details - Hackathon name, registration link, place/mode of hackathon
// 3. skills required
// 4. Team Lead details: Team Lead name, Email address, LinkedIn id, GitHub id,
// 5. Deadline for registration
// 6. Project idea and summary
// 7. Location preferences
// 8. Preferred educational qualification or experience level
