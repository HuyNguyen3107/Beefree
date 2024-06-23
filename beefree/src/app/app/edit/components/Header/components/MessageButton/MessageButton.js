"use client";

import React from "react";
import { MdOutlineMessage } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { chatSlice } from "@/redux/slice/chatSlice";
const { updateChatStatus } = chatSlice.actions;

function MessageButton() {
  const dispatch = useDispatch();
  const chatStatus = useSelector((state) => state.chat.chatStatus);
  return (
    <div
      className={
        "hover:bg-violet-200 px-2 py-2 rounded-md cursor-pointer" +
        (chatStatus ? " bg-violet-300" : "")
      }
      onClick={() => {
        dispatch(updateChatStatus(!chatStatus));
      }}
    >
      <MdOutlineMessage />
    </div>
  );
}

export default MessageButton;
