"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaArrowsUpDownLeftRight } from "react-icons/fa6";

export function RowDragHandle(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: "#fff",
        zIndex: "10000",
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={props.style + " row-drag-handle"}
    >
      {props.children}
      <div
        className={
          "move-icon-content absolute bg-violet-700 text-white z-50 rounded-full px-2 py-2 top-1/4 -left-1 cursor-pointer" +
          (props.isShow ? "" : " hidden")
        }
        {...listeners}
      >
        <FaArrowsUpDownLeftRight className="text-lg" />
      </div>
    </div>
  );
}
