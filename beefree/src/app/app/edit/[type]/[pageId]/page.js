"use client";

import React, { useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import Builder from "../../components/Builder/Builder";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DndContext } from "@dnd-kit/core";
import { contents } from "@/core/content";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const { addContent, sortContentList, updateRowIndex, updateColumnIndex } =
  builderSlice.actions;
import "primeicons/primeicons.css";
import FileMange from "../../components/FileManage/FileMange";

function EditPage() {
  const contentList = useSelector((state) => state.builder.contentList);
  const isUploadFile = useSelector((state) => state.builder.isUploadFile);
  const dispatch = useDispatch();
  const [style, setStyle] = useState("");
  const [dropStyle, setDropStyle] = useState("");
  const [isAppend, setIsAppend] = useState(true);
  const [dropId, setDropId] = useState("");
  const [isDragHandle, setDragHandle] = useState(false);
  const [indexDnd, setIndexDnd] = useState({});

  const handleDragEnd = (e) => {
    if (!isDragHandle) {
      console.log(e);
      console.log(contentList);
      const tag = contents.find((content) => {
        return e?.active?.id === content?.id;
      });
      const tagIndex = dropId.slice(dropId.indexOf("_content_") + 9);
      if (
        e?.over?.id.includes("_content_") ||
        e?.over?.id.includes("droppable") ||
        e?.over?.id.includes("builder_row_")
      ) {
        dispatch(
          addContent({
            tag,
            tagIndex,
            isAppend,
          })
        );
      }
      setStyle("");
      setDropStyle("");
    } else {
      if (
        (e?.over?.id.includes("droppable") ||
          e?.over?.id.includes("_content_")) &&
        indexDnd?.activeId &&
        indexDnd?.overId
      ) {
        dispatch(sortContentList(indexDnd));
      }
      setStyle("");
      setDropStyle("");
      setDragHandle(false);
    }
  };
  const handleDragMove = (e) => {
    if (!isDragHandle) {
      const index = contents.findIndex((content) => {
        return e?.active?.id === content?.id;
      });
      if (e?.over?.id) {
        setDropId(e?.over?.id);
      }
      if (
        e?.over?.id.includes("_content_") ||
        e?.over?.id.includes("droppable") ||
        e?.over?.id.includes("builder_row_")
      ) {
        let tagIndex, column;
        if (e?.over?.id.includes("_content_")) {
          let id = e?.over?.id;
          const rowIndex = id.slice(
            id.indexOf("row_") + 4,
            id.indexOf("_column")
          );
          const columnIndex = id.slice(
            id.indexOf("column_") + 7,
            id.indexOf("_content")
          );
          dispatch(updateColumnIndex(columnIndex));
          dispatch(updateRowIndex(rowIndex));
          tagIndex = id.slice(id.indexOf("content_") + 8);
          const row = contentList.find((row, index) => index === +rowIndex);
          column = row.find((column, index) => index === +columnIndex);
        } else if (e?.over?.id?.includes("_column_")) {
          let id = e?.over?.id;
          const rowIndex = id.slice(
            id.indexOf("row_") + 4,
            id.indexOf("_column")
          );
          const columnIndex = id.slice(id.indexOf("column_") + 7);
          dispatch(updateColumnIndex(columnIndex));
          dispatch(updateRowIndex(rowIndex));
          const row = contentList.find((row, index) => index === +rowIndex);
          column = row.find((column, index) => index === +columnIndex);
        } else if (e?.over?.id?.includes("_row_")) {
          let id = e?.over?.id;
          const rowIndex = id.slice(id.indexOf("row_") + 4);
          dispatch(updateRowIndex(rowIndex));
        }
        if (
          contentList?.length >= Math.ceil((index + 1) / 3) + 3 &&
          +tagIndex
        ) {
          if (
            Math.abs(+e?.delta.y) >
            (Math.ceil((index + 1) / 3) +
              (contentList?.length - Math.ceil((index + 1) / 3) + 3)) *
              100
          ) {
            setDropStyle("border-t-2 border-solid border-t-violet-700");
            setIsAppend(false);
          } else {
            setDropStyle("border-b-2 border-solid border-b-violet-700");
            setIsAppend(true);
          }
        } else {
          if (Math.abs(+e?.delta.y) > Math.ceil((index + 1) / 3) * 100) {
            setDropStyle("border-t-2 border-solid border-t-violet-700");
            setIsAppend(false);
          } else {
            setDropStyle("border-b-2 border-solid border-b-violet-700");
            setIsAppend(true);
          }
        }
      }
    } else {
      const activeId = e?.active?.id;
      const overId = e?.over?.id;
      // console.log(overId);
      // console.log(activeId);
      if (activeId && overId) {
        setIndexDnd({
          activeId,
          overId,
        });
      }
    }
  };
  const handleDragOver = (e) => {
    if (
      e?.over?.id.includes("builder_row_") &&
      !e?.over?.id.includes("_column_")
    ) {
      setStyle("border-violet-700 bg-zinc-100");
      setDropStyle("");
    } else if (e?.over?.id.includes("_content_")) {
      setStyle("");
    } else {
      setStyle("");
      setDropStyle("");
    }
  };
  const handleDragStart = (e) => {
    if (e?.active?.id.includes("drag_handle")) {
      setDragHandle(true);
    }
  };
  return (
    <>
      {!isUploadFile ? (
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragMove={handleDragMove}
          id="dnd-context"
        >
          <div className="grid grid-cols-10">
            <div className="col-span-7">
              <main className="main h-2/3">
                <div className="relative h-screen">
                  <div className="absolute top-5 left-5 flex items-center shadow-md z-50">
                    <div className="bg-violet-500 text-white px-2 py-2 cursor-pointer">
                      <FaDesktop />
                    </div>
                    <div className="px-2 py-2 cursor-pointer bg-white">
                      <MdPhoneAndroid />
                    </div>
                  </div>
                  <Builder
                    style={style}
                    dropStyle={dropStyle}
                    dropId={dropId}
                  />
                </div>
              </main>
            </div>
            <div className="col-span-3">
              <Sidebar />
            </div>
          </div>
        </DndContext>
      ) : (
        <FileMange />
      )}
    </>
  );
}

export default EditPage;
