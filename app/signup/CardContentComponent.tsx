import { AuthButton } from "./AuthButton";
import { Separator } from "@/components/ui/separator";
import { IoMailOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
interface CardContentProps {
    onClick: (provider: "github" | "google") => void;  
    toggleEmailSignup: () => void;
}

export const CardContentComponent: React.FC<CardContentProps> = ({ onClick, toggleEmailSignup }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-rows-2 gap-2">
                <AuthButton
                    onClick={() => onClick("github")}
                    icon={FaGithub}
                    text="Sign up with GitHub"
                />
                <AuthButton
                    onClick={() => onClick("google")}
                    icon={FcGoogle}
                    text="Continue with Google"
                />
                <div className="flex items-center space-x-2">
                    <Separator className="flex-1" />
                    <p className="text-sm font-medium text-gray-400">or</p>
                    <Separator className="flex-1" />
                </div>
                <AuthButton
                    onClick={toggleEmailSignup}
                    icon={IoMailOutline}
                    text="Continue using Email"
                />
            </div>
        </div>
    );
};
