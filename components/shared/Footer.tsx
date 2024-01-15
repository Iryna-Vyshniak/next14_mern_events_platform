import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/public/assets/icons/logo-grey.svg';

const Footer = () => {
  return (
    <footer className='px-4 py-8 bg-slate-50 dark:bg-gray-800 dark:text-gray-400 text-base shadow-inner shadow-slate-300 border-t'>
      <div className='container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0'>
        <div className='flex flex-row pr-3 space-x-4 sm:space-x-8'>
          <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400'>
            <Link href='/' className='flex-center w-38'>
              <Image src={Logo} alt='Eventify logo' width={38} height={38} quality={100} />
            </Link>
          </div>
          <ul className='flex flex-wrap items-center space-x-4 sm:space-x-8'>
            <li>
              <a rel='noopener noreferrer' href='#' className='text-sm'>
                Terms of Use
              </a>
            </li>
            <li>
              <a rel='noopener noreferrer' href='#' className='text-sm'>
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <ul className='flex flex-wrap pl-3 space-x-4 sm:space-x-8'>
          <li>
            <a rel='noopener noreferrer' href='#' className='text-sm'>
              Instagram
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' href='#' className='text-sm'>
              Facebook
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' href='#' className='text-sm'>
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
