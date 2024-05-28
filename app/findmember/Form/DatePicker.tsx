import React from 'react';
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { cn } from "@/lib/utils"

const DatePicker = () => {
  return (
    <div>
      <Popover>
                <PopoverTrigger asChild>

                </PopoverTrigger>
      </Popover>
    </div>
  )
}

export default DatePicker
