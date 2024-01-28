'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { getAllCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    })();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if (category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <div className='flex-center px-4 py-2  min-h-[54px] w-full bg-slate-100 rounded-full overflow-hidden'>
        {' '}
        <SelectTrigger className='select-field'>
          <SelectValue placeholder='Category' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='All' className='select-item p-regular-14'>
            All{' '}
          </SelectItem>
          {categories.length > 0 &&
            categories.map(({ name, _id }) => (
              <SelectItem key={_id} value={name} className='select-item p-regular-14'>
                {name}
              </SelectItem>
            ))}
        </SelectContent>
      </div>
    </Select>
  );
};

export default CategoryFilter;
