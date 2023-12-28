
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Home from "@/components/home/Home";
import { redirect } from "next/navigation";

export default async function App() {
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  //   setUser(null);
  // };
  // if (!user) {
  //   return (
  //     redirect('/login', "push")

  //   );
  // }

  return (
    <main className="">

      <Home />
    </main>
  );
}
