import { Button } from "@/components/ui/button"
import Image from "next/image"
import Spinner from "@/app/assets/spinner.svg"

export const FormButton = ({label, isLoader=false}: {label:string, isLoader?:boolean}) => {
  return (
    <>
    {   isLoader ?
        (
            <button disabled className="mt-4 p-2 rounded-lg w-full bg-primary dark:bg-secondary dark:hover:bg-slate-900/90 text-white dark:text-white grid place-content-center place-items-center ">
                <Image src={Spinner} alt="loader" className="mr-2 h-8 w-8 animate-spin text-text " />
            </button>
        )
        :
        (
        <Button type="submit" className="mt-4 p-4 rounded-lg w-full bg-primary dark:bg-secondary dark:hover:bg-slate-900/90 text-white dark:text-white ">
        {label}
        </Button>
        )
    }
    </>
)
}
