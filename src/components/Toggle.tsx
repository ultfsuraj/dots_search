'use client';

import { cn } from '@/utils/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

const Toggle = ({
  className = '',
  isActive,
  index,
  onClick,
}: {
  className?: string;
  isActive: boolean;
  index: number;
  onClick?: (x: number, y: boolean) => void;
}) => {
  const [isOn, setIsOn] = useState(isActive);

  return (
    <div
      className={cn(
        'flex h-3.5 w-6 items-center rounded-full px-0.5',
        isOn ? 'justify-end bg-black' : 'justify-start bg-neutral-300',
        className
      )}
      onClick={() => {
        setIsOn(!isOn);
        if (onClick) onClick(index, !isOn);
      }}
    >
      <motion.div
        className="h-2.5 w-2.5 justify-self-end rounded-full bg-white"
        layout
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
};

export default Toggle;
