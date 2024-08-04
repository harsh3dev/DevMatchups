import { NewVerificationForm } from "@/components/new-verification-form";
import { Suspense } from "react";



export default function NewVerification() {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
}