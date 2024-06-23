"use client";

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPen } from "react-icons/fa";

function SubDomain() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("xucp2h3cor");

  return (
    <>
      {!isEditing ? (
        <div
          className="cursor-pointer px-2 py-1 hover:bg-violet-200 rounded-md flex gap-x-1 items-center"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {name} <FaPen className="text-[14px]" />
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <input
            type="text"
            defaultValue={name}
            className="border-1 border-violet-500 px-2 py-1"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div
            className="bg-violet-600 text-white text-[16px] px-1 py-1 rounded-md cursor-pointer"
            onClick={() => {
              setName(name);
              setIsEditing(false);
            }}
          >
            <FaCheck />
          </div>
          <div
            className="bg-gray-500 text-white text-[16px] px-1 py-1 rounded-md cursor-pointer"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </>
  );
}

export default SubDomain;
