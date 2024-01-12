import { TiPlus } from "react-icons/ti";
import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Top({ numOfSuggestions, sort, setSort }: TopProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  if (width < 768) {
    return (
      <div className="flex justify-between items-center bg-373 text-F2F px-4 text-[13px]">
        <div className="relative py-5">
          <span>Sort by:</span>
          <button
            id="toggle-dropdown"
            className="font-bold ml-2"
            onClick={() => setOpen(!open)}
          >
            {sort}
            {open ? (
              <img
                src="/icon-arrow-up.svg"
                alt="arrow down"
                className="inline-block ml-2"
              />
            ) : (
              <img
                src="/icon-arrow-down.svg"
                alt="arrow down"
                className="inline-block ml-2"
              />
            )}
          </button>

          <AnimatePresence>
            {open && (
              <Dropdown
                chosen={sort}
                values={[
                  "Most Upvotes",
                  "Least Upvotes",
                  "Most Comments",
                  "Least Comments",
                ]}
                callback={setSort}
                isOpen={open}
                setIsOpen={setOpen}
              />
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/new"
          className="button-1 flex justify-center items-center my-2"
        >
          <TiPlus className="mr-1" />
          Add Feedback
        </Link>
      </div>
    );
  } else if (width < 1024) {
    return (
      <div className="flex justify-between items-center bg-373 text-F2F px-4 text-[13px] rounded-lg">
        <div className="flex items-center gap-x-5">
          <img src="/icon-suggestions.svg" alt="suggestions" />
          <span className="h3-bold">{numOfSuggestions} Suggestions</span>

          <div className="relative ml-7 py-5">
            <span>Sort by:</span>
            <button
              id="toggle-dropdown"
              className="font-bold ml-2"
              onClick={() => setOpen(!open)}
            >
              {sort}
              {open ? (
                <img
                  src="/icon-arrow-up.svg"
                  alt="arrow down"
                  className="inline-block ml-2"
                />
              ) : (
                <img
                  src="/icon-arrow-down.svg"
                  alt="arrow down"
                  className="inline-block ml-2"
                />
              )}
            </button>

            <AnimatePresence>
              {open && (
                <Dropdown
                  chosen={sort}
                  values={[
                    "Most Upvotes",
                    "Least Upvotes",
                    "Most Comments",
                    "Least Comments",
                  ]}
                  callback={setSort}
                  isOpen={open}
                  setIsOpen={setOpen}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <Link
          href="/new"
          className="button-1 flex justify-center items-center my-2"
        >
          <TiPlus className="mr-1" />
          Add Feedback
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center bg-373 text-F2F px-4 text-[13px] rounded-lg">
        <div className="flex items-center gap-x-5">
          <img src="/icon-suggestions.svg" alt="suggestions" />
          <span className="h3-bold">{numOfSuggestions} Suggestions</span>

          <div className="relative ml-7 py-5">
            <span>Sort by:</span>
            <button
              id="toggle-dropdown"
              className="font-bold ml-2"
              onClick={() => setOpen(!open)}
            >
              {sort}
              {open ? (
                <img
                  src="/icon-arrow-up.svg"
                  alt="arrow down"
                  className="inline-block ml-2"
                />
              ) : (
                <img
                  src="/icon-arrow-down.svg"
                  alt="arrow down"
                  className="inline-block ml-2"
                />
              )}
            </button>

            <AnimatePresence>
              {open && (
                <Dropdown
                  chosen={sort}
                  values={[
                    "Most Upvotes",
                    "Least Upvotes",
                    "Most Comments",
                    "Least Comments",
                  ]}
                  callback={setSort}
                  isOpen={open}
                  setIsOpen={setOpen}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <Link
          href="/new"
          className="button-1 flex justify-center items-center my-2"
        >
          <TiPlus className="mr-1" />
          Add Feedback
        </Link>
      </div>
    );
  }
}
