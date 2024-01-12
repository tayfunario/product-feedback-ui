import { motion } from "framer-motion";
import { useEffect } from "react";

const divVariants = {
  initial: { scale: 0 },
  visible: { scale: 1, transition: { staggerChildren: 0.08 } },
  exit: { scale: 0 },
};

const btnVariants = {
  initial: { y: 20 },
  visible: { y: 0 },
};

export default function Dropdown({
  chosen,
  values,
  callback,
  isOpen,
  setIsOpen,
  targetElem = "#toggle-dropdown",
}: DropdownProps) {
  useEffect(() => {
    // if user clicks anywhere except #toggle-btn in the app, dropdown automatically closes
    document.addEventListener("click", (e) => {
      if (!(e.target as HTMLInputElement).closest(targetElem)) {
        setIsOpen(false);
      }
    });

    return () => {
      document.removeEventListener("click", (e) => {
        if (!(e.target as HTMLInputElement).closest(targetElem)) {
          setIsOpen(false);
        }
      });
    };
  }, []);

  return (
    <motion.div
      variants={divVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className={`${
        values.includes("Most Upvotes") ? "top-16" : "top-20"
      } absolute origin-top w-full bg-white text-black text-start divide-y-2 rounded-lg shadow-lg shadow-gray-400 z-50`}
    >
      {values.map((value) => (
        <motion.button
          key={value}
          variants={btnVariants}
          className="flex justify-between items-center md:text-base text-[13px] w-full text-647 p-3 hover:text-AD1"
          onClick={() => callback({ value })}
        >
          {value}
          {chosen === value && <img src="/icon-check.svg" alt="check" />}
        </motion.button>
      ))}
    </motion.div>
  );
}
