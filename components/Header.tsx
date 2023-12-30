import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";

const sidebarVariants = {
  open: {
    clipPath: "circle(600px at 50% 40%)",
  },
  closed: {
    clipPath: "circle(0px at 250px 50px)",
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
            transition={{ duration: 0.1 }}
            className="fixed w-full h-screen bg-black"
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={sidebarVariants}
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
            <span className="body-3 text-466 underline underline-offset-2">
              View
            </span>
          </div>

          <ul className="mt-7">
            <li className="flex">
              <div className="flex items-center body-1 text-647">
                <GoDotFill className="text-F49 mr-2" />
                Planned
              </div>
            </li>
            <li className="flex">
              <div className="flex items-center my-2 body-1 text-647">
                <GoDotFill className="text-AD1 mr-2" />
                In-Progress
              </div>
            </li>
            <li className="flex">
              <div className="flex items-center body-1 text-647">
                <GoDotFill className="text-62B mr-2" />
                Live
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
