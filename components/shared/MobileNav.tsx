import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '../ui/separator';
import NavItems from './NavItems';
import Logo from './Logo';

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
            <Logo src='/assets/images/logo.svg' label={true} />
          </div>

          <Separator className='border border-slate-200' />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
