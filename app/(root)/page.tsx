import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';
import Hero from '@/components/shared/Hero';
import Search from '@/components/shared/Search';
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamsProps } from '@/types';

export default async function Home({ searchParams }: SearchParamsProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({ query: searchText, category, page, limit: 6 });

  return (
    <>
      <Hero />
      <section id='events' className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <h2 className='h2-bold drop-shadow-[1px_1px_1px_rgba(250,250,250,1)]'>
          Confidence Crafted through <br />
          Myriad Events
        </h2>
        <div className='flex flex-col gap-5 md:flex-row w-full'>
          <Search placeholder='Search title...' />
          <CategoryFilter />
        </div>
        <Collection
          data={events?.data}
          emptyTitle='No events found'
          emptyStateSubtext='Come back later'
          collectionType='All_Events'
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
