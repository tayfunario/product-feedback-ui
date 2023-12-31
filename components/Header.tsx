import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";

const sidebarVariants = {
  initial: {
    x: "80vw",
  },
  open: {
    x: "0vw",
  },
  closed: {
    x: "80vw",
  },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // closes sidebar when user clicks outside of it
    document.addEventListener("click", (e) => {
      if (
        !(e.target as HTMLInputElement).closest("#sidebar") &&
        !(e.target as HTMLInputElement).closest("#sidebar-btn")
      ) {
        setIsMenuOpen(false);
      }
    });
  }, []);

  return (
    <header>
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

        {isMenuOpen ? (
          <button id="sidebar-btn">
            <img
              src="/icon-close.svg"
              alt="close"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </button>
        ) : (
          <button id="sidebar-btn">
            <img
              src="/icon-hamburger.svg"
              alt="hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed w-full h-screen bg-black z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={sidebarVariants}
        initial="initial"
        animate={isMenuOpen ? "open" : "closed"}
        id="sidebar"
        className="fixed right-0 h-screen w-72 bg-F7F p-5 z-50"
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
    </header>
  );
}
