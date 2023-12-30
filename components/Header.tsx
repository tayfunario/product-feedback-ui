import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";

const sidebarVariants = {
  initial: {
    x: "70vw",
  },
  open: {
    x: "0vw",
  },
  closed: {
    x: "70vw",
  },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const toggleBtn = document.getElementById("toggle-btn");
    toggleBtn!.addEventListener("click", () => {
      setIsMenuOpen((isMenuOpen) => !isMenuOpen);
    });
  }, []);

  return (
    <div>
      <Image
        src="/background-mobile.png"
        width={500}
        height={500}
        alt="background"
      />
      <div className="absolute top-0 w-full h-[70px] flex justify-between items-center px-5 text-white text-[15px] font-bold">
        <div>
          <h2>Frontend Mentor</h2>
          <p className="font-normal text-[13px]">Feedback Board</p>
        </div>
        <GrClose id="toggle-btn" className="w-6 h-6 hover:cursor-pointer" />
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed w-full h-screen bg-black"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={sidebarVariants}
        initial="initial"
        animate={isMenuOpen ? "open" : "closed"}
        className="fixed right-0 h-screen w-72 bg-F7F p-5 z-30"
      >
        <div className="sidebar-box">
          <button className="sidebar-item">All</button>
          <button className="sidebar-item">UI</button>
          <button className="sidebar-item">UX</button>
          <button className="sidebar-item">Enhancement</button>
          <button className="sidebar-item">Bug</button>
          <button className="sidebar-item">Feature</button>
        </div>

        <div className="sidebar-box">
          <div className="flex justify-between items-baseline w-full">
            <h3 className="h3-bold text-3A4">Roadmap</h3>
            <Link
              href="/roadmap"
              className="body-3 text-466 underline underline-offset-2"
            >
              View
            </Link>
          </div>

          <ul className="mt-7 w-full">
            <li className="flex justify-between">
              <div className="flex items-center body-1 text-647">
                <GoDotFill className="text-F49 mr-2" />
                Planned
              </div>
              <span className="font-bold text-647">2</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center my-2 body-1 text-647">
                <GoDotFill className="text-AD1 mr-2" />
                In-Progress
              </div>
              <span className="font-bold text-647">3</span>
            </li>
            <li className="flex justify-between">
              <div className="flex items-center body-1 text-647">
                <GoDotFill className="text-62B mr-2" />
                Live
              </div>
              <span className="font-bold text-647">1</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
