import Layout from "../components/Layout";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Dropdown from "../components/Dropdown";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function New() {
  const [category, setCategory] = useState<{ value: string }>({
    value: "Feature",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  // Checks if inputs are empty on submit
  const checkInputs = () => {
    let isInputEmpty = false;
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      if ((input as HTMLInputElement).value === "") {
        isInputEmpty = true;
        input.classList.add("border-red-500");
        input.classList.remove("border-transparent");
        input.nextElementSibling!.classList.remove("invisible");
      }
    });

    if (!isInputEmpty) {
      sendToServer();
    }
  };

  // Resets input style on change
  const resetInputStyle = (elem: HTMLElement) => {
    elem.classList.remove("border-red-500");
    elem.nextElementSibling!.classList.add("invisible");
  };

  const sendToServer = async () => {
    const res = await fetch("http://localhost:4000/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current!.value,
        category: category.value.toLowerCase(),
        upvotes: 0,
        status: "suggestion",
        description: descriptionRef.current!.value,
      }),
    });
  };

  return (
    <Layout>
      <div className="max-w-xl sm:mx-auto mx-5 pt-6 pb-14">
        <Link
          href="/suggestions"
          className="flex justify-between items-center md:w-[72px] w-16 text-647 bold-13"
        >
          <img src="/icon-arrow-left.svg" alt="arrow-left" />
          Go back
        </Link>

        <div className="relative bg-white rounded-lg mt-16 px-5 pt1 pb-5">
          <img
            src="/icon-new-feedback.svg"
            alt="new-feedback"
            className="relative bottom-5 w-10"
          />
          <h2
            className={`${width < 768 ? "h3-bold" : "h1-bold"} text-3A4 pb-5`}
          >
            Create New Feedback
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="bold-13 text-3A4">Feedback Title</legend>
              <p className="md:text-[14px] text-[13px] text-647">
                Add a short, descriptive headline
              </p>
              <input
                ref={titleRef}
                type="text"
                className="w-full mt-2 p-3 text-[13px] md:text-[15px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
                maxLength={60}
                onChange={(e) => resetInputStyle(e.target)}
              />
              <p className="invisible md:text-xs text-[10px] text-[#D73737]">
                Can't be empty
              </p>
            </fieldset>

            <fieldset className="relative mt-6">
              <legend className="bold-13 text-3A4">Category</legend>
              <p className="md:text-sm text-[13px] text-647">
                Choose a category for your feedback
              </p>
              <button
                id="toggle-dropdown"
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                  isOpen ? "border-466" : "border-transparent"
                } w-full flex justify-between items-center mt-2 p-3 text-start md:text-[15px] text-[13px] bg-F7F text-3A4 rounded-lg border`}
              >
                {category.value}
                {isOpen ? (
                  <FaAngleUp className="text-466" />
                ) : (
                  <FaAngleDown className="text-466" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <Dropdown
                    chosen={category.value}
                    values={["Feature", "UI", "UX", "Enhancement", "Bug"]}
                    callback={setCategory}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                )}
              </AnimatePresence>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="bold-13 text-3A4">Feedback Detail</legend>
              <p className="md:text-sm text-[13px] text-647">
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea
                ref={descriptionRef}
                className="w-full mt-2 px-3 py-2 md:text-[15px] text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
                rows={4}
                maxLength={250}
                onChange={(e) => resetInputStyle(e.target)}
              />
              <p className="invisible md:text-xs text-[10px] mt-[-7px] text-[#D73737]">
                Can't be empty
              </p>
            </fieldset>

            {width < 768 ? (
              <div>
                <button
                  className="button-1 w-full mt-6"
                  onClick={() => checkInputs()}
                >
                  Add Feedback
                </button>
                <Link
                  href="/suggestions"
                  className="button-3 block text-center mt-3"
                >
                  Cancel
                </Link>
              </div>
            ) : (
              <div className="flex justify-end items-center gap-x-4">
                <Link href="/suggestions" className="button-3 w-32 text-center">
                  Cancel
                </Link>
                <button className="button-1 w-40" onClick={() => checkInputs()}>
                  Add Feedback
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}
