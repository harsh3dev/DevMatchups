
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"


import { useDispatch } from "react-redux"
import { resetFilters, updateFilters } from "@/lib/store/features/filterSlice/filterSlice"

import { SearchFilter } from "./SearchFilter"
import DrawerFilter from "./DrawerFilter"
import FiltersComponent from "./FiltersComponent"


const modeOptions = [
    {
        id: "online",
        value: "Online",
        label: "Online",
    },
    {
        id: "offline",
        value: "Offline",
        label: "Offline",
    },
    {
        id: "hybrid",
        value: "Hybrid",
        label: "Hybrid",
    },
] as const
const expOptions = [
    {
        id: "beginner",
        value: "Beginner",
        label: "Beginner",
    },
    {
        id: "intermediate",
        value: "Intermediate",
        label: "Intermediate",
    },
    {
        id: "expert",
        value: "Expert",
        label: "Expert",
    },
] as const;

const skillOptions = [
    { id: 'javascript', value: 'Javascript', label: 'Javascript' },
    { id: 'python', value: 'Python', label: 'Python' },
    { id: 'reactjs', value: 'React JS', label: 'React JS' },
    { id: 'nextjs', value: 'Next JS', label: 'Next JS' },
    { id: 'mongoDB', value: 'MongoDB', label: 'MongoDB' },
    { id: 'sql', value: 'SQL', label: 'SQL' }
] as const;

const FormSchema = z.object({
    expOptions: z.array(z.string()),
    modeOptions: z.array(z.string()),
    skillOptions: z.array(z.string()),
})

export function FilterTab() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            expOptions: [],
            modeOptions: [],
            skillOptions: []
        },
    })


    const dispatch = useDispatch();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        toast({
            title: "Search filters applied successfully!"
        })
        dispatch(updateFilters(data));
    }

    const handleReset = (e:React.FormEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        form.reset();
        dispatch(resetFilters());
    }

    return (
        <Form {...form} >
            <div className="lg:min-h-[70vh] p-5 flex flex-row lg:flex-col gap-2 justify-between items-center lg:justify-start ">
                <div className='max-w-4xl px-4 md:p-0 w-full mx-auto'>
                    <SearchFilter />
                </div>
                <div className="lg:hidden">
                    <DrawerFilter form={form} modeOptions={modeOptions} expOptions={expOptions} skillOptions={skillOptions} handleReset={handleReset} onSubmit={onSubmit}  />
                </div>
                <div className="lg:inline-block hidden w-full  rounded-lg ">
                    <FiltersComponent form={form} modeOptions={modeOptions} expOptions={expOptions} skillOptions={skillOptions} handleReset={handleReset} onSubmit={onSubmit} />
                </div>
            </div>
            
        </Form>
    )
}