"use client";
import { useState, useEffect } from 'react';
import { Navbar, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Divider } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Icons } from '../assets/Icons';
import { useRouter } from 'next/navigation';
import Search from '../Search/Search';

const Header = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
 
    try{
      await supabase.auth.signOut();
    }catch(err){
      console.log(err)
    }
    router.refresh();
  };
  // useEffect(() => {
  //   async function getUser() {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //    console.log(user)
  //   }

  //   getUser();
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <Navbar
      position="sticky"
      maxWidth="xl"
      className={`fixed ${isScrolled ? 'bg-dark-header' : 'bg-transparent'} blur-none backdrop-blur-none backdrop-saturate-100`}
    >
      <button onClick={()=> router.replace('/')}>
        <Icons.netflix className="h-[90px] w-[100px] text-danger" />
      </button>

      <NavbarContent className="ml-5 font-bold hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Search />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              radius="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" className="w-full p-0 flex justify-center flex-col items-center" variant="flat">
            <DropdownItem key="account">Account</DropdownItem>
            <DropdownItem key="divider">
              <Divider />
            </DropdownItem>
            <DropdownItem onPress={handleLogout} key="logout" className="text-center">
              Sign out of Netflix
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
