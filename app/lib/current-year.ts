export const CURRENT_YEAR = process.env.NEXT_PUBLIC_CURRENT_YEAR 
    ? parseInt(process.env.NEXT_PUBLIC_CURRENT_YEAR, 10) 
    : new Date().getFullYear();