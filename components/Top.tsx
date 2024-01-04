import { TiPlus } from "react-icons/ti";
import Toggle from "./Toggle";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function Top({ sort, setSort }: TopProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // closes toggler when user clicks outside of it
    document.addEventListener("click", (e) => {
      if (
        !(e.target as HTMLInputElement).closest("#toggle-div") &&
        !(e.target as HTMLInputElement).closest("#toggle-btn")
      ) {
        setOpen(false);
      }
    });
  }, []);

  return (
    <div className="flex justify-between items-center bg-373 text-F2F px-4 text-[13px]">
      <div className="relative">
        <span>Sort by:</span>
        <button
          id="toggle-btn"
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
            <Toggle
              chosen={sort}
              values={[
                "Most Upvotes",
                "Least Upvotes",
                "Most Comments",
                "Least Comments",
              ]}
              callback={setSort}
            />
          )}
        </AnimatePresence>
      </div>

      <button className="button-1 flex justify-center items-center my-2">
        <TiPlus className="mr-1" />
        Add Feedback
      </button>
    </div>
  );
}
