import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";

const sidebarVariants = {
  initial: {
    x: "90vw",
  },
  open: {
    x: "0vw",
  },
  closed: {
    x: "90vw",
  },
};

export default function Header({
  chosenCategory,
  setChosenCategory,
}: {
  chosenCategory: string;
  setChosenCategory: (value: { value: string }) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [roadmapItems, setRoadmapItems] = useState<SuggestionProps[]>([]);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    // closes sidebar when user clicks outside of it
    document.addEventListener("click", (e) => {
      if (
        !(e.target as HTMLInputElement).closest("#sidebar") &&
        !(e.target as HTMLInputElement).closest("#sidebar-btn")
      ) {
        setIsMenuOpen(false);
      }
    });

    fetchRoadmapItems();
  }, []);

  // prevents scrolling when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const fetchRoadmapItems = async () => {
    const res = await fetch(
      "https://product-feedback-tayfunetta.onrender.com/roadmap"
    );
    const data = await res.json();
    setRoadmapItems(data);
  };

  if (width < 768) {
    return (
      <header>
        <div
          id="header-top"
          className="flex justify-between items-center h-20 px-5 text-white text-[15px] font-bold"
        >
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
              className="fixed top-0 w-full h-screen bg-black z-40"
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
            <button
              onClick={() => setChosenCategory({ value: "all" })}
              className={`sidebar-item ${
                chosenCategory === "all"
                  ? "bg-466 text-white"
                  : "bg-F2F text-466 hover:bg-CFD"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setChosenCategory({ value: "ui" })}
              className={`sidebar-item ${
                chosenCategory === "ui"
                  ? "bg-466 text-white"
                  : "bg-F2F text-466 hover:bg-CFD"
              }`}
            >
              UI
            </button>
            <button
              onClick={() => setChosenCategory({ value: "ux" })}
              className={`sidebar-item ${
                chosenCategory === "ux"
                  ? "bg-466 text-white"
                  : "bg-F2F text-466 hover:bg-CFD"
              }`}
            >
              UX
            </button>
            <button
              onClick={() => setChosenCategory({ value: "enhancement" })}
              className={`sidebar-item ${
                chosenCategory === "enhancement"
                  ? "bg-466 text-white"
                  : "bg-F2F text-466 hover:bg-CFD"
              }`}
            >
              Enhancement
            </button>
            <button
              onClick={() => setChosenCategory({ value: "bug" })}
              className={`sidebar-item ${
                chosenCategory === "bug"
                  ? "bg-466 text-white"
                  : "bg-F2F text-466 hover:bg-CFD"
              }`}
            >
              Bug
            </button>
            <button
              onClick={() => setChosenCategory({ value: "feature" })}
              className={`sidebar-item ${
                chosenCategory === "feature"
                  ? "bg-466 text-white"
                  : "bg-F2F text-466 hover:bg-CFD"
              }`}
            >
              Feature
            </button>
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
                <span className="font-bold text-647">
                  {
                    roadmapItems.filter((item) => item.status === "planned")
                      .length
                  }
                </span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center my-2 body-1 text-647">
                  <GoDotFill className="text-AD1 mr-2" />
                  In-Progress
                </div>
                <span className="font-bold text-647">
                  {
                    roadmapItems.filter((item) => item.status === "in-progress")
                      .length
                  }
                </span>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center body-1 text-647">
                  <GoDotFill className="text-62B mr-2" />
                  Live
                </div>
                <span className="font-bold text-647">
                  {roadmapItems.filter((item) => item.status === "live").length}
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </header>
    );
  } else if (width < 1024) {
    return (
      <header className="flex gap-x-3">
        <div className="relative basis-1/3 flex items-end mb-6 text-white text-[15px] font-bold rounded-lg overflow-hidden">
          <img
            src="/background-tablet.png"
            className="absolute w-full h-full"
          />
          <div className="m-3 z-50">
            <h2 className="text-xl">Frontend Mentor</h2>
            <p className="font-normal body-2 opacity-75">Feedback Board</p>
          </div>
        </div>

        <div className="sidebar-box basis-1/3">
          <button
            onClick={() => setChosenCategory({ value: "all" })}
            className={`sidebar-item ${
              chosenCategory === "all"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setChosenCategory({ value: "ui" })}
            className={`sidebar-item ${
              chosenCategory === "ui"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            UI
          </button>
          <button
            onClick={() => setChosenCategory({ value: "ux" })}
            className={`sidebar-item ${
              chosenCategory === "ux"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            UX
          </button>
          <button
            onClick={() => setChosenCategory({ value: "enhancement" })}
            className={`sidebar-item ${
              chosenCategory === "enhancement"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            Enhancement
          </button>
          <button
            onClick={() => setChosenCategory({ value: "bug" })}
            className={`sidebar-item ${
              chosenCategory === "bug"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            Bug
          </button>
          <button
            onClick={() => setChosenCategory({ value: "feature" })}
            className={`sidebar-item ${
              chosenCategory === "feature"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            Feature
          </button>
        </div>

        <div className="sidebar-box basis-1/3">
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
              <span className="font-bold text-647">
                {
                  roadmapItems.filter((item) => item.status === "planned")
                    .length
                }
              </span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center my-2 body-1 text-647">
                <GoDotFill className="text-AD1 mr-2" />
                In-Progress
              </div>
              <span className="font-bold text-647">
                {
                  roadmapItems.filter((item) => item.status === "in-progress")
                    .length
                }
              </span>
            </li>
            <li className="flex justify-between">
              <div className="flex items-center body-1 text-647">
                <GoDotFill className="text-62B mr-2" />
                Live
              </div>
              <span className="font-bold text-647">
                {roadmapItems.filter((item) => item.status === "live").length}
              </span>
            </li>
          </ul>
        </div>
      </header>
    );
  } else {
    return (
      <aside className="col-span-2">
        <div className="relative flex items-end mb-6 h-40 text-white font-bold rounded-lg overflow-hidden">
          <img
            src="/background-desktop.png"
            className="absolute w-full h-full"
          />
          <div className="m-5 z-50">
            <h2 className="text-xl">Frontend Mentor</h2>
            <p className="font-normal body-2 opacity-75">Feedback Board</p>
          </div>
        </div>

        <div className="sidebar-box">
          <button
            onClick={() => setChosenCategory({ value: "all" })}
            className={`sidebar-item ${
              chosenCategory === "all"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setChosenCategory({ value: "ui" })}
            className={`sidebar-item ${
              chosenCategory === "ui"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            UI
          </button>
          <button
            onClick={() => setChosenCategory({ value: "ux" })}
            className={`sidebar-item ${
              chosenCategory === "ux"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            UX
          </button>
          <button
            onClick={() => setChosenCategory({ value: "enhancement" })}
            className={`sidebar-item ${
              chosenCategory === "enhancement"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            Enhancement
          </button>
          <button
            onClick={() => setChosenCategory({ value: "bug" })}
            className={`sidebar-item ${
              chosenCategory === "bug"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            Bug
          </button>
          <button
            onClick={() => setChosenCategory({ value: "feature" })}
            className={`sidebar-item ${
              chosenCategory === "feature"
                ? "bg-466 text-white"
                : "bg-F2F text-466 hover:bg-CFD"
            }`}
          >
            Feature
          </button>
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
              <span className="font-bold text-647">
                {
                  roadmapItems.filter((item) => item.status === "planned")
                    .length
                }
              </span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center my-2 body-1 text-647">
                <GoDotFill className="text-AD1 mr-2" />
                In-Progress
              </div>
              <span className="font-bold text-647">
                {
                  roadmapItems.filter((item) => item.status === "in-progress")
                    .length
                }
              </span>
            </li>
            <li className="flex justify-between">
              <div className="flex items-center body-1 text-647">
                <GoDotFill className="text-62B mr-2" />
                Live
              </div>
              <span className="font-bold text-647">
                {roadmapItems.filter((item) => item.status === "live").length}
              </span>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}
