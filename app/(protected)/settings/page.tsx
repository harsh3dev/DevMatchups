import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";


 const page=async() =>{
    const session = await auth();
    return(
    <div>{JSON.stringify(session)}
    <form action={async ()=>{
      "use server"
      await signOut();
    }}>
    <Button>Logout</Button>
    </form>
    </div>
    )
}

export default page;