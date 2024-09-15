import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
    onClick: () => void;
    text: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, text }) => {
    return (
        <Button
            variant="link"
            type="button"
            onClick={onClick}
            className="sm:w-full text-left sm:flex items-center justify-start gap-2 pl-0 text-gray-700 dark:text-gray-400"
        >
            <IoIosArrowBack />
            {text}
        </Button>
    );
};
