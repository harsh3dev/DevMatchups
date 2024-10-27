
export interface User {
    id?: string;
    name?: string | null;
    username?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    applications?: Application[];
    hackathons?: Hackathon[];
    accounts?: Account[];
    createdAt?: Date;
    updatedAt?: Date;
  }



export interface Hackathon {
  id: number;
  teamName: string;
  hackathonName: string;
  regURL: string;
  hackathonMode: string;
  memberCount: string;
  skills: string[];
  role: string;
  experience: string;
  regDate: Date;
  location: string;
  description: string;
  Employer: User;
  Employerid: string;
  createdAt: Date;
  updatedAt: Date;
  applications: Application[];
}



export interface Application {
  id: number;
  candidate: User;
  candidateId: string;
  post: Hackathon;
  postId: number;
  skills: string;
  coverLetter: string;
  status: ApplicationStatus;
  createdAt: Date;
}


export enum ApplicationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED"
  }
  


  export interface Account {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
  }