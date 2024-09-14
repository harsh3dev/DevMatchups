import { FieldError, UseFormRegister, ControllerRenderProps, Control, UseControllerProps } from "react-hook-form";
import { z, ZodType } from "zod";

type skillType = { value: string; label: string; }[];
export const UserSchema: ZodType<FormData> = z
.object({
    teamName: z.string().min(1, { message: "Team name is required" }),
    hackathonName: z.string().min(1, { message: "Hackathon name is required" }),
    regURL: z.string().url({ message: "Please enter a valid URL" }),
    hackathonMode: z.string().min(1, { message: "Hackathon mode is required" }),
    memberCount: z.string().min(1, { message: "Member count must be at least 1" }),
    skills: z.array(z.string().min(1, { message: "Enter atleast 1 skill" })),
    role: z.string().min(1, { message: "Role is required" }),
    experience: z.string().min(1, { message: "Experience is required" }),
    regDate: z.date({
      required_error: "Date is required.",
      invalid_type_error: "Wrong date format.",
    }),
    location: z.string().min(1, { message: "Location is required" }),
    description: z.string().optional(),
});


export interface HackathonEntry {
  id: number;
  teamName: string;
  hackathonName: string;
  regURL: string;
  hackathonMode: string;
  memberCount: string;
  skills: string[] ;
  role: string;
  experience: string;
  regDate: string;
  location: string;
  description?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}


export type FormData = {
  teamName: string;
  hackathonName: string;
  regURL: string;
  hackathonMode: string;
  memberCount: string;
  skills: string[];
  role: string;
  experience: string;
  regDate: Date | null;
  location: string;
  description?: string;
  userId?: string
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
  options?: readonly unknown[],
  isMulti?: boolean,
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
  | "regDate"
  | "location"
  | "description";
