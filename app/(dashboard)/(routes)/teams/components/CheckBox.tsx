import { Label } from '@/components/ui/label';
import { Checkbox } from '@radix-ui/react-checkbox';
import React from 'react'
import { Controller, Control } from "react-hook-form";
import { FormData } from '@/app/(dashboard)/(routes)/findmember/Form/types';

interface CheckBoxProps{
    control: Control<any>,
    label: string,
    id: string,
    value: string,
}

const CheckBox:React.FC<CheckBoxProps> = ({control, label, id, value}) => {
  return (
    <div>
      <Controller
        control={control}
        name="regDate"
        render={({ field }) => (
          <>
          <Checkbox
            id={id}
            checked={field.value?.includes(value)}
            onCheckedChange={(checked) => {
              return checked
                ? field.onChange([...field.value, value])
                : field.onChange(
                    field.value?.filter(
                      (value: string) => value !== value
                    )
                  )
            }}
            
            />
            <Label
              htmlFor={label}
            >{label}</Label>
            </>
        )}
      />
    </div>
  )
}

export default CheckBox
