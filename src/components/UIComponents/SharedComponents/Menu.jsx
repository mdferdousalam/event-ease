import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Menu = ({ handleMenuItemClick }) => {
  const router = useRouter();
   const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);



  useEffect(() => {
    const role = localStorage.getItem("user_role");
    const token = localStorage.getItem("id_token");
    
    setUserRole(role);
    setToken(token);

  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    router.push("/");
  };

  const isActive = (path) => router.pathname === path;



  return (
    <>
      <NavigationMenu.Item>
        <NavigationMenu.Link asChild>
          <Link
            onClick={handleMenuItemClick}
            href="/"
            className={`text-[#0B233B] hover:text-[#0B233B] ${
              isActive("/")
                ? "bg-primary text-white px-2 py-1 rounded-full"
                : ""
            }`}
          >
           Home
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link asChild>
          <Link
            onClick={handleMenuItemClick}
            href="/events"
            className={`text-[#0B233B] hover:text-[#0B233B] ${
              isActive("/events")
                ? "bg-primary text-white px-2 py-1 rounded-full"
                : ""
            }`}
          >
          Events
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link asChild>
          <Link
            onClick={handleMenuItemClick}
            href="/My Events"
            className={`text-[#0B233B] hover:text-[#0B233B] ${
              isActive("/My Events")
                ? "bg-primary text-white px-2 py-1 rounded-full"
                : ""
            }`}
          >
          My Events
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

    
     

     
    
      <NavigationMenu.Item className="group lg:ms-10 lg:hidden block">
        <NavigationMenu.Link className="md:absolute max-w-full z-50">
          <ul className="text-[#0B233B] flex flex-col gap-4">
            {token ? (
              <>
                <li>
                  <Link
                    onClick={handleMenuItemClick}
                    href={
                      userRole === "admin"
                        ? "/admin/dashboard"
                        : userRole === "moderator"
                        ? "/moderator/dashboard"
                        : userRole === "normalUser"
                        ? "/user/dashboard"
                        
                        : "/"
                    }
                  >
                 Dashboard
                  </Link>
                </li>
                <li>
                  <button className="" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="bg-white md:hover:text-white md:hover:border-primary md:hover:bg-primary group md:shadow-2xl">
                  <Link
                    className="block w-full py-1.5 md:px-5 max-md:hover:bg-primary max-md:hover:text-white max-md:hover:px-4"
                    onClick={handleMenuItemClick}
                    href="/login"
                  >
                   Login
                  </Link>
                </li>
                <li className="bg-white md:hover:text-white md:hover:border-primary md:hover:bg-primary group md:shadow-2xl">
                  <Link
                    className="block w-full py-1.5 md:px-5 max-md:hover:bg-primary max-md:hover:text-white max-md:hover:px-4"
                    onClick={handleMenuItemClick}
                    href="/register"
                  >
                   Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </>
  );
};

export default Menu;