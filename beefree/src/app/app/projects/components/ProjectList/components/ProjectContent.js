"use client";

import React from "react";
import { getStyleObjectFromString } from "@/utils/convert";

function ProjectContent({ data }) {
  const colSpans = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
  };
  return (
    <>
      <div className="builder mx-auto" id="builder">
        <div style={getStyleObjectFromString(data?.generalStyle)}>
          {data?.rows?.length
            ? data?.rows?.map((row, rowIndex) => {
                const areaStyleObj = getStyleObjectFromString(
                  row?.contentAreaStyle
                );
                const generalStyleObj = getStyleObjectFromString(
                  data?.contentGeneralStyle
                );
                const objStyle = {
                  ...generalStyleObj,
                  ...areaStyleObj,
                };
                objStyle.width = "300px";
                return (
                  <div id={"builder_row_" + rowIndex}>
                    <div id={"drag_handle_row_" + rowIndex}>
                      <div
                        style={getStyleObjectFromString(row?.rowStyle)}
                        id={"builder_content_" + rowIndex}
                      >
                        <div style={objStyle} className="h-full">
                          <div
                            className={
                              row?.columns?.length > 1 ? "grid grid-cols-6" : ""
                            }
                          >
                            {row?.columns?.length
                              ? row?.columns?.map((column, columnIndex) => {
                                  let colSpan = "";
                                  if (row?.columns?.length > 1) {
                                    if (column?.colSpan) {
                                      colSpan = colSpans[column?.colSpan];
                                    }
                                  }
                                  return (
                                    <div
                                      id={
                                        "builder_row_" +
                                        rowIndex +
                                        "_column_" +
                                        columnIndex
                                      }
                                      className={colSpan}
                                    >
                                      <div
                                        style={getStyleObjectFromString(
                                          column?.columnStyle
                                        )}
                                        className="h-full"
                                      >
                                        {column?.contents?.length
                                          ? column?.contents?.map(
                                              (tag, index) => {
                                                return (
                                                  <div
                                                    id={
                                                      "builder_row_" +
                                                      rowIndex +
                                                      "_column_" +
                                                      columnIndex +
                                                      "_content_" +
                                                      index
                                                    }
                                                    className="w-full"
                                                  >
                                                    <div
                                                      id={
                                                        "drag_handle_row_" +
                                                        rowIndex +
                                                        "_column_" +
                                                        columnIndex +
                                                        "_content_" +
                                                        index
                                                      }
                                                      className="w-full flex flex-col justify-center items-center"
                                                    >
                                                      <div
                                                        className="w-full"
                                                        id={
                                                          "builder_row_" +
                                                          rowIndex +
                                                          "_column_" +
                                                          columnIndex +
                                                          "_content_" +
                                                          index
                                                        }
                                                      >
                                                        {tag?.contentCode}
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )
                                          : ""}
                                      </div>
                                    </div>
                                  );
                                })
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default ProjectContent;
