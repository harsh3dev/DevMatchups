import React from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CreatableSelect from 'react-select/creatable';
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

const FiltersComponent = ({form, modeOptions, expOptions, skillOptions, handleReset, onSubmit}) => {
    return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center  gap-5 w-full mt-5 h-full ">
            <FormField
                control={form.control}
                name="modeOptions"
                render={() => (
                    <FormItem>
                        <div className="flex max-w-full flex-wrap lg:justify-normal items-start gap-2">

                            {modeOptions.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="modeOptions"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex items-center gap-1 justify-between px-4 pb-2 rounded-full border border-gray-500 "
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                )
                                                            )
                                                        }}
                                                        className=" w-4 h-4 rounded-full mt-1 "
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm text-center font-normal ">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
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

                            {expOptions.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="expOptions"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex items-center gap-1 justify-between px-4 pb-2 rounded-full border border-gray-500"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                        }}
                                                        className=" w-4 h-4 rounded-full mt-1 "
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <div className="w-full " >
                <Controller
                    name="skillOptions"
                    control={form.control}
                    render={({ field }) => (
                        <CreatableSelect
                            isMulti
                            options={skillOptions}
                            value={field.value?.map(skill => ({ value: skill, label: skill })) || []}
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
                            theme={theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral30: "", // control/borderColor(focused)
                                    neutral50: "var(--accent)", // placeholder color
                                    neutral80: "var(--text)", // input color
                                    primary25: "", // option bg color focused
                                    primary: "", // option bg color selected
                                    primary50: "" // option bg color active (enabled or available)
                                }
                            })}
                        />
                    )}
                    rules={{ required: true }}
                />
            </div>
            <div className=" w-1/2 lg:w-full flex justify-around gap-4 items-center ">
                <Button onClick={(e)=>handleReset(e)} className="  w-1/2 rounded-lg border border-text bg-transparent dark:bg-transparent hover:bg-gray-200 dark:hover:bg-gray-900 text-text dark:text-text " >Reset Filters</Button>
                <Button className=" w-1/2 bg-secondary dark:bg-secondary text-text dark:text-text hover:bg-accent dark:hover:bg-accent " type="submit">Apply Filters</Button>
            </div>
        </form>
  )
}

export default FiltersComponent
