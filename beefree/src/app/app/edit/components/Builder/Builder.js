"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Droppable } from "../Droppable/Droppable";
import { Draggable } from "../Draggable/Draggable";
import { FaArrowsUpDownLeftRight } from "react-icons/fa6";
import { BsChatSquare } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { IoCopySharp } from "react-icons/io5";
import logo from "../../../../../../public/logo.svg";
import "./builder.scss";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("../TextEditor/TextEditor"), {
  ssr: false,
});
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { editorSlice } from "@/redux/slice/editorSlice";
import { DragHandle } from "../DragHandle/DragHandle";
const {
  updateContent,
  changeUploadFileStatus,
  updateContentIndex,
  replicationContent,
  deleteContent,
} = builderSlice.actions;
const { updateEditor } = editorSlice.actions;

function Builder({ style, dropStyle, dropId }) {
  const dispatch = useDispatch();
  const contentList = useSelector((state) => state.builder.contentList);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
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
        dispatch(updateEditor(null));
        dispatch(updateContentIndex(null));
      }
    }
  };
  return (
    <div
      className="builder px-6 py-6 h-[90%] overflow-auto"
      id="builder"
      onClick={handleClick}
    >
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
              // console.log(tag.content);
              return (
                <Droppable
                  id={"droppable_" + index}
                  style={"w-3/5 m-auto"}
                  key={index}
                >
                  <DragHandle
                    id={"drag_handle_" + index}
                    style={
                      "w-full flex flex-col justify-center items-center border-2 border-transparent hover:border-2 hover:border-violet-700 hover:bg-zinc-50 relative " +
                      (tag?.isShow ? "gap-y-2 " : "") +
                      (dropId === "droppable_" + index ? dropStyle : "") +
                      (+index === +contentIndex && contentIndex !== null
                        ? " border-violet-700"
                        : "")
                    }
                    isShow={+index === +contentIndex && contentIndex !== null}
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
                        let contentId = e.target.id;
                        if (!contentId || !contentId.includes("content_")) {
                          contentId = e.target.parentElement.id;
                          if (contentId.includes("https://")) {
                            contentId = "";
                          }
                        }
                        if (!contentId) {
                          contentId = e.target.parentElement.parentElement.id;
                        }
                        const contentIndex = contentId.slice(
                          contentId.indexOf("_") + 1
                        );
                        const tag = contentList.find((content, index) => {
                          if (index === +contentIndex) return content;
                        });
                        dispatch(updateContentIndex(contentIndex));
                        dispatch(updateEditor(tag.id));
                        dispatch(
                          updateContent({
                            contentId: contentIndex,
                          })
                        );
                      }}
                    >
                      {tag?.contentCode}
                    </div>
                    <div
                      className={
                        "tag_name absolute -bottom-[22px] right-0 z-40 bg-violet-700 text-[12px] px-2 text-white" +
                        (+index === +contentIndex && contentIndex !== null
                          ? ""
                          : " hidden")
                      }
                    >
                      {tag?.id}
                    </div>
                    <div
                      className={
                        "edit-icons absolute z-50 -bottom-[36px] right-0 text-[16px] text-white flex items-center cursor-pointer" +
                        (+index === +contentIndex && contentIndex !== null
                          ? ""
                          : " hidden")
                      }
                    >
                      <div className="bg-violet-700 px-2 py-2 border">
                        <BsChatSquare />
                      </div>{" "}
                      <div
                        className="bg-violet-700 px-2 py-2 border"
                        onClick={() => {
                          dispatch(deleteContent());
                          dispatch(updateEditor(null));
                          dispatch(updateContentIndex(null));
                        }}
                      >
                        <CiTrash />
                      </div>{" "}
                      <div
                        className="bg-violet-700 px-2 py-2 border"
                        onClick={() => {
                          dispatch(replicationContent());
                        }}
                      >
                        <IoCopySharp />
                      </div>
                    </div>
                  </DragHandle>
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
    </div>
  );
}

export default Builder;
