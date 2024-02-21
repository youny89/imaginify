import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error:unknown) => {
  if(error instanceof Error) {
    // native js error (e.g. TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === 'string') {
    // string error message
    console.error(error);
    throw new Error(`Error: ${error}`)
  } else {
    // unknow error
    console.error(error);
    throw new Error(`Unknow error : ${JSON.stringify(error)}`)
  }
}

export const responseJson = (data:any) => {
  return JSON.parse(JSON.stringify(data));
}
