"use client";

import React from "react";
import { Draggable } from "../../../Draggable/Draggable";
import { contents } from "@/core/content";
import { useSelector } from "react-redux";

function ContentSidebar() {
  const editor = useSelector((state) => state.editor.editor);
  return (
    <>
      {!editor ? (
        <div className="grid grid-cols-3 px-4 py-4 gap-3 bg-slate-50">
          {contents.map((item, index) => {
            return (
              <Draggable id={item.id} key={index}>
                <div className="col-span-1 shadow-md bg-white px-1 py-3 text-sm flex flex-col justify-center items-center gap-y-3 cursor-pointer hover:scale-110">
                  <div className="text-5xl">{item.icon}</div>{" "}
                  {item.id.toLocaleUpperCase()}
                </div>
              </Draggable>
            );
          })}
        </div>
      ) : (
        editor.editor
      )}
    </>
  );
}

export default ContentSidebar;
