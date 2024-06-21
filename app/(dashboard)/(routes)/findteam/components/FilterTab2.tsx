"use client"
import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SearchFilter } from './SearchFilter'
import { Button } from '@/components/ui/button'
import CheckBox from './CheckBox';
import { Label } from '@/components/ui/label';
const schema = z.object({
  skills: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type FormValues = z.infer<typeof schema>;


const FilterTab2: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: [],
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    console.log(errors);
  }
  const skillOptions = [
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
  ]

  return (
    <ScrollArea className='h-[70vh] border dark:border-white border-black p-5 ' >
      <div className='max-w-4xl w-full mx-auto'>
        <SearchFilter />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full overflow-y-auto ' >
        {skillOptions.map(option => (
          <Controller
          control={control}
          name="regDate"
          render={({ field }) => (
            <>
            <Checkbox
              id={option.id}
              checked={field.value?.includes(option.value)}
              onCheckedChange={(checked) => {
                return checked
                  ? field.onChange([...field.value, option.value])
                  : field.onChange(
                      field.value?.filter(
                        (value: string) => value !== option.value
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
        ))}
          {/* <>
            
            <CheckBox
              key={option.id}
              control={control}
              label={option.label}
              id={option.id}
              value={option.value}
            />
          </>
        ))} */}

        {/* <div className=' --mode flex w-full gap-4 justify-between'>
          <div className='flex items-center justify-center gap-2'>
            <Checkbox id='online' {...register("online", {})} />
            <label htmlFor="online"> Online </label>
          </div>
          <div className='flex items-center justify-center gap-2'>
          <Checkbox  id='offline' {...register("offline", {})} />
            <label htmlFor="offline"> Offline </label>
          </div>
          <div className='flex items-center justify-center gap-2'>
          <Checkbox  id='hybrid' {...register("hybrid", {})} />
            <label htmlFor="hybrid"> Hybrid </label>
          </div>
        </div> */}

        <Button type='submit'>Apply Filters </Button>
      </form>

      experience, skills, location
      <ScrollBar />
    </ScrollArea>
  )
}

export default FilterTab
