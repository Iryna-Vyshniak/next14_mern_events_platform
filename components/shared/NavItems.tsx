'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { headerLinks } from '@/constants';

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className='md:flex-between flex flex-col items-start gap-5 md:flex-row w-full '>
      {headerLinks.map(({ id, label, route }) => {
        const isActive = pathname == route;
        return (
          <li
            key={id}
            className={`${
              isActive && 'text-primary-500'
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={route}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
