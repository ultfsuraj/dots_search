'use client';

import { textSizeMap } from '@/utils/constants';
import { cn } from '@/utils/utils';
import { ClipboardMinus, Link, SquareArrowOutUpRight, Image as LucideImage, Youtube, Music, Check } from 'lucide-react';
import Image from 'next/image';
import { memo, useState } from 'react';

export type LinkTabData = {
  keyword?: string;
  filter: 'Files' | 'People' | 'Chats' | 'Lists' | 'All';
  heading: string;
  subheading: string[];
  href: string;
  icon: string;
  status?: 'active' | 'inactive' | 'warning';
};

const LinkTab = ({
  keyword = '***',
  filter,
  heading,
  subheading,
  href,
  icon,
  status,
  className = '',
}: Partial<LinkTabData> & { className?: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div className={cn('group flex h-16 w-full items-center justify-between py-3', className)}>
      <div className="flex items-center gap-3">
        <div className={cn('relative aspect-square w-10 rounded-md', !icon ? 'bg-neutral-100' : '')}>
          {icon?.includes('http') ? (
            <Image
              height={30}
              width={30}
              src={icon}
              alt={heading || 'icon'}
              className="h-full w-full rounded-md object-cover"
            />
          ) : icon == 'text' ? (
            <div className="flex-center h-full w-full rounded-md bg-neutral-100">
              <ClipboardMinus size={textSizeMap['text-xl'] || 16} />
            </div>
          ) : icon == 'image' ? (
            <div className="flex-center h-full w-full rounded-md bg-neutral-100">
              <LucideImage size={textSizeMap['text-xl'] || 16} />
            </div>
          ) : icon == 'video' ? (
            <div className="flex-center h-full w-full rounded-md bg-neutral-100">
              <Youtube size={textSizeMap['text-xl'] || 16} />
            </div>
          ) : icon == 'audio' ? (
            <div className="flex-center h-full w-full rounded-md bg-neutral-100">
              <Music size={textSizeMap['text-xl'] || 16} />
            </div>
          ) : null}

          {status && (
            <div
              className={cn(
                'absolute right-0 bottom-0 h-2 w-2 rounded-full bg-black outline-2 outline-white',
                status == 'active' ? 'bg-green-600' : status == 'warning' ? 'bg-amber-600' : 'bg-red-600'
              )}
            />
          )}
        </div>
        <div className="flex flex-col gap-0.5 font-semibold">
          <span
            className={cn(
              'text-sm font-medium text-neutral-800',
              !heading ? 'mb-1 h-2 w-28 rounded-sm bg-neutral-100' : ''
            )}
          >
            {keyword.length == 0 && <span className="m-0 p-0">{heading}</span>}
            {keyword.length &&
              heading?.split(new RegExp(`(${keyword.toLowerCase()})`, 'ig')).map((text, index) => (
                <span key={index} className={cn('m-0 p-0', text.toLowerCase() == keyword ? 'bg-amber-100' : '')}>
                  {text}
                </span>
              ))}
          </span>
          <span
            className={cn('text-xs text-neutral-400', !subheading?.length ? 'h-2 w-50 rounded-sm bg-neutral-100' : '')}
          >
            {subheading?.map((txt, index) => (
              <span key={index}>
                {txt}
                {index != subheading.length - 1 && (
                  <span className="mx-1 inline-block h-1 w-1 rounded-full bg-neutral-300" />
                )}
              </span>
            ))}
          </span>
        </div>
      </div>
      {heading && (
        <div className="relative hidden items-center gap-3 font-semibold group-hover:flex">
          <Link
            onClick={() => {
              setCopied(true);
              const timer = setTimeout(() => {
                setCopied(false);
                clearTimeout(timer);
              }, 500);
            }}
            size={textSizeMap['text-sm'] || 16}
            className="text-neutral-400"
          />
          <p
            className={cn(
              'absolute bottom-5 -left-8 z-10 flex items-center gap-0.5 rounded-sm bg-black px-1 py-0.5 text-[0.7rem] text-neutral-100',
              copied ? 'flex' : 'hidden'
            )}
          >
            <Check size={textSizeMap['text-sm'] || 16} />
            <span> Link copied! </span>
          </p>
          <a
            className="flex cursor-none items-center gap-1 text-xs text-neutral-400"
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

export default memo(LinkTab);
