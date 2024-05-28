import { FormFieldProps } from "@/app/findmember/Form/types";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    label,
    register,
    error,
    helper = false,
    valueAsNumber,
}) => (
    <div className="w-[50rem] h-[5rem] ">
        <div className="w-full h-[50%] flex flex-col gap-5 ">
        <Label htmlFor={label}>{label}</Label>
      <Input type={type} id={label} placeholder={placeholder} {...register(name, { valueAsNumber })} />
        {/* <label className="w-full h-full font-bold text-2xl">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                className=""
            /> */}
            {error && <span className="error-message text-lg font-semibold text-red-500 ">*{error.message}</span>}
        
        </div>

        {helper && <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                <path fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"></path>
            </svg>
            Use at least 8 characters, one uppercase, one lowercase and one number.
        </p>}
        
    </div>
);
export default FormField;