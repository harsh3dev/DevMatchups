"use client"
import '@/app/globals.css'
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, UserSchema } from "./types";
import FormField from "./FormField";
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import Select from 'react-select';

import CreatableSelect from 'react-select/creatable';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";


import { getSession } from 'next-auth/react';
import Spinner from '@/app/assets/Spinner';


interface Option {
    value: string;
    label: string;
}
type SkillOptions = Option[];
const Form =  () => {
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

    const onSubmit = async (data: FormData) => {
        console.log("Submitting data:", data);

        const session = await getSession();
        console.log("client session",session);

        try {
             data.userId = session?.user.id;
             const response = await axios.post('/api/post', data);
             console.log('SUCCESS', response.data);
            
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
            }
        }
        reset();
    };

    const hackathonModes = ["Online", "Offline", "Hybrid"]
    const options: SkillOptions = [{ value: 'Javascript', label: 'Javascript' }, { value: 'Python', label: 'Python' }, { value: 'React JS', label: 'React JS' }, { value: 'Next JS', label: 'Next JS' }, { value: 'MongoDB', label: 'MongoDB' }, { value: 'SQL', label: 'SQL' }]
    const ExperienceOptions = [{ value: 'Beginner (0-1 years)', label: 'Beginner (0-1 years)' }, { value: 'Intermediate (1-2 years)', label: 'Intermediate (1-2 years)' }, { value: 'Expert (2+ years)', label: 'Expert (2+ years)' }]
    const hackathonDetails = [
        {
            type: "text",
            placeholder: "Enter team's name",
            label: "Team Name *",
            name: "teamName",
            error: errors.teamName,
        },
        {
            type: "text",
            placeholder: "Enter the name of the Hackathon",
            label: "Hackathon's Name *",
            name: "hackathonName",
            error: errors.hackathonName,
        },
        {
            type: "text",
            placeholder: "Enter Registration Link",
            label: "Registration Link *",
            name: "regURL",
            error: errors.regURL,
        },
    ] as const;

    return (
        <form className="w-full md:w-[60%] min-h-screen my-10 px-4 z-[1] " onSubmit={handleSubmit(onSubmit)}>

                {/* HEADER TEXT */}
                <div className="w-full font-extrabold text-2xl my-4 " >
                    <h1 className=" w-full text-lg md:text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent dark:bg-gradient-to-t dark:from-sky-200 dark:to-cyan-400 ">
                        Team Up Now: Register and Find Teammates Today!
                    </h1>
                </div>

                <div className="md:min-w-[50rem] w-full flex flex-col items-start justify-normal  bg-background shadow-md  text-left ">

                    <h1 className=" text-lg md:text-2xl w-full h-14 font-bold text-white bg-accent dark:bg-accent flex flex-col justify-center rounded-lg pl-5 rounded-b-none  ">
                        Hackathon Details
                    </h1>
                    <div className="flex flex-col gap-4 w-full border border-t-0 rounded-t-none mb-4 border-gray-300 px-4 sm:px-10 py-5 rounded-lg ">
                        {
                            hackathonDetails.map((detail) => (
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
                        {errors.hackathonMode && (
                            <span className="error-message text-sm mb-5 flex items-center justify-center font-semibold text-right w-full text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4 -mt-px"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {errors.hackathonMode.message}
                            </span>
                        )}

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
                                {errors.regDate && <span className="error-message text-sm mb-5 flex items-center justify-center font-semibold text-right w-full text-red-500 "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                                    <path fill-rule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clip-rule="evenodd"></path>
                                </svg>{errors.regDate.message}</span>}
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

                    <h1 className="  text-2xl w-full h-14 font-bold dark:bg-accent bg-accent text-white flex flex-col justify-center rounded-lg pl-5 rounded-b-none  ">
                        Team member requirements
                    </h1>
                    <div className="flex flex-col gap-4 w-full h-full border border-t-0 rounded-t-none  border-gray-300 px-10 py-5 rounded-lg ">
                        <div className=' w-full flex md:flex-row flex-col justify-between items-center gap-4 mb-4 '>
                            <FormField
                                type="number"
                                placeholder="Enter a number between 1 and 5"
                                label="How many team members are you looking for? *"
                                name="memberCount"
                                register={register}
                                error={errors.memberCount}
                            />
                            <FormField
                                type="text"
                                placeholder="Backend, Frontend, Devops etc..."
                                label="What role the member will serve in the team? *"
                                name="role"
                                register={register}
                                error={errors.role}
                            />
                        </div>
                        
                        <Label htmlFor="skills" >What are the required skills? *</Label>
                        <Controller
                            name="skills"
                            control={control}
                            render={({ field }) => (
                                <CreatableSelect
                                    isMulti
                                    options={options}
                                    value={field.value?.map(skill => ({ value: skill, label: skill })) || []}
                                    onChange={val => field.onChange(val.map(v => v.value))}
                                    placeholder="Javascript, Python, C# etc..."
                                    id="skills"
                                    
                                    styles={{
                                        singleValue: base => ({ ...base, color: "#154b79" }),
                                        valueContainer: base => ({
                                            ...base,
                                            color: "var(--text)",
                                            width: "100%",
                                            borderColor: "var(--primary)",
                                            padding: "0 8px",
                                        }),
                                        dropdownIndicator: (base) => ({
                                            ...base,
                                            // display: "none", // Hides the dropdown arrow
                                            }),
                                            indicatorSeparator: () => ({
                                            display: "none", // Hides the separator line
                                            }),
                                        control: (base, state) => ({
                                            ...base,
                                            color: "var(--text)",
                                            background: "var(--inputGray)",
                                            borderRadius: "10px",
                                            borderTop: "2px",
                                            borderLeft: "2px",
                                            borderRight: "2px",
                                            borderBottom: "2px",
                                            textDecorationColor: "var(--text)",
                                            ":hover": {
                                                borderRadius: "10px",
                                                borderTop: "2px",
                                                borderLeft: "2px",
                                                borderRight: "2px",
                                            },
                                            ":active": {
                                                borderRadius: "10px",
                                                borderTop: "2px",
                                                borderLeft: "2px",
                                                borderRight: "2px",
                                            },
                                            ":focus": {
                                                borderRadius: "10px",
                                                borderTop: "2px",
                                                borderLeft: "2px",
                                                borderRight: "2px",
                                            }
                                        }),
                                        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                                            ...styles,
                                            backgroundColor: "var(--background)",
                                            color: "var(--text)",
                                            ":active": {
                                                ...styles[":active"],
                                                backgroundColor: "var(--secondary)"
                                            }
                                        }),
                                        multiValue: (styles, { data }) => ({
                                            ...styles,
                                            backgroundColor: "var(--secondary)",
                                            borderRadius: "20px", // the bg color behind icon
                                            padding: "5px"
                                        }),
                                        multiValueLabel: styles => ({
                                            ...styles,
                                            color: "var(--text)", // label text color
                                            background: "var(--secondary)", // label bg behind selected
                                            borderEndStartRadius: "20px",
                                            borderTopLeftRadius: "20px",
                                        }),
                                        multiValueRemove: styles => ({
                                            ...styles,
                                            color: "var(--text)",
                                            ":hover": {
                                                backgroundColor: "var(--secondary)", // on hover x bg color
                                                color: "var(--text)", // on hover x icon color
                                                borderRadius: "20px",
                                            }
                                        })
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: "var(--hover-background)",
                                            primary: "var(--primary)",
                                            neutral30: "var(--border)",
                                          neutral50: "var(--accent)", // placeholder color
                                          neutral80: "var(--text)", // input text color
                                        },
                                        })}
                                />
                            )}
                            rules={{ required: true }}
                        />

                        {errors.skills && <span className="error-message text-sm mb-5 font-semibold text-right flex items-center justify-center  w-full text-red-500 "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                            <path fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clip-rule="evenodd"></path>
                        </svg>{errors.skills.message}</span>}


                        <Label htmlFor="experience" >Experience level *</Label>
                        <Controller
                            name="experience"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={ExperienceOptions}
                                    value={ExperienceOptions.find((c) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    placeholder="Enter minimum experience level"
                                    id="experience"
                                    
                                    styles={{
                                        singleValue: base => ({ ...base, color: "#ffffff" }),
                                        valueContainer: base => ({
                                            ...base,
                                            color: "var(--text)",
                                            width: "100%",
                                            borderColor: "var(--primary)",
                                            padding: "0 8px",
                                        }),
                                        dropdownIndicator: (base) => ({
                                            ...base,
                                            // display: "none", // Hides the dropdown arrow
                                            }),
                                            indicatorSeparator: () => ({
                                            display: "none", // Hides the separator line
                                            }),
                                        control: (base, state) => ({
                                            ...base,
                                            color: "var(--text)",
                                            background: "var(--inputGray)",
                                            borderRadius: "10px",
                                            borderTop: "2px",
                                            borderLeft: "2px",
                                            borderRight: "2px",
                                            borderBottom: "2px",
                                            textDecorationColor: "var(--text)",
                                            ":hover": {
                                                borderRadius: "10px",
                                                borderTop: "2px",
                                                borderLeft: "2px",
                                                borderRight: "2px",
                                            },
                                            ":active": {
                                                borderRadius: "10px",
                                                borderTop: "2px",
                                                borderLeft: "2px",
                                                borderRight: "2px",
                                            },
                                            ":focus": {
                                                borderRadius: "10px",
                                                borderTop: "2px",
                                                borderLeft: "2px",
                                                borderRight: "2px",
                                            }
                                        }),
                                        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                                            ...styles,
                                            backgroundColor: "var(--background)",
                                            color: "var(--text)",
                                            ":active": {
                                                ...styles[":active"],
                                                backgroundColor: "var(--secondary)"
                                            }
                                        }),
                                        multiValue: (styles, { data }) => ({
                                            ...styles,
                                            backgroundColor: "var(--secondary)",
                                            borderRadius: "20px", // the bg color behind icon
                                            padding: "5px"
                                        }),
                                        multiValueLabel: styles => ({
                                            ...styles,
                                            color: "var(--text)", // label text color
                                            background: "var(--secondary)", // label bg behind selected
                                            borderEndStartRadius: "20px",
                                            borderTopLeftRadius: "20px",
                                        }),
                                        multiValueRemove: styles => ({
                                            ...styles,
                                            color: "var(--text)",
                                            ":hover": {
                                                backgroundColor: "var(--secondary)", // on hover x bg color
                                                color: "var(--text)", // on hover x icon color
                                                borderRadius: "20px",
                                            }
                                        })
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: "var(--hover-background)",
                                            primary: "var(--primary)",
                                            neutral30: "var(--border)",
                                          neutral50: "var(--accent)", // placeholder color
                                          neutral80: "var(--text)", // input text color
                                        },
                                        })}
                                />
                            )}
                            rules={{ required: true }}
                        />
                        {errors.experience && <span className="error-message text-sm mb-5 font-semibold flex items-center justify-center  text-right w-full text-red-500 "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                            <path fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clip-rule="evenodd"></path>
                        </svg>
                            {errors.experience.message}</span>}

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
                        <Button disabled className="mt-4 w-full bg-primary dark:bg-secondary  hover:ring-2 ring-offset-1 text-white dark:text-white  ">
                            <Spinner className="mr-2 h-4 w-4 animate-spin text-text " /> 
                        </Button> :
                        <Button type="submit" className="mt-4 w-full bg-primary dark:bg-secondary dark:hover:bg-slate-900/90 text-white dark:text-white " >
                            Submit
                        </Button>}
                </div>
        </form>
    );
}



export default Form;