import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { RiExternalLinkFill } from "react-icons/ri";

const mockData = [
    {
        teamName: "Tech Titans",
        hackathonName: "CodeFest 2024",
        status: "submitted",
        url: "https://codefest2024.com/techtitans"
    },
    {
        teamName: "Innovators",
        hackathonName: "Hackathon 3.0",
        status: "rejected",
        url: "https://hackathon3.com/innovators"
    },
    {
        teamName: "AI Avengers",
        hackathonName: "AI Challenge 2024",
        status: "accepted",
        url: "https://aichallenge2024.com/aiavengers"
    },
    {
        teamName: "Dev Wizards",
        hackathonName: "DevCon Hackathon",
        status: "submitted",
        url: "https://devconhackathon.com/devwizards"
    },
    {
        teamName: "Code Masters",
        hackathonName: "CodeSprint 2024",
        status: "submitted",
        url: "https://codesprint2024.com/codemasters"
    }
];


export function TableDemo() {
    return (
        <Table className="border border-gray-500 dark:border-gray-800 lg:text-base ">
            <TableCaption>List of all the teams you{"'"}ve applied to!</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">S. No.</TableHead>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Hackathon</TableHead>
                    <TableHead>Visit Post</TableHead>
                    <TableHead className="text-right">Application Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockData.map((data, index) => {
                    const statusColor = data.status === "accepted" ? "text-green-700" : data.status === "rejected" ? "text-red-500" : "text-gray-700 dark:text-gray-400";
                    const status = data.status.substring(0, 1).toUpperCase() + data.status.substring(1);
                    return (
                    <TableRow key={`data-${index}`} className="group">
                        <TableCell className="font-medium">{index+1}</TableCell>
                        <TableCell>{data.teamName}</TableCell>
                        <TableCell>{data.hackathonName}</TableCell>
                        <TableCell >
                            <Link href={data.url} target="_blank" className=" group-hover:text-primary transition-colors ease-linear flex justify-start items-center gap-2" >
                            Visit <span className="  transition-color ease-linear  "> <RiExternalLinkFill /> </span></Link>
                        </TableCell>
                        <TableCell className={` text-right ${statusColor} `} > <span className=" dark:bg-gray-700/20 bg-gray-300/40 rounded-full px-2 py-1 text-xs shadow-sm "> {status} </span></TableCell>
                    </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
