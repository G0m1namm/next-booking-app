import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  if (isNaN(price)) return price;
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
