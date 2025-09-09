'use client';

import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.div className="w-[60%] max-w-[650px] rounded-2xl bg-neutral-50 px-6 py-5 drop-shadow-lg">
      {/* Search Input Header */}
      <div className="text-neutral600 flex items-center justify-between">
        <Search className="relative top-0.5 text-neutral-400" />
        <input className="grow border-none pl-2 text-xl outline-none" type="text" placeholder="Searching is easier" />
        {isOpen ? (
          <motion.span className="text-sm underline underline-offset-2">Clear</motion.span>
        ) : (
          <motion.div className="text-sm text-neutral-500">
            <span className="content-baseline rounded-lg border border-neutral-400 px-1.5 pt-0.5 pb-1 text-xs">S</span>
            <span className="pl-2">quick access</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Page;
