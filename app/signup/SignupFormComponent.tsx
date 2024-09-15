import { FormButton } from '@/components/ui/FormButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { UseFormRegister, FieldErrors, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

interface FormData {
    name: string;
    username: string;
    email: string;
    password: string;
}


interface FormComponentProps {
    register: UseFormRegister<FormData>;
    handleSubmit: UseFormHandleSubmit<FormData>;
    errors: FieldErrors<FormData>;
    isSubmitting: boolean;
    onSubmit: SubmitHandler<FormData>;
    handleShowPassword: () => void;
    showPassword: boolean;
    passwordType: string;
}

const formFields = [
    { id: 'name', label: 'Full Name', placeholder: 'Enter your full name' },
    { id: 'username', label: 'User name', placeholder: 'Enter a unique username' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'example@email.com' },
    { id: 'password', label: 'Password', type: 'password', placeholder: '********' }
];


export const SignupFormComponent: React.FC<FormComponentProps> = ({ register, handleSubmit, errors, isSubmitting, onSubmit, handleShowPassword, showPassword, passwordType }) => {
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
                {formFields.slice(0, 1).map((field) => (
                    <div key={field.id} className="space-y-2 mb-1">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                            id={field.id}
                            placeholder={field.placeholder}
                            {...register(field.id as keyof FormData)} // Explicit type casting for safety
                            className="focus:border-b-2 border-blue-500 rounded-md bg-inputGray"
                            required
                        />
                        {errors[field.id as keyof FormData] && (
                            <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500">
                                *{(errors[field.id as keyof FormData]?.message as string) || ''}
                            </span>
                        )}
                    </div>
                ))}
                <div className="flex gap-2 items-center">
                    {formFields.slice(1, 3).map((field) => (
                        <div key={field.id} className="w-1/2 space-y-2 mb-1">
                            <Label htmlFor={field.id}>{field.label}</Label>
                            <Input
                                id={field.id}
                                placeholder={field.placeholder}
                                {...register(field.id as keyof FormData)} // Explicit type casting
                                className="focus:border-b-2 border-blue-500 rounded-md bg-inputGray"
                                required
                            />
                            {errors[field.id as keyof FormData] && (
                                <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500">
                                    *{(errors[field.id as keyof FormData]?.message as string) || ''}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-2 mb-1">
                <Label htmlFor="password">Password</Label>
                <div className="flex relative items-center">
                    <Input
                        id="password"
                        type={passwordType}
                        placeholder="********"
                        className="focus:border-b-2 border-blue-500 rounded-md bg-inputGray"
                        {...register("password")}
                        required
                    />
                    <div onClick={handleShowPassword} className="absolute inset-y-0 right-0 flex items-center px-4 mt-1 mr-1 cursor-pointer text-lg">
                    {showPassword ? <RiEyeCloseLine /> : <MdOutlineRemoveRedEye />}
                    </div>
                </div>
                {errors.password && (
                    <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500">
                        *{errors.password?.message as string}
                    </span>
                )}
            </div>
            {
                isSubmitting ?
                <FormButton label="Sign Up" isLoader={true} />
                :
                <FormButton label="Sign Up" />
            }
        </form>
    );
};

export default SignupFormComponent;
