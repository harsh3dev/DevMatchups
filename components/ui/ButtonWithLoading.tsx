import React from 'react'

import { Button } from "@/components/ui/button"; 
import { cn } from "@/lib/utils"; 
import Spinner from "@/app/assets/spinner.svg"
import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    className?: string;
}


const ButtonWithLoading: React.FC<CustomButtonProps> = ({ loading, className, children, ...props }) => {
return (
    <Button
        className={cn(" px-4 py-2 bg-primary hover:bg-accent text-text font-medium ", loading && "cursor-not-allowed opacity-75", className)}
      disabled={loading} 
        {...props}
    >
        {loading ? (
        <Spinner className="mr-2 h-4 w-4 animate-spin text-text " /> 
        ) : (
        children
        )}
    </Button>
    )
}

export default ButtonWithLoading;