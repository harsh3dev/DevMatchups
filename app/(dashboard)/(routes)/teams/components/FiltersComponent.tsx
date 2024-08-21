import React from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CreatableSelect from 'react-select/creatable';
import CheckboxComponent from "./CheckboxComponent"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {  Controller } from "react-hook-form"

interface FiltersComponentProps {
    form: any;
    modeOptions: any;
    expOptions: any;
    skillOptions: any;
    handleReset: any;
    onSubmit: any;
}

const FiltersComponent:React.FC<FiltersComponentProps> = ({form, modeOptions, expOptions, skillOptions, handleReset, onSubmit}) => {
    return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-2 w-full my-4 h-full  ">
        <FormField
            control={form.control}
            name="modeOptions"
            render={() => (
                <FormItem>
                    <div className="flex max-w-full flex-wrap lg:justify-normal items-start gap-2">
                        {modeOptions.map((item:any) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="modeOptions"
                                render={({ field }) => {
                                    const isChecked = field.value?.includes(item.id);
                                    return (
                                        <CheckboxComponent field={field} item={item} isChecked={isChecked} />
                                    )
                                }}
                            />
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="expOptions"
            render={() => (
                <FormItem>
                    <div className="flex max-w-full px-8 lg:justify-normal gap-2 items-start lg:flex-wrap ">
                        {expOptions.map((item:any) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="expOptions"
                                render={({ field }) => {
                                    const isChecked = field.value?.includes(item.id);
                                    return (
                                        <CheckboxComponent field={field} item={item} isChecked={isChecked} />
                                    )
                                }}
                            />
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
        
        <div className=" w-full px-2 " >
            <Controller
                name="skillOptions"
                control={form.control}
                render={({ field }) => (
                    <CreatableSelect
                        isMulti
                        options={skillOptions}
                        value={field.value?.map((skill:any) => ({ value: skill, label: skill })) || []}
                        onChange={val => field.onChange(val.map(v => v.value))}
                        placeholder="Javascript, Python, C# etc..."
                        id="skills"
                        styles={{
                            singleValue: base => ({ ...base, color: "#154b79" }),
                            valueContainer: base => ({
                                ...base,
                                color: "var(--text)",
                                width: "100%",
                                borderColor: "var(--primary)",
                                padding: "0 8px",
                            }),
                            dropdownIndicator: (base) => ({
                                ...base,
                                // display: "none", // Hides the dropdown arrow
                                }),
                                indicatorSeparator: () => ({
                                display: "none", // Hides the separator line
                                }),
                            control: (base, state) => ({
                                ...base,
                                color: "var(--text)",
                                background: "var(--background)",
                                borderRadius: "10px",
                                borderTop: "2px",
                                borderLeft: "2px",
                                borderRight: "2px",
                                borderBottom: "2px",
                                textDecorationColor: "var(--text)",
                                ":hover": {
                                    borderRadius: "10px",
                                    borderTop: "2px",
                                    borderLeft: "2px",
                                    borderRight: "2px",
                                },
                                ":active": {
                                    borderRadius: "10px",
                                    borderTop: "2px",
                                    borderLeft: "2px",
                                    borderRight: "2px",
                                },
                                ":focus": {
                                    borderRadius: "10px",
                                    borderTop: "2px",
                                    borderLeft: "2px",
                                    borderRight: "2px",
                                }
                            }),
                            option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                                ...styles,
                                backgroundColor: "var(--background)",
                                color: "var(--text)",
                                ":active": {
                                    ...styles[":active"],
                                    backgroundColor: "var(--secondary)"
                                }
                            }),
                            multiValue: (styles, { data }) => ({
                                ...styles,
                                backgroundColor: "var(--secondary)",
                                borderRadius: "20px", // the bg color behind icon
                                padding: "5px"
                            }),
                            multiValueLabel: styles => ({
                                ...styles,
                                color: "var(--text)", // label text color
                                background: "var(--secondary)", // label bg behind selected
                                borderEndStartRadius: "20px",
                                borderTopLeftRadius: "20px",
                            }),
                            multiValueRemove: styles => ({
                                ...styles,
                                color: "var(--text)",
                                ":hover": {
                                    backgroundColor: "var(--secondary)", // on hover x bg color
                                    color: "var(--text)", // on hover x icon color
                                    borderRadius: "20px",
                                }
                            })
                        }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: "var(--hover-background)",
                                primary: "var(--primary)",
                                neutral30: "var(--border)",
                              neutral50: "var(--accent)", // placeholder color
                              neutral80: "var(--text)", // input text color
                            },
                            })}
                    />
                )}
                rules={{ required: true }}
            />
        </div>
        <div className=" w-full lg:w-full flex justify-around gap-4 items-center my-4 px-2 ">
            <Button onClick={(e)=>handleReset(e)} className="  w-full rounded-lg border border-text bg-transparent dark:bg-transparent hover:bg-gray-200 dark:hover:bg-gray-900 text-text dark:text-text " >Reset Filters</Button>
            <Button className=" w-full bg-secondary dark:bg-secondary text-text dark:text-text hover:bg-accent dark:hover:bg-accent " type="submit">Apply Filters</Button>
        </div>
    </form>
    )
}

export default FiltersComponent
