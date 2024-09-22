import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Briefcase, BookmarkPlus, Bookmark } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Capsule from '../components/Capsule'

// Mock data for the job poster
const jobPoster = {
  name: "John Doe",
  email: "john.doe@example.com",
  linkedin: "https://www.linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  photo: "/placeholder.svg?height=100&width=100"
}

export default function OldJobDetails() {
  const [isSaved, setIsSaved] = useState(false)
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [resume, setResume] = useState<File | null>(null)

  const post = {
    "teamName": "Hackermen",
    "hackathonName": "hack4bengal",
    "regURL": "https://hack4bengal-2.devfolio.co/",
    "hackathonMode": "Online",
    "memberCount": "4",
    "skills": [
        "Python",
        "React JS"
    ],
    "role": "frontend",
    "experience": "Intermediate (1-2 years)",
    "regDate": "2024-08-05T13:47:00.923Z",
    "location": "Kolkata",
    "description": "WORK INDEPENDENTLY",
    "userId": "clzf8okwu000050uzaeniexjc",
  }

  const handleApply = () => {
    setIsApplyDialogOpen(true)
  }

  const handleApplySubmit = () => {
    if (linkedinUrl && githubUrl && resume) {
      // Here you would typically send the application data to your backend
      console.log("Applying with LinkedIn:", linkedinUrl, "GitHub:", githubUrl, "and Resume:", resume.name)
      window.open(post.regURL, '_blank')
      setIsApplyDialogOpen(false)
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    // Implement save job logic here
    console.log(isSaved ? "Job removed from wishlist" : "Job saved to wishlist")
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{post.teamName} - {post.role} Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Registration Date: {"5/8/2024"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{post.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>Team Size: {post.memberCount}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <span>{post.experience}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Required Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.skills.map((skill, index) => (
                      <Capsule key={index} item={skill} />
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold">Description:</h3>
                  <p>{post.description}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button onClick={handleApply}>Apply Now</Button>
                <Button 
                  variant={isSaved ? "secondary" : "outline"} 
                  onClick={handleSave}
                  className="transition-all duration-300 ease-in-out"
                >
                  {isSaved ? (
                    <Bookmark className="mr-2 h-4 w-4 fill-current" />
                  ) : (
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                  )}
                  {isSaved ? "Saved" : "Save Job"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={jobPoster.photo} alt={jobPoster.name} />
                  <AvatarFallback>{jobPoster.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{jobPoster.name}</h3>
                  <p className="text-muted-foreground">{jobPoster.email}</p>
                  <div className="mt-4 space-y-2">
                    <Link href={jobPoster.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full">LinkedIn</Button>
                    </Link>
                    <Link href={jobPoster.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full">GitHub</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {post.teamName} - {post.role} Position</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkedin" className="text-right">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="github" className="text-right">
                GitHub URL
              </Label>
              <Input
                id="github"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                type="file"
                onChange={handleResumeChange}
                className="col-span-3"
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleApplySubmit} disabled={!linkedinUrl || !githubUrl || !resume}>
              Continue Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}