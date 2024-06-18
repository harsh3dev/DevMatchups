"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"

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
import { SearchFilter } from "./SearchFilter"


const modeOptions = [
    {
        id: "online",
        value: "Online",
        label: "Online",
    },
    {
        id: "offline",
        value: "Offline",
        label: "Offline",
    },
    {
        id: "hybrid",
        value: "Hybrid",
        label: "Hybrid",
    },
] as const
const expOptions = [
    {
        id: "beginner",
        value: "Beginner",
        label: "Beginner",
    },
    {
        id: "intermediate",
        value: "Intermediate",
        label: "Intermediate",
    },
    {
        id: "expert",
        value: "Expert",
        label: "Expert",
    },
] as const;

const skillOptions = [
    { id: 'javascript', value: 'Javascript', label: 'Javascript' }, 
    { id: 'python', value: 'Python', label: 'Python' }, 
    { id: 'reactjs', value: 'React JS', label: 'React JS' }, 
    { id: 'nextjs', value: 'Next JS', label: 'Next JS' }, 
    { id: 'mongoDB', value: 'MongoDB', label: 'MongoDB' }, 
    { id: 'sql', value: 'SQL', label: 'SQL' }
] as const;

const FormSchema = z.object({
    expOptions: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    modeOptions: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    skillOptions: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

export function FilterTab() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            expOptions: [],
            modeOptions: [],
            skillOptions: []
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        form.reset();

    }

    return (
        <Form {...form} >
            <div className="h-[70vh] p-5">
                <div className='max-w-4xl w-full mx-auto'>
                    <SearchFilter />
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="modeOptions"
                        render={() => (
                            <FormItem>
                                <div className="flex w-full p-5 justify-around">

                                    {modeOptions.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="modeOptions"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
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
                    <FormField
                        control={form.control}
                        name="expOptions"
                        render={() => (
                            <FormItem>
                                <div className="flex w-full p-5 justify-around">

                                    {expOptions.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="expOptions"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
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
                                    singleValue: base => ({ ...base, color: "#154b79", paddingInline: "5px", }),
                                    valueContainer: base => ({
                                        ...base,
                                        color: "var(--text)",
                                        width: "100%",
                                        paddingInline: "5px",
                                        borderColor: "var(--primary)",
                                    }),
                                    control: (base, state) => ({
                                        ...base,
                                        color: "var(--text)",
                                        background: "var(--background)",
                                        borderRadius: "50px",
                                        textDecorationColor: "var(--text)"
                                    }),
                                    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                                        ...styles,
                                        backgroundColor:"var(--background)",
                                        color:"var(--text)",
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

                    <Button className="w-full" type="submit">Apply Filters</Button>
                </form>
            </div>
        </Form>
    )
}
