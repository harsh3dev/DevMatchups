"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactOtpInput from "react-otp-input";
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/store/hooks";
import { toast } from "@/components/ui/use-toast";



export default function VerifyForm() {
  const router = useRouter();
  const signupdata=useAppSelector(state => state.auth.signupData);
  const [otp, setOtp] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  
  useEffect(()=>{
    function showError(){
      if(signupError.length){
        toast({
          title: `${signupError}`,
        })
      }
    }
  },[])
  
  const onSubmit = async (e:any) => {
    e.preventDefault();
    const data={...signupdata,otp:otp};
    console.log(data);
    try {
      const response = await axios.post("/api/users/signup",{data});
      console.log("response", response);
      if(response.status==201){
         router.push('/signup/onboarding');

      }
    } 
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error message:', error?.response?.data?.message || error?.message);
        setSignupError(error?.response?.data?.message || error?.message)
      } else {
        console.log("Unexpected Error", error);
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">      
      <form onSubmit={onSubmit} className="w-full grid place-items-center h-[80vh]">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Verify Email</CardTitle>
            <CardDescription>OTP is sent to your Email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <ReactOtpInput
                value={otp}
                onChange={(otp) => setOtp(otp)}
                numInputs={6}
                shouldAutoFocus
                renderInput={(props: any) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-black rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
            </div>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
