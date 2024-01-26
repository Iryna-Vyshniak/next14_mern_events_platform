import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import queryString from 'query-string';

import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";


// --------- styles ------------- 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// ------- handle error ---------
export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
}

// ------- file url -------------
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);


// ------ format date -----------
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric', // numeric year (e.g., '2023')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

// ------ format price -----------
export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}


// ------ form url -----------
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = queryString.parse(params)

  currentUrl[key] = value

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = queryString.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}