import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Label from '../ui/label';

const Logo = ({ src, label }: { src: string; label: boolean }) => {
  return (
    <Link href='/' className='flex-center gap-2 w-38'>
      <Image src={src} alt='Eventify logo' width={38} height={38} quality={100} />
      {label && <Label />}
    </Link>
  );
};

export default Logo;
