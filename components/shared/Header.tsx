import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/public/assets/images/logo.svg';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import NavItems from './NavItems';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className='w-full border-b shadow-md shadow-slate-300'>
      <div className='wrapper flex items-center justify-between'>
        <Link href='/' className='flex-center w-36'>
          <Image src={Logo} alt='Eventify logo' width={38} height={38} quality={100} />
          <p className='text-base font-bold text-primary-500 drop-shadow-[1px_1px_0.5px_rgba(0,0,0,0.7)] tracking-widest'>
            EVENT<span className='text-white font-bold'>IFY</span>
          </p>
        </Link>
        <SignedIn>
          <nav className='md:flex-between hidden w-full max-w-xs'>
            <NavItems />
          </nav>
        </SignedIn>
        <div className='flex w-32 justify-end gap-3'>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-full shadow-md shadow-slate-400' size='lg'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
