import { motion } from "framer-motion";

const divVariants = {
  initial: { scale: 0 },
  visible: { scale: 1, transition: { staggerChildren: 0.08 } },
  exit: { scale: 0 },
};

const btnVariants = {
  initial: { y: 20 },
  visible: { y: 0 },
};

export default function SortToggler({ sort, setSort }: SortProps) {
  return (
    <motion.div
      variants={divVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      id="toggle-div"
      className="absolute top-12 origin-top w-56 bg-white text-black text-start divide-y-2 rounded-lg shadow-lg shadow-gray-400"
    >
      <motion.button
        variants={btnVariants}
        className="flex justify-between items-center body-1 w-full text-647 p-3 hover:text-AD1"
        onClick={() => setSort("Most Upvotes")}
      >
        Most Upvotes
        {sort === "Most Upvotes" && <img src="/icon-check.svg" alt="check" />}
      </motion.button>
      <motion.button
        variants={btnVariants}
        className="flex justify-between items-center body-1 w-full text-647 p-3 hover:text-AD1"
        onClick={() => setSort("Least Upvotes")}
      >
        Least Upvotes
        {sort === "Least Upvotes" && <img src="/icon-check.svg" alt="check" />}
      </motion.button>
      <motion.button
        variants={btnVariants}
        className="flex justify-between items-center body-1 w-full text-647 p-3 hover:text-AD1"
        onClick={() => setSort("Most Comments")}
      >
        Most Comments
        {sort === "Most Comments" && <img src="/icon-check.svg" alt="check" />}
      </motion.button>
      <motion.button
        variants={btnVariants}
        className="flex justify-between items-center body-1 w-full text-647 p-3 hover:text-AD1"
        onClick={() => setSort("Least Comments")}
      >
        Least Comments
        {sort === "Least Comments" && <img src="/icon-check.svg" alt="check" />}
      </motion.button>
    </motion.div>
  );
}
