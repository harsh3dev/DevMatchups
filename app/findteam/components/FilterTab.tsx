import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




const FilterTab = () => {
  return (
    <div className='min-h-[50vh] bg-blue-700 rounded-xl  ' >
      
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
    </div>
  )
}

export default FilterTab
