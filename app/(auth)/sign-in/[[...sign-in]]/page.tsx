import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <div className="w-full h-screen grid place-content-center">
    <SignIn />
  </div>;
}