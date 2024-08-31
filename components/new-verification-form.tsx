"use client";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "./Card-wrapper";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { newVerification } from "@/Actions/new-verification";
import { useRouter } from "next/navigation";




export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log("token",token)
  const onsubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        console.log(success);
        console.log("data", data);
        if(!data.success) setError(data.error);
        console.log("error", error);
      })
      .catch((e) => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onsubmit();
  }, [onsubmit]);

  useEffect(()=>{
    if(success){
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [success]);

  return (
    <CardWrapper
      headerLabel="Verifying your email..."
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}
        { success &&
          <FormSuccess message={success} />
        }
        {error && !success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}