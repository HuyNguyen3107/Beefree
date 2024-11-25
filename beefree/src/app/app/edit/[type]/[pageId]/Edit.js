"use client";

import React, { useEffect, useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { DndContext } from "@dnd-kit/core";

import Builder from "../../components/Builder/Builder";
import Sidebar from "../../components/Sidebar/Sidebar";
import { contents } from "@/core/content";
import { builderSlice } from "@/redux/slice/builderSlice";
import { editorSlice } from "@/redux/slice/editorSlice";
import { chatSlice } from "@/redux/slice/chatSlice";
const {
  addContent,
  sortContentList,
  updateRowIndex,
  updateColumnIndex,
  updateContentIndex,
  changeRowEditStatus,
  sortRow,
  updateData,
  updateProjectInfo,
} = builderSlice.actions;
const { updateEditor } = editorSlice.actions;
const { updateChatStatus } = chatSlice.actions;

import FileMange from "../../components/FileManage/FileMange";

import "primeicons/primeicons.css";
import Preview from "../../components/Preview/Preview";
import { usePathname } from "next/navigation";
import { client } from "@/utils/client";

function Edit({ accessToken, userId }) {
  const data = useSelector((state) => state.builder.data);
  const isUploadFile = useSelector((state) => state.builder.isUploadFile);
  const previewStatus = useSelector((state) => state.preview.previewStatus);
  const dispatch = useDispatch();
  const [style, setStyle] = useState("");
  const [dropStyle, setDropStyle] = useState("");
  const [isAppend, setIsAppend] = useState(true);
  const [dropId, setDropId] = useState("");
  const [isDragHandle, setDragHandle] = useState(false);
  const [indexDnd, setIndexDnd] = useState({});
  const [isRowDrag, setIsRowDrag] = useState(false);
  const [rowIndexDnd, setRowIndexDnd] = useState({});
  const [overId, setOverId] = useState("");
  const [device, setDevice] = useState("desktop");
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const handleDragEnd = (e) => {
    if (isDragHandle) {
      if (indexDnd?.activeId && indexDnd?.overId) {
        dispatch(sortContentList(indexDnd));
      }
      setIndexDnd({});
      setStyle("");
      setDropStyle("");
      setDragHandle(false);
    } else if (isRowDrag) {
      if (
        (rowIndexDnd?.activeIndex || rowIndexDnd?.activeIndex === 0) &&
        (rowIndexDnd?.overIndex || rowIndexDnd?.overIndex === 0)
      ) {
        dispatch(sortRow(rowIndexDnd));
      }
      setIsRowDrag(false);
      setStyle("");
      setDropStyle("");
      setRowIndexDnd({});
    } else {
      const tag = contents.find((content) => {
        return e?.active?.id === content?.id;
      });
      let tagIndex;
      if (dropId.includes("_content_")) {
        tagIndex = dropId.slice(dropId.indexOf("_content_") + 9);
      } else {
        const temp = e.collisions.find((item) => item.id.includes("_content_"));
        if (temp) {
          tagIndex = temp.id.slice(temp.id.indexOf("_content_") + 9);
        }
      }
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
    }
    dispatch(updateContentIndex(null));
    dispatch(updateContentIndex(null));
    dispatch(updateColumnIndex(null));
    dispatch(updateRowIndex(null));
    dispatch(changeRowEditStatus(null));
    setOverId("");
    dispatch(updateChatStatus(false));
  };
  const handleDragMove = (e) => {
    if (isDragHandle) {
      const activeId = e?.active?.id;
      const overId = e?.collisions.find(
        (item) => item.id.includes("_content_") || item.id.includes("droppable")
      )?.id;
      if (activeId && overId) {
        setIndexDnd({
          activeId,
          overId,
        });
      }
    } else if (isRowDrag) {
      const activeId = e?.active?.id;
      const activeIndex = activeId?.slice(activeId.indexOf("row_") + 4);
      const overId = e?.collisions.find(
        (item) => !item.id.includes("_column_")
      )?.id;
      const overIndex = overId?.slice(overId.indexOf("row_") + 4);
      if (
        +activeIndex !== +overIndex &&
        (+overIndex || +overIndex === 0) &&
        (+activeIndex || +activeIndex === 0)
      ) {
        setRowIndexDnd({
          activeIndex: +activeIndex,
          overIndex: +overIndex,
        });
      }
    } else {
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
          const row = data.rows.find((row, index) => index === +rowIndex);
          column = row.columns.find((column, index) => index === +columnIndex);
        } else if (e?.over?.id?.includes("_column_")) {
          let id = e?.over?.id;
          const rowIndex = id.slice(
            id.indexOf("row_") + 4,
            id.indexOf("_column")
          );
          const columnIndex = id.slice(id.indexOf("column_") + 7);
          dispatch(updateColumnIndex(columnIndex));
          dispatch(updateRowIndex(rowIndex));
          const row = data.rows.find((row, index) => index === +rowIndex);
          column = row.columns.find((column, index) => index === +columnIndex);
        } else if (e?.over?.id?.includes("_row_")) {
          let id = e?.over?.id;
          const rowIndex = id.slice(id.indexOf("row_") + 4);
          dispatch(updateRowIndex(rowIndex));
        }
        if (data.rows?.length >= Math.ceil((index + 1) / 3) + 3 && +tagIndex) {
          if (
            Math.abs(+e?.delta.y) >
            (Math.ceil((index + 1) / 3) +
              (data.rows?.length - Math.ceil((index + 1) / 3) + 3)) *
              100
          ) {
            // setDropStyle("border-t-1 border-solid border-t-violet-700");
            setIsAppend(false);
          } else {
            // setDropStyle("border-b-1 border-solid border-b-violet-700");
            setIsAppend(true);
          }
        } else {
          if (Math.abs(+e?.delta.y) > Math.ceil((index + 1) / 3) * 100) {
            // setDropStyle("border-t-1 border-solid border-t-violet-700");
            setIsAppend(false);
          } else {
            // setDropStyle("border-b-1 border-solid border-b-violet-700");
            setIsAppend(true);
          }
        }
      }
    }
  };
  const handleDragOver = (e) => {
    setOverId(e?.over?.id);
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
    if (
      e?.active?.id.includes("drag_handle") &&
      e?.active?.id.includes("_content_")
    ) {
      setDragHandle(true);
    } else if (
      e?.active?.id.includes("drag_handle") &&
      !e?.active?.id.includes("_content_")
    ) {
      setIsRowDrag(true);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const pathArr = pathname.split("/");
      const projectId = pathArr[pathArr.length - 1];
      const type = pathArr[pathArr.length - 2];
      client.setToken(accessToken);
      if (type === "email") {
        const { response, data } = await client.get(`/email/${projectId}`);
        setLoading(false);
        if (response.ok) {
          dispatch(updateData(JSON.parse(data?.data?.builderData)));
          dispatch(
            updateProjectInfo({
              name: data?.data?.name,
              type: data?.data?.type,
              id: data?.data?.projectId,
            })
          );
        }
      } else if (type === "page") {
        const { response, data } = await client.get(`/page/${projectId}`);
        setLoading(false);
        if (response.ok) {
          dispatch(updateData(JSON.parse(data?.data?.builderData)));
          dispatch(
            updateProjectInfo({
              name: data?.data?.name,
              type: data?.data?.type,
              id: data?.data?.projectId,
            })
          );
        }
      }
    };
    fetchData();
  }, []);
  if (previewStatus) {
    return <Preview />;
  }
  if (loading) {
    return <span>Loading...</span>;
  }
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
                    <div
                      className={
                        "text-white px-2 py-2 cursor-pointer" +
                        (device === "desktop"
                          ? " bg-violet-500"
                          : " bg-gray-600")
                      }
                      onClick={() => {
                        setDevice("desktop");
                      }}
                    >
                      <FaDesktop />
                    </div>
                    <div
                      className={
                        "text-white px-2 py-2 cursor-pointer" +
                        (device === "mobile"
                          ? " bg-violet-500"
                          : " bg-gray-600")
                      }
                      onClick={() => {
                        setDevice("mobile");
                      }}
                    >
                      <MdPhoneAndroid />
                    </div>
                  </div>
                  <Builder
                    style={style}
                    dropStyle={dropStyle}
                    dropId={dropId}
                    overId={overId}
                    device={device}
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
        <FileMange userId={userId}/>
      )}
    </>
  );
}

export default Edit;
