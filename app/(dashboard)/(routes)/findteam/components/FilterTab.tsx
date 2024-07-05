"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CreatableSelect from 'react-select/creatable';
import ValueType from 'react-select';

import { SearchFilter } from "./SearchFilter"
import { Label } from "@/components/ui/label"

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { setSearch, setMode, setExperience, setSkills, resetFilters } from '@/lib/store/features/filterSlice/filterSlice';
import { useState } from "react";


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
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Python', label: 'Python' },
    { value: 'React JS', label: 'React JS' },
    { value: 'Next JS', label: 'Next JS' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'SQL', label: 'SQL' }
] as const;
interface OptionType {
    readonly label: string;
    readonly value: string;
}

export function FilterTab() {

    const [value, setValue] = useState<readonly OptionType[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { search, mode, experience, skills } = useSelector((state: RootState) => state.filter);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    };

    const handleModeChange = (value:string) => {
        
        if (value.length) {
        dispatch(setMode(value));
        }
    };

    const handleExperienceChange = (value:string) => {
        
        if (value.length) {
            dispatch(setExperience(value));
        }
    };

    const handleSkillsChange = (value:string) => {
        if (value.length) {
            dispatch(setSkills(value));
        }
    };

    const handleReset = () => {
    dispatch(resetFilters());
    };

    return (
        <div className="h-[70vh] p-5">
            <div className='max-w-4xl w-full mx-auto'>
                <SearchFilter />
            </div>
            <div className="flex flex-col items-center justify-evenly gap-5 w-full mt-5 ">
                <div className="flex max-w-full justify-between items-start gap-2">
                {modeOptions.map((item, index) => (
                    <div key={index} className="flex items-center gap-1 justify-between px-4 py-2 rounded-full border border-gray-500  " >
                        <Checkbox
                            id={item.label}
                            onChange={(checked)=>handleModeChange(item.value)}
                            className=" w-4 h-4 rounded-full "
                        />
                        <Label htmlFor={item.label} className="text-sm font-normal">{item.label}</Label>
                    </div>
                ))}
                </div>
                <div className="flex max-w-full px-8 justify-around gap-2 flex-wrap ">
                {expOptions.map((item, index) => (
                    <div key={index} className="flex items-center gap-1 justify-between px-4 py-2 rounded-full border border-gray-500 " >
                        <Checkbox
                            id={item.label}
                            value={item.value}
                            onChange={(checked)=>handleExperienceChange(item.value)}
                            className=" w-4 h-4 rounded-full "
                        />
                        <Label htmlFor={item.label} className="text-sm font-normal">
                            {item.label}
                        </Label>
                    </div>
                ))}
                </div>
                <div className="flex w-full border border-dashed border-accent rounded-xl py-4 justify-evenly items-start gap-2 flex-wrap ">
                {skillOptions.map((item, index) => (
                    <div key={index} className="flex items-center gap-1 justify-between px-4 py-2 rounded-full border border-gray-500 " >
                        <Checkbox
                            id={item.label}
                            value={item.value}
                            onChange={(checked)=>handleSkillsChange(item.value)}
                            className=" w-4 h-4 rounded-full "
                        />
                        <Label htmlFor={item.label} className="text-sm font-normal">
                            {item.label}
                        </Label>
                    </div>
                ))}
                </div>
                <Button onClick={handleReset} className="w-full rounded-lg border border-text bg-transparent dark:bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-text dark:text-text " >Reset Filters</Button>
            </div>
        </div>
    )
}
