"use client";

import React from "react";
import { BsLaptopFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import { projectSlice } from "@/redux/slice/projectSlice";
const { addNewProject } = projectSlice.actions;

function CreateNewPage() {
  const dispatch = useDispatch();
  let pathname = usePathname();
  const router = useRouter();
  const handleAddPage = () => {
    const id = uuidv4();
    const type = "Page";
    dispatch(addNewProject({ id, type }));
    pathname = pathname.slice(0, pathname.lastIndexOf("/"));
    router.push(`${pathname}/edit/page/${id}`);
  };
  return (
    <div
      className="flex items-center gap-x-2 cursor-pointer border-1 px-2 py-2"
      onClick={() => {
        handleAddPage();
      }}
    >
      <div>
        <BsLaptopFill className="text-3xl text-violet-600" />
      </div>
      <div>
        <span className="text-xl font-bold">Create a new page</span>
        <p className="text-sm opacity-75">
          Design a beautiful page, host it on Beefree, or use it on your
          website. Start with a template or from a blank canvas.
        </p>
      </div>
    </div>
  );
}

export default CreateNewPage;
