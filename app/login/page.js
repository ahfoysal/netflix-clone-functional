"use client";

import { Button, Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isSigning , setIsSigning] = useState(true);
  const [isLoading , setIsLoading] = useState(false);

  const [err, setErr] = useState({
    email: null,
    password: null,
    message:  null,
    name: null,
  });
  const [user, setUser] = useState(null);

  const setInItValue = () =>{
    setErr(
      {
        email: null,
        password: null,
        message:  null,
        name: null,
      }
    )
  }
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSignUp = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    if (!email || !password || !name) return setErr({ email: !email && "Email is required", password: !password && "Password is required", name: !name && "Name is required" });

    const {data, error} = await supabase.auth.signUp({

      email,
      password,

      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          name: name,

        }
      },
    });
    if(data.user){
      setUser(data.user);
      router.refresh();
      console.log(data);
      setIsLoading(false)
      setEmail("");
      setPassword("");
     }
     if(error){
      console.log(error.message)
      setIsLoading(false)
      setErr({message: error.message})
     }
;
  };

  const handleSignIn = async (e) => {
    setIsLoading(true)
    e.preventDefault(); 
    if (!email || !password) return setErr({ email: !email && "Email is required", password: !password && "Password is required" });


    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
   if(data.user){
    setUser(data.user);
    setIsLoading(false)
    router.refresh();
    setEmail("");
    setPassword("");
   }
   if(error){
    console.log(error.message)
    setErr({message: error.message})
    setIsLoading(false)
   }
  };
  const toggle = ()=>{
    setInItValue()
    setIsSigning(!isSigning)
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    router.push("/");
  }

  return (
    <main className="h-screen relative flex items-center justify-center z-10 p-6">
      <Image 
      src={'/login.jpg'}
      alt="login banner"
      className="absolute -z-10 opacity-50"
      fill={true}
      />
      <div className=" bg-dark-transparent px-16 py-16 w-[450px] rounded-md shadow-md ">
    <form onSubmit={isSigning ? handleSignIn : handleSignUp} >
    <div className="flex flex-col gap-4" >
      {isSigning ? <h1 className="text-3xl font-bold mb-4">Sign In</h1>:
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
 

      }
 {!isSigning &&       <Input
          type="text"
          name="name"
          radius="sm"
          value={name}
          onChange={(e) =>{setInItValue() 
            setName(e.target.value)}}
          label="Name"
          className="w-full"
          isInvalid={err.name ? true : false}
         errorMessage={err.name}
        />}
        <Input
          type="email"
          name="email"
          radius="sm"
          value={email}
          onChange={(e) => {
            setInItValue() 
            setEmail(e.target.value)}}
          label="Email"
          className="w-full"
          isInvalid={err.email ? true : false}
         errorMessage={err.email}
        />
        <Input
          type="password"
          name="password"
          radius="sm"
          required={true}
          value={password}
          onChange={(e) => {
            setInItValue() 
            setPassword(e.target.value)}}
          isInvalid={err.password ? true : false}
          errorMessage={err.password}
          label="Password"
          className="w-full mb-4"
        />
                

           <Button
       
       type="submit"
       size="lg"
       
       isLoading={isLoading}
       color="danger"
       className=" text-white font-medium"
     >
{isSigning ?        "Sign In" : "Sign Up"}
     </Button>
   {err.message &&  <h1 className="text-sm font-bold mb-4 text-danger text-center">{err.message}</h1>}
   {isSigning ?   <p className="text-[#737373]">New to PewdsFlix? <span className="hover:underline text-white" onClick={toggle}>Sign up now.</span></p>:
   <p className="text-[#737373]">Already have a account? <span className="hover:underline text-white" onClick={toggle}>Sign In now.</span></p>
   }
      </div>
        {/* <button
          onClick={handleSignUp}
          className="w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </button> */}
     
    </form>
      </div>
    </main>
  );
}
