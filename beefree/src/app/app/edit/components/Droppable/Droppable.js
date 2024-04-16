"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green !important" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={props?.style ? props.style : ""}
    >
      {props.children}
    </div>
  );
}
