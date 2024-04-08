"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Droppable } from "../Droppable/Droppable";
import { Draggable } from "../Draggable/Draggable";
import { FaArrowsUpDownLeftRight } from "react-icons/fa6";
import logo from "../../../../../../public/logo.svg";
import "./builder.scss";
import HTMLReactParser from "html-react-parser";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("../TextEditor/TextEditor"), {
  ssr: false,
});
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const { updateContent, changeUploadFileStatus } = builderSlice.actions;

function Builder({ style, dropStyle, dropId }) {
  const dispatch = useDispatch();
  const contentList = useSelector((state) => state.builder.contentList);
  const handleClick = (e) => {
    e.stopPropagation();
    const idList = ["builder", "builder_content"];
    if (idList.includes(e.target?.id)) {
      const checkHideEditor = contentList.every((content) => {
        if (content.isShow) {
          return false;
        } else {
          return true;
        }
      });
      if (!checkHideEditor) {
        e.stopPropagation();
        dispatch(
          updateContent({
            hideEditor: true,
          })
        );
      }
    }
  };
  return (
    <div className="builder px-6 py-6" id="builder" onClick={handleClick}>
      <Droppable id={"builder_row"}>
        <div
          className={
            "after:content-['Row'] after:absolute after:-top-[20px] after:right-0 after:bg-violet-700 after:text-[12px] after:px-2 after:hidden relative border-transparent border-2 py-1 hover:border-violet-700 hover:bg-zinc-100 " +
            (dropId === "builder_row" ? style : "")
          }
          id="builder_content"
        >
          {contentList.length ? (
            contentList.map((tag, index) => {
              return (
                <Droppable
                  id={"droppable_" + index}
                  style={
                    "w-3/5 flex flex-col justify-center items-center m-auto border-2 border-transparent m-auto hover:border-2 hover:border-violet-700 hover:bg-zinc-50 relative " +
                    (tag.isShow ? "gap-y-2 " : "") +
                    (dropId === "droppable_" + index ? dropStyle : "")
                  }
                  key={index}
                >
                  {tag?.editable ? (
                    <TextEditor
                      tagContent={tag.content}
                      tagIndex={index}
                      styleEditor={
                        tag.isShow
                          ? "opacity-100 visible"
                          : "opacity-0 h-0 invisible"
                      }
                    />
                  ) : (
                    ""
                  )}
                  <div
                    className="w-full"
                    id={"content_" + index}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (e.target.id === "upload_image") {
                        dispatch(changeUploadFileStatus(true));
                        return;
                      }
                      let contentId = e.target.parentElement.id;
                      if (!contentId) {
                        contentId = e.target.parentElement.parentElement.id;
                      }
                      const contentIndex = contentId.slice(
                        contentId.indexOf("_") + 1
                      );
                      dispatch(
                        updateContent({
                          contentId: contentIndex,
                        })
                      );
                    }}
                  >
                    {tag.contentCode}
                  </div>
                  <div className="tag_name absolute -bottom-[20px] right-0 bg-violet-700 text-[12px] px-2 text-white hidden">
                    {tag.id}
                  </div>
                  <div className="move-icon absolute bg-violet-700 text-white z-50 rounded-full px-2 py-2 top-1/4 -right-4 hidden cursor-pointer">
                    <FaArrowsUpDownLeftRight className="text-lg" />
                  </div>
                </Droppable>
              );
            })
          ) : (
            <Droppable
              id={"droppable"}
              style={
                "w-3/5 border-1 border-violet-400 border-dashed px-4 py-4 flex flex-col justify-center items-center gap-y-2 m-auto text-violet-500 bg-violet-100 m-auto " +
                dropStyle
              }
            >
              <div className="flex flex-col justify-center items-center">
                <FaArrowAltCircleUp />
                <p>Drop content blocks here</p>
              </div>
            </Droppable>
          )}
          <div className="move-icon absolute bg-violet-700 text-white z-50 rounded-full px-2 py-2 top-1/4 -left-4 hidden cursor-pointer">
            <FaArrowsUpDownLeftRight className="text-lg" />
          </div>
        </div>
      </Droppable>
      <Droppable id="builder_row_block">
        <div
          className={
            "after:content-['Row'] after:absolute after:-top-[20px] after:right-0 after:bg-violet-700 after:text-[12px] after:px-2 after:hidden relative border-transparent border-2 py-1 hover:border-violet-700 hover:bg-zinc-100 " +
            (dropId === "builder_row_block" ? style : "")
          }
        >
          <Droppable
            id={"drop_block"}
            style={
              "w-3/5 flex justify-center items-center gap-x-2 m-auto border-2 border-transparent m-auto hover:border-2 hover:border-violet-700 hover:bg-zinc-50 py-4 px-2"
            }
          >
            <Image src={logo} alt="logo" width={100} />
            Designed with Beefree
          </Droppable>
        </div>
      </Droppable>
      {/* <TextEditor
        tagContent={`<h1>Hello world</h1>`}
        tagIndex={"1"}
        styleEditor={"opacity-100 visible"}
      /> */}
    </div>
  );
}

export default Builder;
