'use client';

import { motion } from 'motion/react';
import { Paperclip, User, MessageCircle, AlignJustify } from 'lucide-react';
import { useRef } from 'react';
import { animate } from 'motion';
import { cn } from '@/utils/utils';
import { FILTER_TABS, textSizeMap } from '@/utils/constants';

const FilterTag = ({
  className = '',
  iconSize = 'text-lg',
  name,
  count = 0,
  onClick,
}: {
  className?: string;
  name: string;
  iconSize?: string;
  count?: number;
  onClick?: () => void;
}) => {
  const countRef = useRef<HTMLSpanElement | null>(null);

  return (
    <div
      className={cn('flex min-w-[60px] items-center', className)}
      onClick={() => {
        if (onClick) {
          onClick();
          if (count > 0) {
            animate(0, count, {
              duration: 0.5,
              delay: 0.2,
              ease: 'easeOut',
              onUpdate: (latest) => {
                if (countRef.current) {
                  countRef.current.innerHTML = '' + Math.round(latest);
                }
              },
            });
          }
        }
      }}
    >
      {name == FILTER_TABS[1] && <Paperclip size={textSizeMap[iconSize]} style={{ transform: 'rotate(180deg)' }} />}
      {name == FILTER_TABS[2] && <User size={textSizeMap[iconSize]} />}
      {name == FILTER_TABS[3] && <MessageCircle size={textSizeMap[iconSize]} />}
      {name == FILTER_TABS[4] && <AlignJustify size={textSizeMap[iconSize]} />}
      <span className="p-1">{name}</span>
      {count >= 0 && (
        <motion.span ref={countRef} className="rounded-md bg-neutral-100 px-1.5">
          {count}
        </motion.span>
      )}
    </div>
  );
};

export default FilterTag;
