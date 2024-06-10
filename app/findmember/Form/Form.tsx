"use client"
import { useForm, Controller } from "react-hook-form";
import { FormData, UserSchema } from "@/app/findmember/Form/types";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Label } from "@/components/ui/label"
import { ControllerRenderProps, Control } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';


interface Option {
    value: string;
    label: string;
}

function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
        control,
    } = useForm<FormData>({
        resolver: zodResolver(UserSchema), // Apply the zodResolver
    });
    const animatedComponents = makeAnimated();


    const onSubmit = async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("SUCCESS", data);
        reset();
    }
    const ModeOptions = [{ value: 'Offline', label: 'Offline' }, { value: 'Online', label: 'Online' }, { value: 'Hybrid', label: 'Hybrid' }]
    const SkillsOptions = [{ value: 'Javascript', label: 'Javascript' }, { value: 'Python', label: 'Python' }, { value: 'React JS', label: 'React JS' }, { value: 'Next JS', label: 'Next JS' }, { value: 'MongoDB', label: 'MongoDB' }, { value: 'SQL', label: 'SQL' }]
    const ExperienceOptions = [{ value: 'Beginner (0-1 years)', label: 'Beginner (0-1 years)' }, { value: 'Intermediate (1-2 years)', label: 'Intermediate (1-2 years)' }, { value: 'Expert (2+ years)', label: 'Expert (2+ years)' }]

    return (
        <form className="w-full min-h-screen my-10 " onSubmit={handleSubmit(onSubmit)}>
            <TracingBeam className="w-full  ">
                <div className="w-full font-extrabold text-2xl" >
                        <h1 className="font-extrabold text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent ">
                            Team Up Now: Register and Find Teammates Today!
                        </h1>
                </div>
                <div className="min-w-[50rem] w-full flex flex-col items-start justify-normal text-left ">
                    <h1 className=" mt-4  text-2xl w-full h-14 font-bold bg-sky-100 flex flex-col justify-center rounded-lg pl-5 rounded-b-none  ">
                        Hackathon Details
                    </h1>
                    <div className="flex flex-col gap-4 w-full border border-t-0 rounded-t-none  border-gray-300 px-10 py-5 rounded-lg ">
                        <FormField
                            type="text"
                            placeholder="Enter team's name"
                            label="Team Name *"
                            name="teamName"
                            register={register}
                            error={errors.teamName}
                        />
                        <FormField
                            type="text"
                            placeholder="Enter the name of the Hackathon"
                            label="Hackathon's Name *"
                            name="hackathonName"
                            register={register}
                            error={errors.hackathonName}
                        />
                        <FormField
                            type="text"
                            placeholder="Enter Registration Link"
                            label="Registration Link *"
                            name="regURL"
                            register={register}
                            error={errors.regURL}
                        />

                        {/* TODO: Select */}
                        {/* <FormField
                        type="text"
                        placeholder="Online/Offline/Hybrid"
                        label="Hackathon Mode *"
                        name="hackathonMode"
                        register={register}
                        error={errors.hackathonMode}
                        options={ModeOptions}
                    /> */}

                        <div className="flex justify-start items-center w-full gap-5 ">
                            <h2 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Hackathon Mode *
                            </h2>
                            <div className="flex items-center px-4 rounded-full border border-sky-200 dark:border-sky-700">
                                <input
                                    {...register("hackathonMode")}
                                    type="radio"
                                    value="Online"
                                    id="Online"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300   dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="Online" className="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" > Online </label>
                            </div>

                            <div className="flex items-center px-4 rounded-full border border-sky-200 dark:border-sky-700">
                                <input
                                    {...register("hackathonMode")}
                                    type="radio"
                                    value="Offline"
                                    id="Offline"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="Offline" className="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" > Offline </label>
                            </div>

                            <div className="flex items-center px-4 rounded-full border border-sky-200 dark:border-sky-700">
                                <input
                                    {...register("hackathonMode")}
                                    type="radio"
                                    value="Hybrid"
                                    id="Hybrid"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300   dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="Hybrid" className="w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" > Hybrid </label>
                            </div>
                        </div>


                        <FormField
                            type="text"
                            placeholder="Date of reg"
                            label="Last Date of Registration *"
                            name="regDate"
                            register={register}
                            error={errors.regDate}
                        />
                        <FormField
                            type="text"
                            placeholder="Mumbai, Maharastra or Online *"
                            label="Location of the event? *"
                            name="location"
                            register={register}
                            error={errors.location}
                        />
                    </div>

                    <h1 className=" mt-4 text-2xl w-full h-14 font-bold bg-sky-100 flex flex-col justify-center rounded-lg pl-5 rounded-b-none  ">
                        Team member requirements
                    </h1>
                    <div className="flex flex-col gap-4 w-full border border-t-0 rounded-t-none  border-gray-300 px-10 py-5 rounded-lg ">

                        <FormField
                            type="number"
                            placeholder="01"
                            label="How many team members are you looking for? *"
                            name="memberCount"
                            register={register}
                            error={errors.memberCount}
                        />

                        {/* TODO: Select */}
                        <FormField
                            type="text"
                            placeholder="Javascript, Python, C# etc..."
                            label="What are the required skills? *"
                            name="skills"
                            register={register}
                            error={errors.skills}
                            options={SkillsOptions}
                            isMulti={true}
                        />


                        {/* TODO: Select */}
                        <FormField
                            type="text"
                            placeholder="Backend, Frontend, Devops etc..."
                            label="What role the member will serve in the team? *"
                            name="role"
                            register={register}
                            error={errors.role}
                        />

                        {/* TODO: Select */}
                        <FormField
                            type="text"
                            placeholder="Enter minimum experience level"
                            label="Experience level *"
                            name="experience"
                            register={register}
                            error={errors.experience}
                            options={ExperienceOptions}
                        />

                    </div>


                    <h1 className=" mt-4 text-2xl w-full h-14 font-bold bg-sky-100 flex flex-col justify-center rounded-lg pl-5 rounded-b-none  ">
                        Lead Details
                    </h1>
                    <div className="flex flex-col gap-4 w-full border border-t-0 rounded-t-none pb-5 border-gray-300 px-10 py-5 rounded-lg ">

                        <FormField
                            type="text"
                            placeholder="Enter Team Lead's name"
                            name="leadName"
                            label="Team Lead Name *"
                            register={register}
                            error={errors.leadName}
                        />
                        <FormField
                            type="text"
                            placeholder="Enter Team Lead's email address"
                            name="leadEmail"
                            label="Team Lead's Email address *"
                            register={register}
                            error={errors.leadEmail}
                        />
                        <FormField
                            type="text"
                            placeholder="https://www.linkedin.com/in/youruserid/"
                            name="leadLinkedin"
                            label="Team Lead's LinkedIn URL *"
                            register={register}
                            error={errors.leadLinkedin}
                        />
                        <FormField
                            type="text"
                            placeholder="https://github.com/youruserid/"
                            name="leadGithub"
                            label="Team Lead's Github URL *"
                            register={register}
                            error={errors.leadGithub}
                        />
                        <FormField
                            type="text"
                            placeholder="include country code: eg: +918XXXXXXX9"
                            name="leadNumber"
                            label="Team Lead's contact Number"
                            register={register}
                            error={errors.leadNumber}
                        />

                        <h1 className="text-2xl font-bold mb-4 ">
                            Additional Details
                        </h1>


                        <FormField
                            type="textArea"
                            placeholder="Mention any additional details you feel is important..."
                            label="Enter any additional details"
                            name="description"
                            register={register}
                            error={errors.description}
                        />



                    </div>
                    {isSubmitting ?
                        <Button disabled className="mt-4 w-full ">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button> :
                        <Button type="submit" className="mt-4 w-full " >
                            Submit
                        </Button>}
                </div>
            </TracingBeam>
        </form>
    );
}

export default Form;