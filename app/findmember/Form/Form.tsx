"use client"
import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "@/app/findmember/Form/types";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"


function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(UserSchema), // Apply the zodResolver
    });


    const onSubmit = async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("SUCCESS", data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center justify-normal gap-5 ">
                <h1 className="text-3xl font-bold mb-4">
                    Hackathon Details
                </h1>
                <FormField
                    type="text"
                    placeholder="Enter team Name"
                    label="Team Name"
                    name="teamName"
                    register={register}
                    error={errors.teamName}
                />
                <FormField
                    type="text"
                    placeholder="Enter Hackathon Name"
                    label="Hackathon Name"
                    name="hackathonName"
                    register={register}
                    error={errors.hackathonName}
                />
                <FormField
                    type="text"
                    placeholder="Enter Registration Link"
                    label="Registration Link"
                    name="regURL"
                    register={register}
                    error={errors.regURL}
                />

                {/* TODO: Select */}
                <FormField
                    type="text"
                    placeholder=""
                    label="Hackathon Mode"
                    name="hackathonMode"
                    register={register}
                    error={errors.hackathonMode}
                />
                <FormField
                    type="text"
                    placeholder=""
                    label="Last Date of Registration"
                    name="regDate"
                    register={register}
                    error={errors.regDate}
                />
                <FormField
                    type="text"
                    placeholder="Enter Location or Online"
                    label="Location"
                    name="location"
                    register={register}
                    error={errors.location}
                />

                <h1 className="text-3xl font-bold mb-4">
                    Team member requirements
                </h1>

                <FormField
                    type="number"
                    placeholder="1"
                    label="Number of Team members required"
                    name="memberCount"
                    register={register}
                    error={errors.memberCount}
                />

                {/* TODO: Select */}
                <FormField
                    type="text"
                    placeholder=""
                    label="Enter skills required"
                    name="skills"
                    register={register}
                    error={errors.skills}
                />

                {/* TODO: Select */}
                <FormField
                    type="text"
                    placeholder="Enter Role"
                    label="Role"
                    name="role"
                    register={register}
                    error={errors.role}
                />

                {/* TODO: Select */}
                <FormField
                    type="text"
                    placeholder="Enter Minimum Experience"
                    label="Experience level"
                    name="experience"
                    register={register}
                    error={errors.experience}
                />

                <h1 className="text-3xl font-bold mb-4">
                    Lead Details
                </h1>

                <FormField
                    type="text"
                    placeholder="Enter Team Lead's Name"
                    name="leadName"
                    label="Team Lead Name"
                    register={register}
                    error={errors.leadName}
                />
                <FormField
                    type="text"
                    placeholder="Enter Team Lead's email"
                    name="leadEmail"
                    label="Team Lead's Email address"
                    register={register}
                    error={errors.leadEmail}
                />
                <FormField
                    type="text"
                    placeholder="Enter Team Lead's LinkedIn"
                    name="leadLinkedin"
                    label="Team Lead's LinkedIn URL"
                    register={register}
                    error={errors.leadLinkedin}
                />
                <FormField
                    type="text"
                    placeholder="Enter Team Lead's Github URL"
                    name="leadGithub"
                    label="Team Lead's Github URL"
                    register={register}
                    error={errors.leadGithub}
                />
                <FormField
                    type="text"
                    placeholder="(optional)"
                    name="leadNumber"
                    label="Team Lead's contact Number'"
                    register={register}
                    error={errors.leadNumber}
                />

                <h1 className="text-3xl font-bold mb-4">
                    Additional Details
                </h1>

                <FormField
                    type="text"
                    placeholder="(optional)"
                    label="Enter any additional details"
                    name="description"
                    register={register}
                    error={errors.description}
                />
                { isSubmitting?
                <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>:
                <Button type="submit" >
                    Submit
                </Button>}
            </div>
        </form>
    );
}

export default Form;