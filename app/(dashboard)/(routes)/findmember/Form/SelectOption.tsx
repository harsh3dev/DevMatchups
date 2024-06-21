import { Label } from '@/components/ui/label';
import React from 'react'
import Select from 'react-select'
interface SelectOptionProps{
    options: readonly unknown[],
    label: string,
    className: string,
}

const SelectOption:React.FC<SelectOptionProps> = ({options, label, className, ...props }) => {
    return(
        <>
            <Label htmlFor={label}>{label}</Label>
            <Select options={options} className={className} id={label} />
        </>
    )
}

export default SelectOption;