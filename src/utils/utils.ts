import { FILTER_DATA, LinkTabData } from '@/utils/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchSearchResults(keyword: string, type: 'All' | 'Files' | 'People' | 'Chats' | 'Lists') {
  let data: LinkTabData[] = [];
  if (type == 'All') {
    data = FILTER_DATA;
  } else {
    data = FILTER_DATA.filter((data) => data.filter == type);
  }

  await new Promise((resolve) => {
    setTimeout(() => resolve(''), 1500);
  });

  return data.filter(({ heading }) => heading.toLowerCase().includes(keyword.toLowerCase()));
}
