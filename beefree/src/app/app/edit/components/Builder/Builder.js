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
  updateRowIndex,
  updateColumnIndex,
  changeRowEditStatus,
} = builderSlice.actions;
const { updateEditor, updateSidebar } = editorSlice.actions;

function Builder({ style, dropStyle, dropId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
  const rowIndex = useSelector((state) => state.builder.rowIndex);
  const columnIndex = useSelector((state) => state.builder.columnIndex);
  const validateId = (id) => {
    if (!id) {
      return false;
    }
    const checkList = ["_row_", "_column_", "_content_"];
    return checkList.every((item) => id.includes(item));
  };
  const findContentId = (e) => {
    let contentId;
    let target = e.target;
    let check = validateId(target.id);
    if (check) {
      contentId = target.id;
      return contentId;
    } else {
      while (!check) {
        target = target.parentElement;
        check = validateId(target.id);
        if (check) {
          contentId = target.id;
          return contentId;
        }
      }
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    const id = e.target?.id;
    if (id) {
      if (id?.includes("builder_content")) {
        const index = id.slice(id.lastIndexOf("_") + 1);
        dispatch(
          updateContent({
            hideEditor: true,
          })
        );
        dispatch(updateEditor(null));
        dispatch(updateContentIndex(null));
        dispatch(updateColumnIndex(null));
        dispatch(updateRowIndex(+index));
        dispatch(changeRowEditStatus(true));
        dispatch(updateSidebar("rows"));
      }
    }
  };
  return (
    <div
      className="builder px-6 py-6 h-[90%] overflow-auto"
      id="builder"
      onClick={handleClick}
    >
      {data?.rows?.length ? (
        data?.rows?.map((row, rowIndex) => {
          return (
            <Droppable id={"builder_row_" + rowIndex} key={rowIndex}>
              <div
                className={
                  "builder_content after:content-['Row'] after:absolute after:-top-[20px] after:right-0 after:bg-violet-700 after:text-[12px] after:px-2 after:hidden relative border-transparent border-2 py-1 hover:border-violet-700 hover:bg-zinc-100 " +
                  (dropId === "builder_row_" + rowIndex ? style : "")
                }
                id={"builder_content_" + rowIndex}
              >
                <div
                  className={
                    "w-4/5 m-auto" +
                    (row?.columns?.length > 1 ? " grid grid-cols-6" : "")
                  }
                >
                  {row?.columns?.length ? (
                    row?.columns?.map((column, columnIndex) => {
                      return (
                        <Droppable
                          id={
                            "builder_row_" + rowIndex + "_column_" + columnIndex
                          }
                          key={columnIndex}
                          style={
                            row?.columns?.length > 1
                              ? columnIndex === 0
                                ? "col-span-" + (6 - row?.columns?.length + 1)
                                : "col-span-1"
                              : ""
                          }
                        >
                          {column?.contents?.length ? (
                            column?.contents?.map((tag, index) => {
                              return (
                                <Droppable
                                  id={
                                    "builder_row_" +
                                    rowIndex +
                                    "_column_" +
                                    columnIndex +
                                    "_content_" +
                                    index
                                  }
                                  style={"w-full"}
                                  key={index}
                                >
                                  <DragHandle
                                    id={
                                      "drag_handle_row_" +
                                      rowIndex +
                                      "_column_" +
                                      columnIndex +
                                      "_content_" +
                                      index
                                    }
                                    style={
                                      "w-full flex flex-col justify-center items-center border-2 border-transparent hover:border-2 hover:border-violet-700 hover:bg-zinc-50 relative " +
                                      (tag?.isShow ? "gap-y-2 " : "") +
                                      (dropId ===
                                      "builder_row_" +
                                        rowIndex +
                                        "_column_" +
                                        columnIndex +
                                        "_content_" +
                                        index
                                        ? dropStyle
                                        : "") +
                                      (+index === +contentIndex &&
                                      contentIndex !== null
                                        ? " border-violet-700"
                                        : "")
                                    }
                                    isShow={
                                      +index === +contentIndex &&
                                      contentIndex !== null
                                    }
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
                                      className={"w-full"}
                                      id={
                                        "builder_row_" +
                                        rowIndex +
                                        "_column_" +
                                        columnIndex +
                                        "_content_" +
                                        index
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (e.target.id === "upload_image") {
                                          dispatch(
                                            changeUploadFileStatus(true)
                                          );
                                          const id = findContentId(e);
                                          const index = id.slice(
                                            id.lastIndexOf("_") + 1
                                          );
                                          dispatch(updateContentIndex(index));
                                          return;
                                        }
                                        const id = findContentId(e);
                                        const rowIndex = id.slice(
                                          id.indexOf("row_") + 4,
                                          id.indexOf("_column")
                                        );
                                        const columnIndex = id.slice(
                                          id.indexOf("column_") + 7,
                                          id.indexOf("_content")
                                        );
                                        const contentIndex = id.slice(
                                          id.indexOf("content_") + 8
                                        );
                                        const row = data?.rows?.find(
                                          (row, index) => index === +rowIndex
                                        );
                                        const column = row?.columns?.find(
                                          (column, index) =>
                                            index === +columnIndex
                                        );
                                        const tag = column?.contents?.find(
                                          (content, index) =>
                                            index === +contentIndex
                                        );
                                        dispatch(
                                          updateContentIndex(contentIndex)
                                        );
                                        dispatch(
                                          updateColumnIndex(columnIndex)
                                        );
                                        dispatch(updateRowIndex(rowIndex));
                                        dispatch(updateEditor(tag.id));
                                        dispatch(
                                          updateContent({
                                            contentId: contentIndex,
                                          })
                                        );
                                        dispatch(updateSidebar("contents"));
                                        dispatch(changeRowEditStatus(null));
                                      }}
                                    >
                                      {tag?.contentCode}
                                    </div>
                                    <div
                                      className={
                                        "tag_name absolute -bottom-[22px] right-0 z-40 bg-violet-700 text-[12px] px-2 text-white" +
                                        (+index === +contentIndex &&
                                        contentIndex !== null
                                          ? ""
                                          : " hidden")
                                      }
                                    >
                                      {tag?.id}
                                    </div>
                                    <div
                                      className={
                                        "edit-icons absolute z-50 -bottom-[36px] right-0 text-[16px] text-white flex items-center cursor-pointer" +
                                        (+index === +contentIndex &&
                                        contentIndex !== null
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
                              id={
                                "droppable_row_" +
                                rowIndex +
                                "_column_" +
                                columnIndex
                              }
                              style={
                                "w-full border-1 border-violet-400 border-dashed px-4 py-4 flex flex-col justify-center items-center gap-y-2 m-auto text-violet-500 bg-violet-100 m-auto " +
                                dropStyle
                              }
                            >
                              <div className="flex flex-col justify-center items-center">
                                <FaArrowAltCircleUp />
                                <p>Drop content blocks here</p>
                              </div>
                            </Droppable>
                          )}
                        </Droppable>
                      );
                    })
                  ) : (
                    <Droppable
                      id={"droppable_row_" + rowIndex}
                      style={
                        "w-full border-1 border-violet-400 border-dashed px-4 py-4 flex flex-col justify-center items-center gap-y-2 m-auto text-violet-500 bg-violet-100 m-auto " +
                        dropStyle
                      }
                    >
                      <div className="flex flex-col justify-center items-center">
                        <FaArrowAltCircleUp />
                        <p>Drop content blocks here</p>
                      </div>
                    </Droppable>
                  )}
                  <div className="move-icon-row absolute bg-violet-700 text-white z-50 rounded-full px-2 py-2 top-1/4 -left-4 hidden cursor-pointer">
                    <FaArrowsUpDownLeftRight className="text-lg" />
                  </div>
                </div>
              </div>
            </Droppable>
          );
        })
      ) : (
        <Droppable id={"builder_row_0"}>
          <div
            className={
              "after:content-['Row'] after:absolute after:-top-[20px] after:right-0 after:bg-violet-700 after:text-[12px] after:px-2 after:hidden relative border-transparent border-2 py-1 hover:border-violet-700 hover:bg-zinc-100 " +
              (dropId === "builder_row_0" ? style : "")
            }
            id="builder_content"
          >
            <Droppable
              id={"droppable_row_0"}
              style={
                "w-4/5 border-1 border-violet-400 border-dashed px-4 py-4 flex flex-col justify-center items-center gap-y-2 m-auto text-violet-500 bg-violet-100 m-auto " +
                dropStyle
              }
            >
              <div className="flex flex-col justify-center items-center">
                <FaArrowAltCircleUp />
                <p>Drop content blocks here</p>
              </div>
            </Droppable>
            <div className="move-icon-row absolute bg-violet-700 text-white z-50 rounded-full px-2 py-2 top-1/4 -left-4 hidden cursor-pointer">
              <FaArrowsUpDownLeftRight className="text-lg" />
            </div>
          </div>
        </Droppable>
      )}
      <Droppable id="builder_block">
        <div
          className={
            "after:content-['Row'] after:absolute after:-top-[20px] after:right-0 after:bg-violet-700 after:text-[12px] after:px-2 after:hidden relative border-transparent border-2 py-1 hover:border-violet-700 hover:bg-zinc-100 " +
            (dropId === "builder_block" ? style : "")
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
