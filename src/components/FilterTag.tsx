'use client';

import { motion, motionValue } from 'motion/react';
import { Paperclip, User, MessageCircle, AlignJustify } from 'lucide-react';
import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (count > 0) {
      animate(0, count, {
        duration: 0.5,
        ease: 'easeOut',
        onUpdate: (latest) => {
          if (countRef.current) {
            countRef.current.innerHTML = '' + Math.round(latest);
          }
        },
      });
    }
  }, []);

  return (
    <div
      className={cn('flex items-center', className)}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {name == FILTER_TABS[1] && <Paperclip size={textSizeMap[iconSize]} style={{ transform: 'rotate(180deg)' }} />}
      {name == FILTER_TABS[2] && <User size={textSizeMap[iconSize]} />}
      {name == FILTER_TABS[3] && <MessageCircle size={textSizeMap[iconSize]} />}
      {name == FILTER_TABS[4] && <AlignJustify size={textSizeMap[iconSize]} />}
      <span className="px-1">{name}</span>
      {count >= 0 && (
        <motion.span ref={countRef} className="rounded-md bg-neutral-100 px-1.5">
          {count}
        </motion.span>
      )}
    </div>
  );
};

export default FilterTag;
