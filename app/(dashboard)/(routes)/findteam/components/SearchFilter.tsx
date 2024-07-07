"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { setSearch } from "@/lib/store/features/filterSlice/filterSlice";
import { useDispatch, UseDispatch } from "react-redux";
export function SearchFilter() {
    
    const dispatch = useDispatch();

    const placeholders = [
        "Backend Developer/Devops Engineer...",
        "Django, Backend Dev - Delhi...",
        "Online/Offline...",
        "Malviya Nagar, Jaipur...",
        "React Native - Pune...",
        "Next JS - Frontend...",
        "Saki Vihar Road, Mumbai...",
        "Unstop/Devfolio...",
        "Online - Web 3...",
        "Rust, Python, Open AI, Javascript...",
        "Full-stack Developer - Bangalore...",
        "Node.js, Express - Remote...",
        "Hybrid, React Native - Chennai...",
        "Java Developer - Kolkata...",
        "Frontend Engineer - Mumbai...",
        "Python, Django - Remote...",
        "Blockchain Developer - Delhi...",
        "UI/UX Designer - Pune...",
        "Data Scientist - Hyderabad...",
        "React, TypeScript - Bengaluru...",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        dispatch(setSearch(e.target.value));
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (<div className="w-full mx-auto">
        <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
        />
    </div>
    );
}

