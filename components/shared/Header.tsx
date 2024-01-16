'use client';

import React from 'react';
import Link from 'next/link';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { Button } from '../ui/button';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import Logo from './Logo';

const Header = () => {
  return (
    <header className='w-full border-b shadow-md shadow-slate-300'>
      <div className='wrapper flex items-center justify-between'>
        <Logo src='/assets/images/logo.svg' label={true} />
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
            <Button
              asChild
              className='rounded-full shadow-md shadow-slate-400 hover:bg-primary-600'
              size='lg'
              variant='default'
            >
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
