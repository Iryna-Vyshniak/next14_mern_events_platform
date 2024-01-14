import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '../ui/separator';
import NavItems from './NavItems';

const MobileNav = () => {
  return (
    <nav className='md:hidden'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <Image
            src='/assets/icons/menu.svg'
            alt='menu'
            width={24}
            height={24}
            className='cursor-pointer'
          />
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
          <div className='flex items-center justify-start gap-3'>
            <Image src='/assets/images/logo.svg' alt='logo' width={38} height={38} />
            <p className='text-base font-bold text-primary-500 drop-shadow-[1px_1px_0.5px_rgba(0,0,0,0.7)] tracking-widest'>
              EVENT<span className='text-white font-bold'>IFY</span>
            </p>
          </div>

          <Separator className='border border-slate-200' />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
