'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import Image from 'next/image';

import 'react-datepicker/dist/react-datepicker.css';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { eventFormSchema } from '@/lib/validator';
import { eventDefaultValues } from '@/constants';

import Dropdown from './Dropdown';
import FileUploader from './FileUploader';
import { useUploadThing } from '@/lib/uploadthing';
import { createEvent } from '@/lib/actions/event.actions';

type EventFormProps = {
  userId: string;
  type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState(new Date());

  const initialValues = eventDefaultValues;
  const { startUpload } = useUploadThing('imageUploader');
  const router = useRouter();

  // 1. Define form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    let uploadImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadImages = await startUpload(files);

      if (!uploadImages) return;

      uploadImageUrl = uploadImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadImageUrl },
          userId,
          path: '/profile',
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='ml-3 whitespace-nowrap text-slate-900'>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Event title' {...field} className='input-field' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='ml-3 whitespace-nowrap text-slate-900'>Category</FormLabel>
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='ml-3 whitespace-nowrap text-slate-900'>Description</FormLabel>
                <FormControl className='h-72'>
                  <Textarea
                    placeholder='Event description'
                    {...field}
                    className='textarea rounded-2xl'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='ml-3 whitespace-nowrap text-slate-900'>Photo</FormLabel>
                <FormControl className='h-72'>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='ml-3 whitespace-nowrap text-slate-900'>Location</FormLabel>
                <FormControl>
                  <div className='relative flex-center px-4 py-2 h-[54px] w-full rounded-full overflow-hidden bg-slate-100'>
                    <Image
                      src='/assets/icons/location-grey.svg'
                      alt='location'
                      width={24}
                      height={24}
                      className='mr-3'
                    />
                    <Input
                      placeholder='Event location or Online'
                      {...field}
                      className='input-field'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex items-end justify-center flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='startDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='ml-3 whitespace-nowrap text-slate-900'>Date</FormLabel>
                <FormControl>
                  <div className='flex-center px-4 py-2 h-[54px] w-full rounded-full overflow-hidden bg-slate-100'>
                    <Image
                      src='/assets/icons/calendar.svg'
                      alt='location'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-3 mr-3 whitespace-nowrap text-slate-500'>Start Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat='dd/MM/yyyy h:mm aa'
                      wrapperClassName='datePicker input-field'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center px-4 py-2 h-[54px] w-full rounded-full overflow-hidden bg-slate-100'>
                    <Image
                      src='/assets/icons/calendar.svg'
                      alt='location'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-3 mr-6 whitespace-nowrap text-slate-500'>End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat='dd/MM/yyyy h:mm aa'
                      wrapperClassName='datePicker input-field'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center justify-center flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='ml-3 whitespace-nowrap text-slate-900'>Price</FormLabel>
                <FormControl>
                  <div className='relative flex-center px-4 py-2 h-[54px] w-full rounded-full overflow-hidden bg-slate-100'>
                    <Image
                      src='/assets/icons/dollar.svg'
                      alt='dollar'
                      width={24}
                      height={24}
                      className='mr-3'
                    />
                    <Input
                      type='number'
                      placeholder='Event price'
                      {...field}
                      className='p-regular-16 border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 input-field'
                    />
                    <FormField
                      control={form.control}
                      name='isFree'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className='flex items-center px-4 py-2 h-[54px] w-full rounded-full overflow-hidden bg-slate-100'>
                              <FormLabel
                                htmlFor='isFree'
                                className='pr-3 whitespace-nowrap text-slate-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                              >
                                Free Ticket
                              </FormLabel>
                              <Checkbox
                                id='isFree'
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                className='mr-2 h-5 w-5 border-2 border-primary-500'
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='ml-3 whitespace-nowrap text-slate-900'>Link</FormLabel>
                <FormControl>
                  <div className='relative flex-center px-4 py-2 h-[54px] w-full rounded-full overflow-hidden bg-slate-100'>
                    <Image
                      src='/assets/icons/link.svg'
                      alt='location'
                      width={24}
                      height={24}
                      className='mr-3'
                    />
                    <Input placeholder='URL' {...field} className='input-field' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className={`button col-span-2 w-full shadow-md shadow-slate-400 hover:bg-primary-600 ${
            form.formState.isSubmitting ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
