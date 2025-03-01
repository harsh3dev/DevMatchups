import React, { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  selectUser,
  setUser,
  UserState,
} from "@/lib/store/features/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { FaLinkedin } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { ReloadIcon } from "@radix-ui/react-icons";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const formatSkillsData = (skills: string | string[]) => {
  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
  }
  return skills;
};

const EditProfileForm = ({ setIsOpen } : { setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserState>({
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit: SubmitHandler<UserState> = async (data) => {
    const skillData = {
      ...data,
      skills: formatSkillsData(data.skills),
    };
    dispatch(setUser(data));
    try {
      const response = await axios.post("/api/user", data);
      if (response.status === 200) {
        toast.success("Profile Updated Succesfully successfully!");
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollArea className=" max-w-full ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full h-full flex flex-col justify-between items-start gap-2 "
      >
        <div className=" w-full flex justify-center items-center gap-2 ">
          <div className="w-full">
            <Label className="text-sm">Name</Label>
            <Input
              {...register("name")}
              className=" rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
            />
          </div>
          <div className="w-full">
            <Label className="text-sm">Email</Label>
            <Input
              {...register("email")}
              className="w-full rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
            />
          </div>
        </div>

        <div className=" w-full flex justify-center items-center gap-2 ">
          <div className=" w-full flex relative items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none  ">
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 dark:text-gray-500 text-gray-700">|</span>
            </div>
            {/* github link*/}
            <Input
              placeholder="Enter GitHub URL"
              {...register("githubUrl")}
              className=" pl-10 w-full rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
            />
          </div>
          <div className=" w-full flex relative items-center ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none  ">
              <FaLinkedin className=" w-[20px] h-[20px] " />
              <span className="ml-1 dark:text-gray-500 text-gray-700">|</span>
            </div>
            {/* linkedin link*/}
            <Input
              placeholder="Enter LinkedIn URL"
              {...register("linkedinUrl")}
              className=" pl-10 w-full rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
            />
          </div>
        </div>
        {/* Portfolio and Image */}
        <div className=" w-full flex justify-center items-center gap-2 ">
          <div className=" w-full flex relative items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none  ">
              <HiOutlineGlobeAlt className=" w-[20px] h-[20px] " />
              <span className="ml-1 dark:text-gray-500 text-gray-700">|</span>
            </div>
            <Input
              placeholder="Enter Portfolio Link"
              {...register("resumeUrl")}
              className=" pl-10 w-full rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
            />
          </div>
          <div className=" w-full flex relative items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none  ">
              <FaImage className=" w-[20px] h-[20px] " />
              <span className="ml-1 dark:text-gray-500 text-gray-700">|</span>
            </div>
            {/* Resume link */}
            <Input
              placeholder="Enter Resume Link"
              {...register("image")}
              className=" truncate pl-10 w-full rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
            />
          </div>
        </div>

        {/* Skills */}
        <div className="w-full">
          <Label className="text-sm">Skills</Label>
          <Input
            placeholder="Enter your skills here"
            {...register("skills")}
            className=" rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
          />
        </div>

        {/* Bio */}
        <div className="w-full">
          <Label className="text-sm">Bio</Label>
          <Input
            placeholder="Describe something about yourself..."
            {...register("bio")}
            className=" rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
          />
        </div>

        {/* Role and Experience*/}
        <div className=" w-full flex justify-center items-center gap-2 ">
          <div className="w-full">
            <Label className="text-sm">Role</Label>
            <Input
              {...register("role")}
              className=" rounded-lg bg-inputGray dark:bg-inputGray border border-secondary focus:outline focus:outline-primary focus:border-primary "
            />
          </div>
        </div>
        <div className=" w-full flex justify-center items-center gap-2 ">
          {isSubmitting ? (
            <Button
              disabled
              className="mt-4 w-full bg-primary dark:bg-secondary  hover:ring-2 ring-offset-1 text-white dark:text-white  "
            >
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="mt-4 w-full bg-primary dark:bg-primary dark:hover:bg-slate-900/90 text-white dark:text-white "
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </ScrollArea>
  );
};

export default EditProfileForm;
