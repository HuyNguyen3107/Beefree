"use client";

import React from "react";
import { FaRegFileCode } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { previewSlice } from "@/redux/slice/previewSlice";
const { setPreviewStatus } = previewSlice.actions;

function PreviewButton() {
  const dispatch = useDispatch();
  const previewStatus = useSelector((state) => state.preview.previewStatus);
  return (
    <>
      <div
        className={
          "hover:bg-violet-200 px-2 py-2 rounded-md cursor-pointer" +
          (previewStatus ? " bg-violet-300" : "")
        }
        onClick={() => dispatch(setPreviewStatus(!previewStatus))}
      >
        <FaRegFileCode />{" "}
      </div>
    </>
  );
}

export default PreviewButton;
