import Hero from '@/components/shared/Hero';
import { SearchParamsProps } from '@/types';

export default function Home({ searchParams }: SearchParamsProps) {
  return (
    <>
      <Hero />
      <section id='events' className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <h2 className='h2-bold drop-shadow-[1px_1px_1px_rgba(250,250,250,1)]'>
          Confidence Crafted through <br />
          Myriad Events
        </h2>
        <div className='flex flex-col gap-5 md:flex-row w-full'>Search CategoryFilter</div>
      </section>
    </>
  );
}
