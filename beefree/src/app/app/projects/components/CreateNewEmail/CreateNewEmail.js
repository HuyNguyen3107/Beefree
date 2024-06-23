"use client";

import React from "react";
import { MdEmail } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import { projectSlice } from "@/redux/slice/projectSlice";
const { addNewProject } = projectSlice.actions;

function CreateNewEmail() {
  const dispatch = useDispatch();
  let pathname = usePathname();
  const router = useRouter();
  const handleAddEmail = () => {
    const id = uuidv4();
    const type = "Email";
    dispatch(addNewProject({ id, type }));
    pathname = pathname.slice(0, pathname.lastIndexOf("/"));
    router.push(`${pathname}/edit/email/${id}`);
  };
  return (
    <div
      className="flex items-center gap-x-2 cursor-pointer border-1 px-2 py-2"
      onClick={() => {
        handleAddEmail();
      }}
    >
      <div>
        <MdEmail className="text-3xl text-violet-600" />
      </div>
      <div>
        <span className="text-xl font-bold">Create a new email</span>
        <p className="text-sm opacity-75">
          Design a perfect email and use it anywhere. Browse the catalog, use
          your own saved templates, or start from scratch.
        </p>
      </div>
    </div>
  );
}

export default CreateNewEmail;
