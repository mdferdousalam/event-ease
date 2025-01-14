"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Navbar = () => {
    const router = useRouter();
    const [session, setSession] = useState(null);
    const signOut = async () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        localStorage.removeItem('id_token');
        router.push('/login');
    }

    
    useEffect(() => {
        const sessionExist = {
            user: `${localStorage.getItem('user_id')}`,
        }
       setSession(sessionExist);
    }, [])

  return (
    <div className="navbar bg-base-100  mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/about">Available Events</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          EventEase
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/about">Available Events</Link>
          </li>
          <li>
            <Link href="/support">Support</Link>
          </li>
          <li>
            <Link href="/dashboard">My Events</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {session ? (
          <button
            onClick={() => signOut()}
            className="btn btn-error btn-outline text-white rounded-full px-5"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="btn btn-accent btn-outline text-white rounded-full px-5"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;