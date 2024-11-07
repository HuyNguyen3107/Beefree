"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { MdEmail } from "react-icons/md";

function TypeProject() {
  const pathname = usePathname();
  const type = pathname.split("/")[3];
  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <span className="flex items-center bg-indigo-300 px-1 py-1 gap-x-2 text-sm rounded-md">
      <MdEmail /> {typeCapitalized}
    </span>
  );
}

export default TypeProject;
