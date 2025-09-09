'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Search, LoaderCircle, Settings } from 'lucide-react';

import FilterTag from '@/components/FilterTag';
import { FILTER_TABS, LinkTabData, textSizeMap } from '../utils/constants';
import { cn, fetchSearchResults } from '@/utils/utils';
import Toggle from '@/components/Toggle';
import LinkTab from '@/components/LinkTab';

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [filters, setFilters] = useState<Set<number>>(() => new Set([0, 1, 2]));
  const [results, setResults] = useState<Record<'All' | 'Files' | 'People' | 'Chats' | 'Lists', LinkTabData[]>>([]);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const inputName = 'searchInput';
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getEmptyResults = (start: number, n: number) => {
    const results: LinkTabData[] = [];
    for (let i = start; i < start + n; i++) {
      results.push({
        id: i,
        filter: FILTER_TABS[activeIndex],
        heading: '',
        subheading: [],
        icon: '',
        href: '',
      });
    }
    return results;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
    setIsLoading(true);

    setResults({
      All: getEmptyResults(0, 6),
      Chats: getEmptyResults(0, 6),
      Files: getEmptyResults(0, 6),
      Lists: getEmptyResults(0, 6),
      People: getEmptyResults(0, 6),
    });

    fetchSearchResults(inputRef.current?.value || '', FILTER_TABS[0])
      .then((data) => {
        setIsLoading(false);
        const temp: typeof results = {
          All: data,
          Chats: getEmptyResults(0, 6),
          Files: data.filter(({ filter }) => filter == 'Files'),
          Lists: getEmptyResults(0, 6),
          People: data.filter(({ filter }) => filter == 'People'),
        };
        if (temp.People.length < 6) {
          temp.People = [...temp.People, ...getEmptyResults(temp.People.length, 6 - temp.People.length)];
        }
        if (temp.All.length < 6) {
          temp.All = [...temp.All, ...getEmptyResults(temp.All.length, 6 - temp.All.length)];
        }
        if (temp.Files.length < 6) {
          temp.Files = [...temp.Files, ...getEmptyResults(temp.Files.length, 6 - temp.Files.length)];
        }
        setResults(temp);
      })
      .catch((e) => {
        setIsLoading(false);
        console.error(e);
      });
  };

  useEffect(() => {
    if (!isOpen) {
      setResults({
        All: [],
        Chats: [],
        Files: [],
        Lists: [],
        People: [],
      });
    }
  }, [isOpen]);

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
              ref={inputRef}
              className="w-full border-none px-2 text-xl font-semibold outline-none"
              type="text"
              placeholder="Searching is easier"
              name={inputName}
            />
          </form>
          {isOpen ? (
            <motion.span
              className="text-sm font-semibold underline underline-offset-2"
              onClick={() => {
                if (inputRef.current) inputRef.current.value = '';
                setIsOpen(false);
                setIsSettingsOpen(false);
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
          <motion.div
            className="overflow-hidden select-none"
            exit={{ height: 0, transition: { duration: 0.5, delay: 0.3, ease: 'easeOut' } }}
          >
            <LayoutGroup id="filters">
              {/* filters */}

              <motion.div
                layout
                className="relative mt-3 mb-3 flex w-full justify-between border-b-2 border-neutral-200 px-6 pb-2 text-neutral-500 select-none"
              >
                {results && (
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
                                ? results.All.filter((data) => data.heading).length
                                : tab === 'Files'
                                  ? results.Files.filter((data) => data.heading).length
                                  : tab === 'People'
                                    ? results.People.filter((data) => data.heading).length
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
                )}
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
                    <motion.div
                      layout
                      className="absolute top-9 right-6 z-10 flex w-2/5 flex-col content-between gap-3 rounded-md border border-neutral-200 bg-white px-4 py-2 drop-shadow-md drop-shadow-neutral-400"
                    >
                      {FILTER_TABS.map((tab, index) => {
                        if (index == 0) return;
                        return (
                          <motion.div
                            key={tab}
                            className="flex items-center justify-between"
                            layout
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

              <motion.div
                layout
                className="scroll-none max-h-[400px] w-full overflow-auto"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {results[FILTER_TABS[activeIndex]].map((data, index) => {
                  return (
                    <div key={index} className="px-6">
                      <LinkTab
                        keyword={inputRef?.current?.value}
                        key={data.id}
                        {...data}
                        className={
                          index !== results[FILTER_TABS[activeIndex]].length - 1 ? 'border-b border-neutral-200' : ''
                        }
                      />
                    </div>
                  );
                })}
              </motion.div>
            </LayoutGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;
