"use client"
// Global styles and static assets and constants import
import '@/app/globals.css'
import { FormData, UserSchema, ValidFieldNames } from "./types";
import  {hackathonModes, options, ExperienceOptions} from "./constants";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

// FormField and UI component
import { FormField } from './FormField';
import { Label } from "@/components/ui/label"
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import axios from "axios";
import { getSession } from 'next-auth/react';
import { FormButton } from '@/components/ui/FormButton';
import ErrorMessage from './ErrorMessage';
import MultiSelect from './MultiSelect';
import { toast } from 'react-toastify';

export default function Form (){
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
        control,
    } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            regDate: new Date(Date.now()),
            skills: [],
            experience: "",
        },
    });

    const FormPageData = {
        "HackathonDetails" : [
            {
                type: "text",
                placeholder: "Enter team's name",
                label: "Team Name *",
                name: "teamName" as ValidFieldNames,
                error: errors.teamName,
            },
            {
                type: "text",
                placeholder: "Enter the name of the Hackathon",
                label: "Hackathon's Name *",
                name: "hackathonName" as ValidFieldNames,
                error: errors.hackathonName,
            },
            {
                type: "text",
                placeholder: "Enter Registration Link",
                label: "Registration Link *",
                name: "regURL" as ValidFieldNames,
                error: errors.regURL,
            },
        ],

        "TeamMemberDetailsData" : [
            {
                type: "number",
                placeholder: "Enter a number between 1 and 5",
                label: "How many team members are you looking for? *",
                name: 'memberCount' as ValidFieldNames,
                error: errors.memberCount,
            },
            {
                type: "text",
                placeholder: "Backend, Frontend, Devops etc...",
                label: "What role the member will serve in the team? *",
                name: 'role' as ValidFieldNames,
                error: errors.role,
            },
            
        ],
        
    }
  

    const onSubmit = async (data: FormData) => {
        console.log("Submitting data:", data);
        const session = await getSession();
        // console.log("client session",session);
        try {
            data.userId = session?.user.id;
            const response = await axios.post('/api/post', data);
            console.log('SUCCESS', response.data);
            console.log('SUCCESS', data); 
            toast.success("Your team details have been submitted successfully!");                     
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
            }
            toast.error('Oops! Something went wrong. Please try again');
        }
        reset();
    };

    return (
        <form className="w-full md:w-[60%] min-h-screen my-10 px-4 z-[1] " onSubmit={handleSubmit(onSubmit)}>
            {/* HEADER TEXT */}
            <div className="w-full font-extrabold text-2xl my-4 " >
                <h1 className=" w-full text-lg md:text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent dark:bg-gradient-to-t dark:from-sky-200 dark:to-cyan-400 ">
                    Team Up Now: Register and Find Teammates Today!
                </h1>
            </div>

            <div className="md:min-w-[50rem] w-full flex flex-col items-start justify-normal  bg-background shadow-md  text-left ">
                <HackathonDetails Data={FormPageData.HackathonDetails} register={register} errors={errors} control={control} />
                <h1 className="  text-2xl w-full h-14 font-bold dark:bg-accent bg-accent text-white flex flex-col justify-center rounded-lg pl-5 rounded-b-none  ">
                    Team member requirements
                </h1>
                <div className="flex flex-col gap-4 w-full h-full border border-t-0 rounded-t-none  border-gray-300 px-10 py-5 rounded-lg ">
                    <div className=' w-full flex md:flex-row flex-col justify-between items-center gap-4 mb-4 '>
                        {
                            FormPageData.TeamMemberDetailsData.map((detail) => (
                                <FormField
                                    key={detail.name}
                                    type={detail.type}
                                    placeholder={detail.placeholder}
                                    label={detail.label}
                                    name={detail.name}
                                    register={register}
                                    error={detail.error}
                                />
                            ))
                        }
                    </div>
                    
                    <MultiSelect
                        control={control}
                        options={options}
                        errors={errors.skills}
                        name='skills'
                        placeholder='Javascript, Python, C# etc...'
                        label='What are the required skills? *'
                        isMulti={true}
                    />

                    <MultiSelect
                        control={control}
                        options={ExperienceOptions}
                        errors={errors.experience}
                        name='experience'
                        placeholder='Enter minimum experience level'
                        label='Experience level *'
                        isMulti={false}
                    />

                    <h1 className="text-2xl font-bold mb-4 ">
                        Additional Details
                    </h1>
                    <FormField
                        type="textarea"
                        placeholder="Mention any additional details you feel is important..."
                        label="Enter any additional details"
                        name="description"
                        register={register}
                        error={errors.description}
                    />
                </div>

                {isSubmitting ?
                    <FormButton label="Submit" isLoader={true} />
                    :
                    <FormButton label="Submit"  />
                }
            </div>
        </form>
    );
}



const HackathonDetails = ({Data, register, errors, control }: {Data:any, register:any, errors:any, control:any}) => {
    // const HackathonDetailsData = [
    //     {
    //         type: "text",
    //         placeholder: "Enter team's name",
    //         label: "Team Name *",
    //         name: "teamName",
    //         error: errors.teamName,
    //     },
    //     {
    //         type: "text",
    //         placeholder: "Enter the name of the Hackathon",
    //         label: "Hackathon's Name *",
    //         name: "hackathonName",
    //         error: errors.hackathonName,
    //     },
    //     {
    //         type: "text",
    //         placeholder: "Enter Registration Link",
    //         label: "Registration Link *",
    //         name: "regURL",
    //         error: errors.regURL,
    //     },
    // ] as const;
    return (
        <>
            <h1 className=" text-lg md:text-2xl w-full h-14 font-bold text-white bg-accent dark:bg-accent flex flex-col justify-center rounded-lg pl-5 rounded-b-none  ">
                Hackathon Details
            </h1>
            <div className="flex flex-col gap-4 w-full border border-t-0 rounded-t-none mb-4 border-gray-300 px-4 sm:px-10 py-5 rounded-lg ">
                {
                    Data.map((detail:any) => (
                        <FormField
                            key={detail.name}
                            type={detail.type}
                            placeholder={detail.placeholder}
                            label={detail.label}
                            name={detail.name}
                            register={register}
                            error={detail.error}
                        />
                    ))
                }

                {/* HACKATHON MODE RADIO INPUTS */}
                <div className="flex flex-wrap justify-start items-center w-full gap-5 ">
                    <h2 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Hackathon Mode *
                    </h2>
                    {hackathonModes.map((mode) => (
                        <div
                            key={mode}
                            className="flex items-center px-4 rounded-full border border-sky-200 dark:border-sky-700 focus-within:bg-sky-200 dark:focus-within:bg-sky-900"
                        >
                            <input
                                {...register("hackathonMode")}
                                type="radio"
                                value={mode}
                                id={mode}
                                className="text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor={mode}
                                className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {mode}
                            </label>
                        </div>
                    ))}
                    {errors.hackathonMode && <ErrorMessage message={errors.hackathonMode.message}/> }

                </div>

                <div className=' w-full flex sm:flex-row flex-col justify-between items-center gap-4 '>
                    <div className=' '>
                        {/* Date Picker Component */}
                        <Label>Last Date of Registration *</Label>
                        <Controller
                            control={control}
                            name="regDate"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <ReactDatePicker
                                    dateFormat="dd/MM/yyyy"
                                    onChange={(date) => onChange(date)} // send value to hook form
                                    onBlur={onBlur} // notify when input is touched/blur
                                    selected={value}
                                    closeOnScroll={true}
                                    className=" focus:border-b-2 border-blue-500 px-5 w-fit rounded-full mb-2 mt-1 dark:text-white"
                                />
                            )}
                        />
                        {errors.regDate && <ErrorMessage message={errors.regDate.message}/> }
                    </div>
                    <FormField
                        type="text"
                        placeholder="Mumbai, Maharastra or Online *"
                        label="Location of the event? *"
                        name="location"
                        register={register}
                        error={errors.location}
                    />
                </div>
            </div>
        </>
    )
}