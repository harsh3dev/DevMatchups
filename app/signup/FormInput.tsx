import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    error?: string;
    register: any;  // Use `UseFormRegister` if you want a stricter type
    required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ id, label, type = "text", placeholder, error, register, required }) => (
    <div className="space-y-2 mb-1">
        <Label htmlFor={id}>{label}</Label>
        <Input
            id={id}
            type={type}
            placeholder={placeholder}
            className="focus:border-b-2 border-blue-500 rounded-md bg-inputGray"
            {...register(id)}
            required={required}
        />
        {error && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500">*{error}</span>}
    </div>
);
