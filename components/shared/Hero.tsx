import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

import HeroPoster from '../../public/assets/images/hero.jpg';

const Hero = () => {
  return (
    <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10'>
      <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
        <div className='flex flex-col justify-center gap-8'>
          <h1 className='h1-bold'>Discover, Connect, Thrive: Your Events, Our Hub!</h1>
          <p className='p-regular-20 md:p-regular-24'>
            Explore and gain valuable insights from 3,168+ mentors across top-notch organizations
            through our expansive global community.
          </p>
          <Button size='lg' asChild className='button w-full sm:w-fit'>
            <Link href='#events'>Explore Now</Link>
          </Button>
        </div>
        <Image
          src={HeroPoster}
          alt='hero'
          width={1000}
          height={1000}
          placeholder='blur'
          className='max-h-[70vh] object-cover object-center 2xl:max-h-[50vh]'
        />
      </div>
    </section>
  );
};

export default Hero;
