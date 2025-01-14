
import {MenuIcon, X} from 'lucide-react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Menu from './Menu';


const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState (false);
  const router = useRouter ();

  const handleClick = () => {
    setIsOpen (prev => !prev);
    document.body.classList.toggle ('overflow-y-hidden');
  };

  const handleMenuItemClick = () => {
    setIsOpen (false);
  };

  useEffect (
    () => {
      const handleRouteChange = () => {
        setIsOpen (false);
        document.body.classList.remove ('overflow-y-hidden');
      };
      router.events.on ('routeChangeStart', handleRouteChange);
      return () => {
        router.events.off ('routeChangeStart', handleRouteChange);
      };
    },
    [router]
  );

  return (
    <div className="bg-white border-b-2 py-6">
      <div className=" flex items-center justify-between container mx-auto px-6">
        <Link
          href={'/'}
          onClick={handleMenuItemClick}
          className="flex items-center gap-x-3 lg:gap-x-6 hover:text-current "
        >
         <p>EventEasy</p>
        </Link>
        <button className="lg:hidden" onClick={handleClick}>
          <span className="sr-only">Open Menu</span>
          <MenuIcon size={35} />
        </button>
        <div
          className={`${isOpen ? 'max-lg:scale-100 z-10' : 'max-lg:scale-0'} max-lg:absolute inset-0 lg:flex items-center bg-white max-lg:overflow-y-auto max-lg:px-8 max-lg:py-6 max-lg:shadow-md max-lg:border transition-transform duration-200 origin-top-right max-sm:overflow-y-auto`}
        >
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Link
              href={'/'}
              onClick={handleMenuItemClick}
              className="flex items-center gap-x-3 lg:gap-x-6 hover:text-current"
            >
                <p>EventEasy</p>
            </Link>

            <button
              onClick={handleClick}
              className="text-3xl text-right hover:opacity-95"
            >
              <span className="sr-only">Close menu</span>
              <X />
            </button>
          </div>

          <NavigationMenu.Root>
            <NavigationMenu.List className="flex  max-lg:flex-col max-lg:gap-y-6 lg:text-base font-medium lg:items-center max-lg:relative lg:justify-center gap-x-4 ">
              <Menu handleMenuItemClick={handleMenuItemClick} />
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
