/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useCallback } from 'react';

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from '@uploadthing/react/hooks';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { convertFileToUrl } from '@/lib/utils';
import { Button } from '../ui/button';
import Image from 'next/image';

type FileUploadProps = {
  onFieldChange: (value: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({ onFieldChange, imageUrl, setFiles }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className='flex-center flex flex-col h-72 bg-dark-3 bg-slate-100 overflow-hidden rounded-xl cursor-pointer'
    >
      <input {...getInputProps()} className='cursor-pointer' />
      {imageUrl ? (
        <div className='flex flex-1 justify-center w-full h-full'>
          <Image
            src={imageUrl}
            alt='image'
            width={250}
            height={250}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex-center flex-col py-5 text-slate-500'>
          <Image src='/assets/icons/upload.svg' alt='file upload' width={77} height={77} />
          <h3 className='mb-2 mt-2'>Drag photo here</h3>
          <p className='p-medium-12 mb-4'>SVG, PNG, JPG</p>
          <Button
            type='button'
            className='rounded-full hover:bg-blue-600 focus:bg-blue-600 shadow-md shadow-slate-400'
            variant='secondary'
          >
            Select from your device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
