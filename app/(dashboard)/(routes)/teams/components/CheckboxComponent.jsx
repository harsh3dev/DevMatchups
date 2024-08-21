import React from "react";
import {
    FormControl,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"


const CheckboxComponent = ({field, item, isChecked}) => {
    return (
        <FormItem
        key={item.id}
        className="flex items-center gap-1 justify-center p-2 rounded-md  "
        style={{
            backgroundColor: isChecked ? "var(--secondary)" : "var(--background)",
        }}
        >
        <FormControl>
            <Checkbox
            checked={field.value?.includes(item.id)}
            onCheckedChange={(checked) => {
                return checked
                ? field.onChange([...field.value, item.id])
                : field.onChange(
                    field.value?.filter((value) => value !== item.id)
                    );
            }}
            className=" w-4 h-4 rounded-full mt-1 "
            />
        </FormControl>
        <FormLabel className="text-sm text-center font-normal ">
            {item.label}
        </FormLabel>
        </FormItem>
    );
};

export default CheckboxComponent;
