'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, LoaderCircle, Settings } from 'lucide-react';

import FilterTag from '@/components/FilterTag';
import { FILTER_TABS, textSizeMap } from '../utils/constants';
import { cn } from '@/utils/utils';

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [filters, setFilters] = useState<Set<number>>(() => new Set([0, 1, 2]));

  const [files, setFiles] = useState<boolean>(true);
  const [people, setPeople] = useState<boolean>(true);
  const [chats, setChats] = useState<boolean>(false);
  const [lists, setLists] = useState<boolean>(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const inputName = 'searchInput';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get(inputName);
    console.log(keyword);
    setIsOpen(true);
    setIsLoading(true);
  };

  return (
    <motion.div className="w-[50%] max-w-[550px] rounded-2xl bg-white drop-shadow-xl">
      {/* Search Input Header */}
      <motion.div className="w-full px-6 py-5">
        <div className="flex items-center justify-between text-neutral-600">
          {isLoading ? (
            <LoaderCircle
              size={textSizeMap['text-2xl'] || 16}
              className={cn('relative top-0.5 text-neutral-400', isLoading ? 'animate-spin' : '')}
            />
          ) : (
            <Search size={textSizeMap['text-2xl'] || 16} className="relative top-0.5 text-neutral-400" />
          )}
          <form className="grow" onSubmit={handleSubmit}>
            <input
              className="w-full border-none px-2 text-xl font-semibold outline-none"
              type="text"
              placeholder="Searching is easier"
              name={inputName}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {isOpen ? (
            <motion.span
              className="text-sm font-semibold underline underline-offset-2"
              onClick={() => {
                setSearch('');
                setIsOpen(false);
              }}
            >
              Clear
            </motion.span>
          ) : (
            <motion.div className="text-sm text-neutral-500">
              <span className="content-baseline rounded-lg border border-neutral-400 px-1.5 pt-0.5 pb-1 text-xs">
                S
              </span>
              <span className="pl-2">quick access</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {isOpen && (
        <motion.div>
          {/* filters */}

          <motion.div className="mt-3 mb-3 flex w-full justify-between border-b-2 border-neutral-200 px-6 pb-2 text-neutral-400 select-none">
            <div className="flex-center gap-4">
              {FILTER_TABS.map((tab, index) => {
                if (!filters.has(index)) return null;
                return (
                  <motion.div key={tab} className="relative text-sm">
                    <FilterTag
                      className={index == activeIndex ? 'font-semibold text-neutral-800' : ''}
                      key={tab}
                      name={tab}
                      count={tab === 'All' ? 9 : tab === 'Files' ? 6 : tab === 'People' ? 2 : tab === 'Chats' ? 1 : 0}
                      onClick={() => setActiveIndex(index)}
                    />
                    {index == activeIndex && (
                      <motion.div
                        layout
                        layoutId="underline"
                        className="absolute right-0 -bottom-2.5 left-0 h-0.5 bg-neutral-800"
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
            <div className="flex-center aspect-square">
              <motion.div
                animate={{ rotate: isSettingsOpen ? 45 : 0 }}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <Settings size={textSizeMap['text-xl']} />
              </motion.div>
            </div>
          </motion.div>

          {/* results */}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Page;
