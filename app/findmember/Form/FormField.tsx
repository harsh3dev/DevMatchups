import { FormFieldProps } from "@/app/findmember/Form/types";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Temp from "./Temp";

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
        {error && <span className="error-message text-lg font-semibold text-red-500 ">*{error.message}</span>}
    </div>

        {helper && 
           <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700">
            <Temp/>
            <span>Use at least 8 characters, one uppercase, one lowercase and one number.</span>
        </p>}
        
    </div>
);
export default FormField;