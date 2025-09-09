'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, LoaderCircle, Settings } from 'lucide-react';

import FilterTag from '@/components/FilterTag';
import { FILTER_TABS, LinkTabData, textSizeMap } from '../utils/constants';
import { cn, fetchSearchResults } from '@/utils/utils';
import Toggle from '@/components/Toggle';
import LinkTab from '@/components/LinkTab';

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [filters, setFilters] = useState<Set<number>>(() => new Set([0, 1, 2]));
  const [allData, setAllData] = useState<LinkTabData[]>([]);
  const [results, setResults] = useState<LinkTabData[]>([]);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const inputName = 'searchInput';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
    setIsLoading(true);
    fetchSearchResults(search, 'All')
      .then((data) => {
        setIsLoading(false);
        setAllData(data);
        if (activeIndex != 0) {
          setResults(data.filter(({ filter }) => filter == FILTER_TABS[activeIndex]));
        } else {
          setResults(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (activeIndex == 0) setResults(allData);
    else setResults(allData.filter(({ filter }) => filter == FILTER_TABS[activeIndex]));
  }, [activeIndex]);

  return (
    <motion.div className="w-[60%] max-w-[750px] min-w-[550px] rounded-2xl bg-white drop-shadow-xl drop-shadow-neutral-500">
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
                setResults([]);
                setAllData([]);
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

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div className="select-none">
            {/* filters */}

            <motion.div className="relative mt-3 mb-3 flex w-full justify-between border-b-2 border-neutral-200 px-6 pb-2 text-neutral-500 select-none">
              <div className="flex-center gap-4">
                {FILTER_TABS.map((tab, index) => {
                  if (!filters.has(index)) return null;
                  return (
                    <motion.div
                      key={tab}
                      className="relative text-sm font-semibold"
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <FilterTag
                        className={index == activeIndex ? 'font-semibold text-neutral-800' : ''}
                        key={tab}
                        name={tab}
                        count={
                          tab === 'All'
                            ? allData.length
                            : tab === 'Files'
                              ? allData.filter(({ filter }) => filter == 'Files').length
                              : tab === 'People'
                                ? allData.filter(({ filter }) => filter == 'People').length
                                : 0
                        }
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
              <AnimatePresence mode="wait">
                {isSettingsOpen && (
                  <motion.div className="absolute top-9 right-6 z-10 flex w-2/5 flex-col content-between gap-3 rounded-md border border-neutral-200 bg-white px-4 py-2 drop-shadow-md drop-shadow-neutral-400">
                    {FILTER_TABS.map((tab, index) => {
                      if (index == 0) return;
                      return (
                        <motion.div
                          key={tab}
                          className="flex items-center justify-between"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{
                            delay: (index * 0.1) / FILTER_TABS.length,
                            duration: 0.1 / FILTER_TABS.length,
                            ease: 'easeOut',
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                              delay: ((FILTER_TABS.length - index) * 0.1) / FILTER_TABS.length,
                              duration: 0.1 / FILTER_TABS.length,
                              ease: 'easeOut',
                            },
                          }}
                        >
                          <FilterTag name={tab} count={-1} className={filters.has(index) ? 'text-neutral-800' : ''} />
                          <Toggle
                            isActive={filters.has(index)}
                            index={index}
                            onClick={(index: number, isOn: boolean) => {
                              const newFilters = new Set(filters);
                              if (isOn) {
                                newFilters.add(index);
                              } else {
                                newFilters.delete(index);
                              }
                              setFilters(newFilters);
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* results */}
            <div className="scroll-none max-h-[400px] w-full overflow-auto">
              <AnimatePresence mode="wait">
                {results.map((data, index) => {
                  return (
                    <motion.div key={index} className="px-6">
                      <LinkTab
                        keyword={search}
                        key={data.id}
                        {...data}
                        className={index !== results.length - 1 ? 'border-b border-neutral-200' : ''}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;
