import { socialsFooter } from '@/constants';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className='px-4 py-8 bg-slate-50 dark:bg-gray-800 dark:text-gray-400 text-base shadow-inner shadow-slate-300 border-t'>
      <div className='container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0'>
        <div className='flex flex-row pr-3 space-x-4 sm:space-x-8'>
          <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400'>
            <Logo src='/assets/icons/logo-grey.svg' label={false} />
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
          {socialsFooter.map(({ rel, href, label }, idx) => (
            <li key={label + idx}>
              <a
                rel={rel}
                href={href}
                className='text-sm hover:text-primary-500 focus:text-primary-500 drop-shadow-[1px_1px_0.5px_rgba(250,250,250,1)]'
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
