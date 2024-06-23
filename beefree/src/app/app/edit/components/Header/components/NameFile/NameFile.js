"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const { updateProjectName } = builderSlice.actions;

function NameFile() {
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.builder.projectInfo);
  const [isEditing, setIsEditing] = useState(false);
  const projectType = projectInfo.type === "email" ? "New Email" : "New Page";
  const [name, setName] = useState(
    projectInfo.name ? projectInfo.name : projectType
  );

  return (
    <>
      {!isEditing ? (
        <div
          className="cursor-pointer px-2 py-1 hover:bg-violet-200 rounded-md"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {name}
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
              dispatch(
                updateProjectName({
                  name: name,
                })
              );
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

export default NameFile;
