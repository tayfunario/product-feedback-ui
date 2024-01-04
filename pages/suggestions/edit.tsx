import Layout from "../../components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Dropdown from "../../components/Dropdown";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Edit() {
  return (
    <Layout>
      <div className="mx-7 pt-8 pb-14">
        <Link
          href="/suggestions"
          className="flex justify-between items-center w-16 text-647 bold-13"
        >
          <img src="/icon-arrow-left.svg" alt="arrow-left" />
          Go back
        </Link>
        <div className="relative bg-white rounded-lg mt-16 px-5 pt1 pb-5">
          <img
            src="/icon-edit-feedback.svg"
            alt="edit-feedback"
            className="relative bottom-5 w-10"
          />
          <h2 className="h3-bold text-3A4 pb-5">Edit Feedback</h2>
          <form onSubmit={(e) => e.preventDefault()}></form>
        </div>
      </div>
    </Layout>
  );
}
