'use client';

import { textSizeMap } from '@/utils/constants';
import { cn } from '@/utils/utils';
import { Link, SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';

export type LinkTabData = {
  filter: 'Files' | 'People' | 'Chats' | 'Lists';
  heading: string;
  subheading: string[];
  href: string;
  icon: string;
  status?: 'active' | 'inactive' | 'warning';
};

const LinkTab = ({
  filter,
  heading,
  subheading,
  href,
  icon,
  status,
  className = '',
}: Partial<LinkTabData> & { className?: string }) => {
  return (
    <div className={cn('flex w-full items-center justify-between py-3', className)}>
      <div className="flex items-center gap-3">
        <div className={cn('aspect-square w-10 rounded-md', !icon ? 'bg-neutral-100' : '')}>
          {icon ? (
            <Image
              height={30}
              width={30}
              src={icon}
              alt={heading || 'icon'}
              className="h-full w-full rounded-md object-cover"
            />
          ) : null}
          {status && <div />}
        </div>
        <div className="flex flex-col gap-0.5 font-semibold">
          <span
            className={cn('text-sm font-medium text-neutral-800', !heading ? 'h-2 w-28 rounded-sm bg-neutral-100' : '')}
          >
            {heading || ''}
          </span>
          <span className={cn('text-xs text-neutral-400', !subheading ? 'h-2 w-50 rounded-sm bg-neutral-100' : '')}>
            {subheading ? subheading.join(' • ') : ''}
          </span>
        </div>
      </div>
      {filter && (
        <div className="flex items-center gap-3 font-semibold">
          <Link size={textSizeMap['text-sm'] || 16} className="text-neutral-400" />
          <a
            className="flex items-center gap-1 text-xs text-neutral-400"
            href={icon || href}
            target="_blank"
            rel="noreferrer"
          >
            <SquareArrowOutUpRight size={textSizeMap['text-sm'] || 16} className="text-neutral-400" />
            New Tab
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkTab;
