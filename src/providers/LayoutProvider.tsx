'use client'
import { UserButton } from '@clerk/nextjs';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Router } from 'next/router';

function LayoutProvider({ children }: { children: React.ReactNode }) {
//const [isAdmin , setIsAdmin] = React.useState(false)
  const menusForAdmin = [
    {
      title : "Home",
      path : "/"
    },
    {
      title : "Events",
      path : "/admin/events"
    },
    {
      title : "Bookings",
      path : "/admin/bookings"
    },
    {
      title : "Users",
      path : "/admin/users"
    },
    {
      title : "Reports",
      path : "/admin/reports"
    },
  ];

  const menusForUser = [
    {
      title : "Home",
      path : "/",
    },
    {
      title : "Bookings",
      path : "/bookings",
    },
  ];

  const pathname = usePathname();
  //console.log("pathname", pathname);
  const router = useRouter();
const [menusToShow, setMenusToShow] = React.useState<any[]>([]);
const isPrivateRoute = !["/sign-in", "/sign-up"].includes(pathname);
const getUserData = async () => {
  try {
    const response = await axios.get("/api/current-user");
    if(response.data.user.isAdmin) {

        setMenusToShow(menusForAdmin);
        //setIsAdmin(true)
    }else{
      setMenusToShow(menusForUser);
    }
  } catch (error:any) {
    toast.error(error.message);
  }
};

useEffect(() => {
  if(isPrivateRoute) {
    getUserData();
  }
}, []);

{/*useEffect(() => {
  if(isAdmin && pathname.includes("/admin")) {
    router.push("/");
  }
}, [pathname]);*/}


  return (
  <div className='bg-gray-200 lg:px-20 px-5'>
    {isPrivateRoute && <div className='bg-white flex justify-between items-center shadow p-3 py-5'>
      <h1 className="font-semibold text-2xl cursor-pointer text-blue-800"
      onClick={() => router.push("/")}
      >Karibu events</h1>
      <div className='flex gap-5 items-center'>
      <Dropdown
      size="sm"
      >
      <DropdownTrigger>
        <Button 
          variant="flat" color='primary' size='sm'
        >
          profile
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        
        {menusToShow.map((menu) => (
          <DropdownItem 
            key={menu.title}
            onClick={() => {
              router.push(menu.path);
            }}
          >
            {menu.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>}
    <div className="py-3">
      {children}
    </div>
    
    </div>
    );
  
}

export default LayoutProvider