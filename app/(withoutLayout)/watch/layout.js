import Header from "@/components/layout/Header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async  function RootLayout({ children }) {

    const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user){
    console.log(user)
  }
  if (!user) {
    return (
      redirect('/login', "push")

    );
  }
  return (
    <>
      


   
     {children}
   
      </>

  );
}
