import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"





const FilterTab = () => {
  return (
    <ScrollArea className='h-[70vh] bg-blue-700 rounded-xl  ' >
      <ScrollArea className='w-full'>
  <ScrollBar/>

      </ScrollArea>
      <Select >
        <SelectTrigger>
          <SelectValue placeholder="Select a verified email to display" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="m@example.com">m@example.com</SelectItem>
          <SelectItem value="m@google.com">m@google.com</SelectItem>
          <SelectItem value="m@support.com">m@support.com</SelectItem>
        </SelectContent>
      </Select>
      <ScrollBar/>
    </ScrollArea>
  )
}

export default FilterTab
