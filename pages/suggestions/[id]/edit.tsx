import Layout from "../../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Dropdown from "../../../components/Dropdown";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Edit({
  data: { category, description, id, status, title, upvotes },
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [chosenCategory, setChosenCategory] = useState<{ value: string }>({
    value: category.charAt(0).toUpperCase() + category.slice(1),
  });
  const [chosenStatus, setChosenStatus] = useState<{ value: string }>({
    value: status.charAt(0).toUpperCase() + status.slice(1),
  });
  const [width, setWidth] = useState<number>(0);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

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
    const res = await fetch("https://product-feedback-tayfunetta.onrender.com/suggestions/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title: titleRef.current!.value,
        category: chosenCategory.value.toLowerCase(),
        status: chosenStatus.value.toLowerCase(),
        description: descriptionRef.current!.value,
      }),
    });

    router.push(`/suggestions`);
  };

  const deleteSuggestion = async () => {
    const res = await fetch("https://product-feedback-tayfunetta.onrender.com/suggestions/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    router.push("/suggestions");
  };

  return (
    <Layout>
      <div className="max-w-xl sm:mx-auto mx-5 pt-6 pb-14">
        <Link
          href={"/suggestions/" + id}
          className="flex justify-between items-center md:w-[72px] w-16 text-647 bold-13"
        >
          <img src="/icon-arrow-left.svg" alt="arrow-left" />
          Go back
        </Link>
        <div className="relative bg-white rounded-lg mt-16 px-7 pb-5">
          <img
            src="/icon-edit-feedback.svg"
            alt="edit-feedback"
            className="relative bottom-5 w-10"
          />
          <h2
            className={`${width < 768 ? "h3-bold" : "h1-bold"} text-3A4 pb-5`}
          >
            Editing '{title}'
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
                defaultValue={title}
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
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex justify-between items-center w-full mt-2 p-3 text-start md:text-[15px] text-[13px] bg-F7F text-3A4 rounded-lg border focus:border-466"
              >
                {chosenCategory.value}
                {isCategoryOpen ? (
                  <FaAngleUp className="text-466" />
                ) : (
                  <FaAngleDown className="text-466" />
                )}
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <Dropdown
                    chosen={chosenCategory.value}
                    values={["Feature", "UI", "UX", "Enhancement", "Bug"]}
                    callback={setChosenCategory}
                    isOpen={isCategoryOpen}
                    setIsOpen={setIsCategoryOpen}
                  />
                )}
              </AnimatePresence>
            </fieldset>

            <fieldset className="relative mt-6">
              <legend className="bold-13 text-3A4">Update Status</legend>
              <p className="md:text-sm text-[13px] text-647">
                Change feature state
              </p>
              <button
                id="toggle-dropdown2"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="flex justify-between items-center w-full mt-2 p-3 text-start md:text-[15px] text-[13px] bg-F7F text-3A4 rounded-lg border focus:border-466"
              >
                {chosenStatus.value}
                {isStatusOpen ? (
                  <FaAngleUp className="text-466" />
                ) : (
                  <FaAngleDown className="text-466" />
                )}
              </button>

              <AnimatePresence>
                {isStatusOpen && (
                  <Dropdown
                    chosen={chosenStatus.value}
                    values={["Suggestion", "Planned", "In-Progress", "Live"]}
                    callback={setChosenStatus}
                    isOpen={isStatusOpen}
                    setIsOpen={setIsStatusOpen}
                    targetElem="#toggle-dropdown2"
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
                defaultValue={description}
                onChange={(e) => resetInputStyle(e.target)}
              />
              <p className="invisible md:text-xs text-[10px] mt-[-7px] text-[#D73737]">
                Can't be empty
              </p>
            </fieldset>

            {width < 768 ? (
              <>
                <button
                  className="button-1 w-full mt-6"
                  onClick={() => checkInputs()}
                >
                  Save Changes
                </button>
                <Link
                  href="/suggestions"
                  className="button-3 block text-center mt-3"
                >
                  Cancel
                </Link>
                <button
                  className="button-4 w-full mt-3"
                  onClick={() => deleteSuggestion()}
                >
                  Delete
                </button>
              </>
            ) : (
              <div className="flex justify-between">
                <button
                  className="button-4 w-24"
                  onClick={() => deleteSuggestion()}
                >
                  Delete
                </button>

                <div className="flex gap-x-2">
                  <Link
                    href="/suggestions"
                    className="button-3 w-24 text-center"
                  >
                    Cancel
                  </Link>

                  <button
                    className="button-1 w-36"
                    onClick={() => checkInputs()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://product-feedback-tayfunetta.onrender.com/suggestions");
  const data = await res.json();

  const paths = data.map((suggestion) => ({
    params: { id: suggestion.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://product-feedback-tayfunetta.onrender.com/suggestions/${params.id}/edit`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
