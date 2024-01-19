import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


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