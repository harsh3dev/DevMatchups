import { FormFieldProps } from "./types";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";

export const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    label,
    register,
    error,
    helper = false,
    valueAsNumber,
}) => {

    return (
        <div className="w-full h-[5rem] mb-4 ">
            <div className="w-full h-[50%] flex flex-col gap-2 ">
                <Label htmlFor={label}>{label}</Label>
                { type==='textarea' ? (<Textarea className={`dark:bg-gray-900 bg-gray-200 border-accent focus:border focus:border-b-2 ${type !== 'textarea' ? 'rounded-full' : 'rounded-md'}`} id={label} placeholder={placeholder} {...register(name, { valueAsNumber })} />) :
                (<Input className={`dark:bg-gray-900 bg-gray-200 border-accent focus:border focus:border-b-2 ${type !== 'textarea' ? 'rounded-full' : 'rounded-md'}`} type={type} id={label} placeholder={placeholder} {...register(name, { valueAsNumber })} />)}
                {error && <span className="error-message text-right flex justify-end items-center w-full text-sm mb-5 text-red-500 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                        <path fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clip-rule="evenodd"></path>
                    </svg>
                {error.message}</span>}
            </div>

            {helper && <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                    <path fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clip-rule="evenodd"></path>
                </svg>
                {/* {helperText} */}
            </p>}
        </div>
    )
};