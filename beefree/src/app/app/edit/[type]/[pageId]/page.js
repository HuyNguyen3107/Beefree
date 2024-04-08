"use client";

import React, { useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import Builder from "../../components/Builder/Builder";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DndContext } from "@dnd-kit/core";
import { contents } from "@/utils/content";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const { addContent } = builderSlice.actions;
import "primeicons/primeicons.css";
import FileMange from "../../components/FileManage/FileMange";

function EditPage() {
  const contentList = useSelector((state) => state.builder.contentList);
  const isUploadFile = useSelector((state) => state.builder.isUploadFile);
  const dispatch = useDispatch();
  // const [code, setCode] = useState([]);
  const [style, setStyle] = useState("");
  const [dropStyle, setDropStyle] = useState("");
  const [isAppend, setIsAppend] = useState(true);
  const [dropId, setDropId] = useState("");

  const handleDragEnd = (e) => {
    const tag = contents.find((content) => {
      return e?.active?.id === content?.id;
    });
    const tagIndex = dropId.slice(dropId.indexOf("_") + 1);
    if (e?.over?.id.includes("droppable")) {
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
  };
  const handleDragMove = (e) => {
    const index = contents.findIndex((content) => {
      return e?.active?.id === content?.id;
    });
    const tagIndex = e?.over?.id.slice(e?.over?.id.indexOf("_") + 1);
    if (e?.over?.id) {
      setDropId(e?.over?.id);
    }
    if (e?.over?.id.includes("droppable")) {
      if (
        contentList.length >= Math.ceil((index + 1) / 3) + 3 &&
        +tagIndex !== 0
      ) {
        if (
          Math.abs(+e?.delta.y) >
          (Math.ceil((index + 1) / 3) +
            (contentList.length - Math.ceil((index + 1) / 3) + 3)) *
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
  };
  const handleDragOver = (e) => {
    if (e?.over?.id === "builder_row") {
      setStyle("border-violet-700 bg-zinc-100");
      setDropStyle("");
    } else if (e?.over?.id.includes("droppable")) {
      setStyle("");
    } else {
      setStyle("");
      setDropStyle("");
    }
  };
  return (
    <>
      {!isUploadFile ? (
        <DndContext
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragMove={handleDragMove}
          id="dnd-context"
        >
          <div className="grid grid-cols-10">
            <div className="col-span-7">
              <main className="main">
                <div className="relative">
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
