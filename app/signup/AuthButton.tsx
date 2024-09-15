import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";

interface AuthButtonProps {
    onClick: () => void;
    icon: IconType;
    text: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ onClick, icon: Icon, text }) => {
    return (
        <Button
            variant="outline"
            type="button"
            className="w-full bg-transparent dark:bg-transparent border-gray-600 py-6"
            onClick={onClick}
        >
            <Icon className="mr-2 h-5 w-5" />
            {text}
        </Button>
    );
};
