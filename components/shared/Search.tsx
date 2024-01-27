'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
  const [query, setQuery] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let newUrl = '';

    const delayDebounceFn = setTimeout(() => {
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className='flex-center px-4 py-2  min-h-[54px] w-full bg-slate-100 rounded-full overflow-hidden'>
      <Image src='/assets/icons/search.svg' alt='search' width={24} height={24} />
      <Input
        type='search'
        placeholder={placeholder}
        onChange={({ target }) => setQuery(target.value)}
        className='input-field placeholder:text-slate-500'
      />
    </div>
  );
};

export default Search;
