"use client";
import React, { useEffect, useState } from "react";
import { Switch, Select, SelectItem, Input, Button } from "@nextui-org/react";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import letterImg from "../../../../../../../assets/images/letter.png";
import Image from "next/image";
import { BiSolidObjectsVerticalTop } from "react-icons/bi";
import { BiSolidObjectsVerticalCenter } from "react-icons/bi";
import { BiSolidObjectsVerticalBottom } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { isFirebaseStorageLink, isImageLink } from "@/utils/regex";
import { getStyleObjectFromString } from "@/utils/convert";
const {
  updateRowBackgroundColor,
  updateContentAreaBackgroundColor,
  changeUploadFileStatus,
  changeInsertRowImageBgStatus,
  updateBackgroundImage,
  changeBackgroundImageArea,
  removeBackgroundImage,
  updateBackgroundSize,
  updateBackgroundRepeat,
  updateBackgroundPosition,
  updateContentAreaBorder,
  updateContentAreaBorderBottom,
  updateContentAreaBorderLeft,
  updateContentAreaBorderRight,
  updateContentAreaBorderTop,
  updateContentAreaBorderRadius,
  addColumn,
  deleteColumn,
  updateColumnBackgroundColor,
  updateColumnBorder,
  updateColumnPadding,
  updateColumnBorderLeft,
  updateColumnBorderRight,
  updateColumnBorderTop,
  updateColumnBorderBottom,
  updateColumnIndex,
} = builderSlice.actions;

function RowEditor() {
  const data = useSelector((state) => state.builder.data);
  const rowIndex = useSelector((state) => state.builder.rowIndex);
  const row = data?.rows[rowIndex];
  const dispatch = useDispatch();
  const areaList = ["CONTENT AREA", "ROW"];
  const styleBorderList = ["solid", "dotted", "dashed"];
  const [rowBgColor, setRowBgColor] = useState("");
  const [contentAreaBgColor, setContentAreaBgColor] = useState("");
  const [activeRowBgImg, setActiveRowBgImg] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [area, setArea] = useState(areaList[1]);
  const [isFitToBackground, setIsFitToBackground] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
  const [checkContentAreaBorder, setCheckContentAreaBorder] = useState(false);
  const [checkContentAreaRounded, setCheckContentAreaRounded] = useState(false);
  const [contentAreaBorderAll, setContentAreaBorderAll] = useState({
    width: 0,
  });
  const [contentAreaBorderTop, setContentAreaBorderTop] = useState({
    width: 0,
  });
  const [contentAreaBorderRight, setContentAreaBorderRight] = useState({
    width: 0,
  });
  const [contentAreaBorderBottom, setContentAreaBorderBottom] = useState({
    width: 0,
  });
  const [contentAreaBorderLeft, setContentAreaBorderLeft] = useState({
    width: 0,
  });
  const [contentAreaRounded, setContentAreaRounded] = useState({
    all: 0,
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
  });
  const [checkStackOnMobile, setCheckStackOnMobile] = useState(false);
  const [columnNumber, setColumnNumber] = useState(1);
  const [columnBgColor, setColumnBgColor] = useState("");
  const [checkColumnBorder, setCheckColumnBorder] = useState(false);
  const [checkColumnPadding, setCheckColumnPadding] = useState(false);
  const [columnPadding, setColumnPadding] = useState({
    all: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [columnBorderAll, setColumnBorderAll] = useState({
    width: 0,
  });
  const [columnBorderTop, setColumnBorderTop] = useState({
    width: 0,
  });
  const [columnBorderRight, setColumnBorderRight] = useState({
    width: 0,
  });
  const [columnBorderBottom, setColumnBorderBottom] = useState({
    width: 0,
  });
  const [columnBorderLeft, setColumnBorderLeft] = useState({
    width: 0,
  });
  const handleInputChange = (event) => {
    setImageLink(event.target.value);
  };
  const colSpans = {
    1: "col-span-2",
    2: "col-span-4",
    3: "col-span-6",
    4: "col-span-8",
    5: "col-span-10",
    6: "col-span-12",
  };
  useEffect(() => {
    const row = data?.rows[rowIndex];
    const rowStyle = row?.rowStyle;
    const contentAreaStyle = row?.contentAreaStyle;
    if (rowStyle?.includes("background-image")) {
      const urlArr = rowStyle.match(/url\(([^)]+)\)/);
      let url = urlArr ? urlArr[1] : "";
      url = url.slice(1, -1);
      setImageLink(url);
      setArea("ROW");
      dispatch(changeBackgroundImageArea("ROW"));
      const obj = getStyleObjectFromString(rowStyle);
      setIsFitToBackground(obj.backgroundSize.includes("cover"));
      setIsRepeat(
        obj.backgroundRepeat.includes("repeat") &&
          !obj.backgroundRepeat.includes("no-repeat")
      );
      setIsCenter(obj.backgroundPosition.includes("center top"));
    } else if (contentAreaStyle?.includes("background-image")) {
      const urlArr = contentAreaStyle.match(/url\(([^)]+)\)/);
      let url = urlArr ? urlArr[1] : "";
      url = url.slice(1, -1);
      setImageLink(url);
      setArea("CONTENT AREA");
      dispatch(changeBackgroundImageArea("CONTENT AREA"));
      const obj = getStyleObjectFromString(contentAreaStyle);
      setIsFitToBackground(obj.backgroundSize.includes("cover"));
      setIsRepeat(
        obj.backgroundRepeat.includes("repeat") &&
          !obj.backgroundRepeat.includes("no-repeat")
      );
      setIsCenter(obj.backgroundPosition.includes("center top"));
    } else {
      dispatch(changeBackgroundImageArea("ROW"));
    }
    if (rowStyle) {
      setRowBgColor(getStyleObjectFromString(rowStyle)["backgroundColor"]);
    }
    if (contentAreaStyle) {
      setContentAreaBgColor(
        getStyleObjectFromString(contentAreaStyle)["backgroundColor"]
      );
      const obj = getStyleObjectFromString(contentAreaStyle);
      let objBorderAll = {};
      let objBorderTop = {};
      let objBorderRight = {};
      let objBorderBottom = {};
      let objBorderLeft = {};
      let objBorderRadius = {};
      if (obj.borderStyle) {
        objBorderAll.style = obj.borderStyle;
      }
      if (obj.borderWidth) {
        objBorderAll.width = +obj.borderWidth.replace(/\D/g, "");
      }
      if (obj.borderColor) {
        objBorderAll.color = obj.borderColor;
      }
      if (obj.borderTopStyle) {
        objBorderTop.style = obj.borderTopStyle;
      }
      if (obj.borderTopWidth) {
        objBorderTop.width = +obj.borderTopWidth.replace(/\D/g, "");
      }
      if (obj.borderTopColor) {
        objBorderTop.color = obj.borderTopColor;
      }
      if (obj.borderRightStyle) {
        objBorderRight.style = obj.borderRightStyle;
      }
      if (obj.borderRightWidth) {
        objBorderRight.width = +obj.borderRightWidth.replace(/\D/g, "");
      }
      if (obj.borderRightColor) {
        objBorderRight.color = obj.borderRightColor;
      }
      if (obj.borderBottomStyle) {
        objBorderBottom.style = obj.borderBottomStyle;
      }
      if (obj.borderBottomWidth) {
        objBorderBottom.width = +obj.borderBottomWidth.replace(/\D/g, "");
      }
      if (obj.borderBottomColor) {
        objBorderBottom.color = obj.borderBottomColor;
      }
      if (obj.borderLeftStyle) {
        objBorderLeft.style = obj.borderLeftStyle;
      }
      if (obj.borderLeftWidth) {
        objBorderLeft.width = +obj.borderLeftWidth.replace(/\D/g, "");
      }
      if (obj.borderLeftColor) {
        objBorderLeft.color = obj.borderLeftColor;
      }
      if (obj.borderRadius) {
        objBorderRadius.all = +obj.borderRadius.replace(/\D/g, "");
      }
      if (obj.borderTopLeftRadius) {
        objBorderRadius.topLeft = +obj.borderTopLeftRadius.replace(/\D/g, "");
      }
      if (obj.borderTopRightRadius) {
        objBorderRadius.topRight = +obj.borderTopRightRadius.replace(/\D/g, "");
      }
      if (obj.borderBottomRightRadius) {
        objBorderRadius.bottomRight = +obj.borderBottomRightRadius.replace(
          /\D/g,
          ""
        );
      }
      if (obj.borderBottomLeftRadius) {
        objBorderRadius.bottomLeft = +obj.borderBottomLeftRadius.replace(
          /\D/g,
          ""
        );
      }
      setContentAreaBorderAll({
        ...contentAreaBorderAll,
        ...objBorderAll,
      });
      setContentAreaBorderTop({
        ...contentAreaBorderTop,
        ...objBorderTop,
      });
      setContentAreaBorderRight({
        ...contentAreaBorderRight,
        ...objBorderRight,
      });
      setContentAreaBorderBottom({
        ...contentAreaBorderBottom,
        ...objBorderBottom,
      });
      setContentAreaBorderLeft({
        ...contentAreaBorderLeft,
        ...objBorderLeft,
      });
      setContentAreaRounded({
        ...contentAreaRounded,
        ...objBorderRadius,
      });
    }
  }, []);

  useEffect(() => {
    const row = data?.rows[rowIndex];
    const column = row?.columns[columnNumber - 1];
    if (column) {
      setColumnBgColor(
        getStyleObjectFromString(column.columnStyle)["backgroundColor"]
      );
      const obj = getStyleObjectFromString(column.columnStyle);
      let objColumnPadding = {};
      let objColumnBorderAll = {};
      let objColumnBorderTop = {};
      let objColumnBorderRight = {};
      let objColumnBorderBottom = {};
      let objColumnBorderLeft = {};
      if (obj.padding) {
        objColumnPadding.all = +obj.padding.replace(/\D/g, "");
      }
      if (obj.paddingTop) {
        objColumnPadding.top = +obj.paddingTop.replace(/\D/g, "");
      }
      if (obj.paddingRight) {
        objColumnPadding.right = +obj.paddingRight.replace(/\D/g, "");
      }
      if (obj.paddingBottom) {
        objColumnPadding.bottom = +obj.paddingBottom.replace(/\D/g, "");
      }
      if (obj.paddingLeft) {
        objColumnPadding.left = +obj.paddingLeft.replace(/\D/g, "");
      }
      if (obj.borderStyle) {
        objColumnBorderAll.style = obj.borderStyle;
      }
      if (obj.borderWidth) {
        objColumnBorderAll.width = +obj.borderWidth.replace(/\D/g, "");
      }
      if (obj.borderColor) {
        objColumnBorderAll.color = obj.borderColor;
      }
      if (obj.borderTopStyle) {
        objColumnBorderTop.style = obj.borderTopStyle;
      }
      if (obj.borderTopWidth) {
        objColumnBorderTop.width = +obj.borderTopWidth.replace(/\D/g, "");
      }
      if (obj.borderTopColor) {
        objColumnBorderTop.color = obj.borderTopColor;
      }
      if (obj.borderRightStyle) {
        objColumnBorderRight.style = obj.borderRightStyle;
      }
      if (obj.borderRightWidth) {
        objColumnBorderRight.width = +obj.borderRightWidth.replace(/\D/g, "");
      }
      if (obj.borderRightColor) {
        objColumnBorderRight.color = obj.borderRightColor;
      }
      if (obj.borderBottomStyle) {
        objColumnBorderBottom.style = obj.borderBottomStyle;
      }
      if (obj.borderBottomWidth) {
        objColumnBorderBottom.width = +obj.borderBottomWidth.replace(/\D/g, "");
      }
      if (obj.borderBottomColor) {
        objColumnBorderBottom.color = obj.borderBottomColor;
      }
      if (obj.borderLeftStyle) {
        objColumnBorderLeft.style = obj.borderLeftStyle;
      }
      if (obj.borderLeftWidth) {
        objColumnBorderLeft.width = +obj.borderLeftWidth.replace(/\D/g, "");
      }
      if (obj.borderLeftColor) {
        objColumnBorderLeft.color = obj.borderLeftColor;
      }
      setColumnPadding({
        ...columnPadding,
        ...objColumnPadding,
      });
      setColumnBorderAll({
        ...columnBorderAll,
        ...objColumnBorderAll,
      });
      setColumnBorderTop({
        ...columnBorderTop,
        ...objColumnBorderTop,
      });
      setColumnBorderRight({
        ...columnBorderRight,
        ...objColumnBorderRight,
      });
      setColumnBorderBottom({
        ...columnBorderBottom,
        ...objColumnBorderBottom,
      });
      setColumnBorderLeft({
        ...columnBorderLeft,
        ...objColumnBorderLeft,
      });
    }
  }, [data, rowIndex, columnNumber]);
  return (
    <div className="space_tool h-full">
      <div className="bg-gray-50 h-[78%] overflow-auto">
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          BACKGROUNDS
        </div>
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Row background color
          </span>
          <div className="flex-1 flex justify-end">
            <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-3/5">
              <input
                type="color"
                defaultValue={rowBgColor}
                onChange={(e) => {
                  setRowBgColor(e.target.value);
                  dispatch(updateRowBackgroundColor(e.target.value));
                }}
              />
              <span>{rowBgColor}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Content area background color
          </span>
          <div className="flex-1 flex justify-end">
            <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-4/5">
              <input
                type="color"
                defaultValue={contentAreaBgColor}
                onChange={(e) => {
                  setContentAreaBgColor(e.target.value);
                  dispatch(updateContentAreaBackgroundColor(e.target.value));
                }}
              />
              <span>{contentAreaBgColor}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[14px] opacity-70 font-semibold">
              Row background image
            </span>
            <Switch
              defaultSelected={false}
              color="secondary"
              onChange={() => setActiveRowBgImg(!activeRowBgImg)}
            />
          </div>
          {activeRowBgImg ? (
            <>
              <div className="flex flex-col gap-y-2">
                <Button
                  className="font-bold text-[14px] w-fit"
                  color="secondary"
                  onClick={() => {
                    dispatch(changeUploadFileStatus(true));
                    dispatch(changeInsertRowImageBgStatus(true));
                  }}
                >
                  Choose image
                </Button>
                <Input
                  key="primary"
                  type="text"
                  color="secondary"
                  placeholder="Enter your URL"
                  className="w-full"
                  value={imageLink}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    if (isImageLink(imageLink)) {
                      dispatch(
                        updateBackgroundImage({
                          area: area,
                          url: `url('${imageLink}')`,
                        })
                      );
                      const temp = area === "ROW" ? "CONTENT AREA" : "ROW";
                      dispatch(removeBackgroundImage(temp));
                    } else if (e.target.value === "") {
                      dispatch(removeBackgroundImage(area));
                    }
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] opacity-70 font-semibold">
                  Apply image to
                </span>
                <Select
                  label="Select area"
                  className="max-w-xs"
                  color="secondary"
                  onChange={(e) => {
                    const currentArea = area;
                    setArea(areaList[+e.target.value]);
                    dispatch(
                      changeBackgroundImageArea(areaList[+e.target.value])
                    );
                    if (currentArea !== areaList[+e.target.value]) {
                      if (areaList[+e.target.value] === "ROW") {
                        dispatch(
                          updateBackgroundImage({
                            area: "ROW",
                            url: `url('${imageLink}')`,
                          })
                        );
                        dispatch(removeBackgroundImage("CONTENT AREA"));
                      } else {
                        dispatch(
                          updateBackgroundImage({
                            area: "CONTENT AREA",
                            url: `url('${imageLink}')`,
                          })
                        );
                        dispatch(removeBackgroundImage("ROW"));
                      }
                    }
                  }}
                >
                  {areaList.map((area, index) => (
                    <SelectItem key={index} value={index}>
                      {area}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex gap-x-2">
                <div className="flex items-center">
                  <Switch
                    defaultSelected={isFitToBackground}
                    color="secondary"
                    onChange={(e) => {
                      const value = e.target.checked ? "cover" : "auto";
                      if (
                        data?.rows[rowIndex]?.rowStyle.includes(
                          "background-size"
                        ) ||
                        data?.rows[rowIndex]?.contentAreaStyle.includes(
                          "background-size"
                        )
                      ) {
                        dispatch(
                          updateBackgroundSize({
                            area: area,
                            size: value,
                          })
                        );
                      }
                      setIsFitToBackground(e.target.checked);
                    }}
                  />
                  <span className="text-[14px] opacity-70 font-semibold">
                    Fit to background
                  </span>
                </div>
                <div className="flex items-center">
                  <Switch
                    defaultSelected={isRepeat}
                    color="secondary"
                    onChange={(e) => {
                      const value = e.target.checked ? "repeat" : "no-repeat";
                      if (
                        data?.rows[rowIndex]?.rowStyle.includes(
                          "background-repeat"
                        ) ||
                        data?.rows[rowIndex]?.contentAreaStyle.includes(
                          "background-repeat"
                        )
                      ) {
                        dispatch(
                          updateBackgroundRepeat({
                            area: area,
                            repeat: value,
                          })
                        );
                      }
                      setIsRepeat(e.target.checked);
                    }}
                  />
                  <span className="text-[14px] opacity-70 font-semibold">
                    Repeat
                  </span>
                </div>
                <div className="flex items-center">
                  <Switch
                    defaultSelected={isCenter}
                    color="secondary"
                    onChange={(e) => {
                      const value = e.target.checked
                        ? "center top"
                        : "left top";
                      if (
                        data?.rows[rowIndex]?.rowStyle.includes(
                          "background-position"
                        ) ||
                        data?.rows[rowIndex]?.contentAreaStyle.includes(
                          "background-position"
                        )
                      ) {
                        dispatch(
                          updateBackgroundPosition({
                            area: area,
                            position: value,
                          })
                        );
                      }
                      setIsCenter(e.target.checked);
                    }}
                  />
                  <span className="text-[14px] opacity-70 font-semibold">
                    Center
                  </span>
                </div>
              </div>
              <p className="text-[12px] opacity-50 font-semibold">
                Background image support varies across email clients. Choose a
                fallback content area background color for optimal results.
              </p>
            </>
          ) : (
            ""
          )}
        </div>
        <hr />
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          BORDERS
        </div>
        <div className="px-5 py-2 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Content area border</span>
            <div className="flex items-center gap-x-2">
              <span>More options</span>
              <Switch
                defaultSelected={false}
                color="secondary"
                onChange={(e) => setCheckContentAreaBorder(e.target.checked)}
              />
            </div>
          </div>
          {!checkContentAreaBorder ? (
            <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
              <div className="flex flex-col gap-y-2">
                <span>All sides</span>
              </div>
              <div className="flex-1 flex flex-col gap-y-2">
                <div className="flex-1 flex justify-end">
                  <Select
                    label="Select border style"
                    className="max-w-xs"
                    color="secondary"
                    onChange={(e) => {
                      const value = styleBorderList[+e.target.value];
                      setContentAreaBorderAll({
                        ...contentAreaBorderAll,
                        style: value,
                      });
                      dispatch(
                        updateContentAreaBorder({
                          ...contentAreaBorderAll,
                          style: value,
                        })
                      );
                    }}
                  >
                    {styleBorderList.map((style, index) => (
                      <SelectItem key={index} value={index}>
                        {style}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                  <div className="flex border rounded-sm">
                    <div
                      className="bg-white px-2 border text-[14px] cursor-pointer"
                      onClick={() => {
                        const value =
                          +contentAreaBorderAll.width - 1 < 0
                            ? 0
                            : +contentAreaBorderAll.width - 1;
                        setContentAreaBorderAll({
                          ...contentAreaBorderAll,
                          width: value,
                        });
                        setContentAreaBorderTop({
                          ...contentAreaBorderTop,
                          width: value,
                        });
                        setContentAreaBorderRight({
                          ...contentAreaBorderRight,
                          width: value,
                        });
                        setContentAreaBorderBottom({
                          ...contentAreaBorderBottom,
                          width: value,
                        });
                        setContentAreaBorderLeft({
                          ...contentAreaBorderLeft,
                          width: value,
                        });
                        dispatch(
                          updateContentAreaBorder({
                            ...contentAreaBorderAll,
                            width: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderTop({
                            ...contentAreaBorderTop,
                            width: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderRight({
                            ...contentAreaBorderRight,
                            width: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderBottom({
                            ...contentAreaBorderBottom,
                            width: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderLeft({
                            ...contentAreaBorderLeft,
                            width: value,
                          })
                        );
                      }}
                    >
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">
                      {contentAreaBorderAll?.width}
                    </div>
                    <div
                      className="bg-white px-2 border text-[14px] cursor-pointer"
                      onClick={() => {
                        const value = +contentAreaBorderAll.width + 1;
                        setContentAreaBorderAll({
                          ...contentAreaBorderAll,
                          width: value,
                        });
                        setContentAreaBorderTop({
                          ...contentAreaBorderTop,
                          width: value,
                        });
                        setContentAreaBorderRight({
                          ...contentAreaBorderRight,
                          width: value,
                        });
                        setContentAreaBorderBottom({
                          ...contentAreaBorderBottom,
                          width: value,
                        });
                        setContentAreaBorderLeft({
                          ...contentAreaBorderLeft,
                          width: value,
                        });
                        dispatch(
                          updateContentAreaBorder({
                            ...contentAreaBorderAll,
                            width: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderTop({
                            ...contentAreaBorderTop,
                            width: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderRight({
                            ...contentAreaBorderRight,
                            width: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderBottom({
                            ...contentAreaBorderBottom,
                            width: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderLeft({
                            ...contentAreaBorderLeft,
                            width: value,
                          })
                        );
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input
                      type="color"
                      defaultValue={contentAreaBorderAll?.color}
                      onChange={(event) => {
                        const value = event.target.value;
                        setContentAreaBorderAll({
                          ...contentAreaBorderAll,
                          color: value,
                        });
                        setContentAreaBorderTop({
                          ...contentAreaBorderTop,
                          color: value,
                        });
                        setContentAreaBorderRight({
                          ...contentAreaBorderRight,
                          color: value,
                        });
                        setContentAreaBorderBottom({
                          ...contentAreaBorderBottom,
                          color: value,
                        });
                        setContentAreaBorderLeft({
                          ...contentAreaBorderLeft,
                          color: value,
                        });
                        dispatch(
                          updateContentAreaBorder({
                            ...contentAreaBorderAll,
                            color: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderTop({
                            ...contentAreaBorderTop,
                            color: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderRight({
                            ...contentAreaBorderRight,
                            color: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderBottom({
                            ...contentAreaBorderBottom,
                            color: value,
                          })
                        );
                        dispatch(
                          updateContentAreaBorderLeft({
                            ...contentAreaBorderLeft,
                            color: value,
                          })
                        );
                      }}
                    />
                    <span>
                      {contentAreaBorderAll?.color
                        ? contentAreaBorderAll.color
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                <div className="flex flex-col gap-y-2">
                  <span>Top</span>
                </div>
                <div className="flex-1 flex flex-col gap-y-2">
                  <div className="flex-1 flex justify-end">
                    <Select
                      label="Select border style"
                      className="max-w-xs"
                      color="secondary"
                      onChange={(e) => {
                        const value = styleBorderList[+e.target.value];
                        setContentAreaBorderTop({
                          ...contentAreaBorderTop,
                          style: value,
                        });
                        dispatch(
                          updateContentAreaBorderTop({
                            ...contentAreaBorderTop,
                            style: value,
                          })
                        );
                      }}
                    >
                      {styleBorderList.map((style, index) => (
                        <SelectItem key={index} value={index}>
                          {style}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +contentAreaBorderTop.width - 1 < 0
                              ? 0
                              : +contentAreaBorderTop.width - 1;
                          setContentAreaBorderTop({
                            ...contentAreaBorderTop,
                            width: value,
                          });
                          dispatch(
                            updateContentAreaBorderTop({
                              ...contentAreaBorderTop,
                              width: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {contentAreaBorderTop?.width}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +contentAreaBorderTop.width + 1;
                          setContentAreaBorderTop({
                            ...contentAreaBorderTop,
                            width: value,
                          });
                          dispatch(
                            updateContentAreaBorderTop({
                              ...contentAreaBorderTop,
                              width: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                      <input
                        type="color"
                        defaultValue={contentAreaBorderTop?.color}
                        onChange={(e) => {
                          const value = e.target.value;
                          setContentAreaBorderTop({
                            ...contentAreaBorderTop,
                            color: value,
                          });
                          dispatch(
                            updateContentAreaBorderTop({
                              ...contentAreaBorderTop,
                              color: value,
                            })
                          );
                        }}
                      />
                      <span>
                        {contentAreaBorderTop?.color
                          ? contentAreaBorderTop.color
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                <div className="flex flex-col gap-y-2">
                  <span>Right</span>
                </div>
                <div className="flex-1 flex flex-col gap-y-2">
                  <div className="flex-1 flex justify-end">
                    <Select
                      label="Select border style"
                      className="max-w-xs"
                      color="secondary"
                      onChange={(e) => {
                        const value = styleBorderList[+e.target.value];
                        setContentAreaBorderRight({
                          ...contentAreaBorderRight,
                          style: value,
                        });
                        dispatch(
                          updateContentAreaBorderRight({
                            ...contentAreaBorderRight,
                            style: value,
                          })
                        );
                      }}
                    >
                      {styleBorderList.map((style, index) => (
                        <SelectItem key={index} value={index}>
                          {style}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +contentAreaBorderRight.width - 1 < 0
                              ? 0
                              : +contentAreaBorderRight.width - 1;
                          setContentAreaBorderRight({
                            ...contentAreaBorderRight,
                            width: value,
                          });
                          dispatch(
                            updateContentAreaBorderRight({
                              ...contentAreaBorderRight,
                              width: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {contentAreaBorderRight?.width}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +contentAreaBorderRight.width + 1;
                          setContentAreaBorderRight({
                            ...contentAreaBorderRight,
                            width: value,
                          });
                          dispatch(
                            updateContentAreaBorderRight({
                              ...contentAreaBorderRight,
                              width: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                      <input
                        type="color"
                        defaultValue={contentAreaBorderRight?.color}
                        onChange={(e) => {
                          const value = e.target.value;
                          setContentAreaBorderRight({
                            ...contentAreaBorderRight,
                            color: value,
                          });
                          dispatch(
                            updateContentAreaBorderRight({
                              ...contentAreaBorderRight,
                              color: value,
                            })
                          );
                        }}
                      />
                      <span>
                        {contentAreaBorderRight?.color
                          ? contentAreaBorderRight.color
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                <div className="flex flex-col gap-y-2">
                  <span>Bottom</span>
                </div>
                <div className="flex-1 flex flex-col gap-y-2">
                  <div className="flex-1 flex justify-end">
                    <Select
                      label="Select border style"
                      className="max-w-xs"
                      color="secondary"
                      onChange={(e) => {
                        const value = styleBorderList[+e.target.value];
                        setContentAreaBorderBottom({
                          ...contentAreaBorderBottom,
                          style: value,
                        });
                        dispatch(
                          updateContentAreaBorderBottom({
                            ...contentAreaBorderBottom,
                            style: value,
                          })
                        );
                      }}
                    >
                      {styleBorderList.map((style, index) => (
                        <SelectItem key={index} value={index}>
                          {style}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +contentAreaBorderBottom.width - 1 < 0
                              ? 0
                              : +contentAreaBorderBottom.width - 1;
                          setContentAreaBorderBottom({
                            ...contentAreaBorderBottom,
                            width: value,
                          });
                          dispatch(
                            updateContentAreaBorderBottom({
                              ...contentAreaBorderBottom,
                              width: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {contentAreaBorderBottom?.width}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +contentAreaBorderBottom.width + 1;
                          setContentAreaBorderBottom({
                            ...contentAreaBorderBottom,
                            width: value,
                          });
                          dispatch(
                            updateContentAreaBorderBottom({
                              ...contentAreaBorderBottom,
                              width: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                      <input
                        type="color"
                        defaultValue={contentAreaBorderBottom?.color}
                        onChange={(e) => {
                          const value = e.target.value;
                          setContentAreaBorderBottom({
                            ...contentAreaBorderBottom,
                            color: value,
                          });
                          dispatch(
                            updateContentAreaBorderBottom({
                              ...contentAreaBorderBottom,
                              color: value,
                            })
                          );
                        }}
                      />
                      <span>
                        {contentAreaBorderBottom?.color
                          ? contentAreaBorderBottom.color
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                <div className="flex flex-col gap-y-2">
                  <span>Left</span>
                </div>
                <div className="flex-1 flex flex-col gap-y-2">
                  <div className="flex-1 flex justify-end">
                    <Select
                      label="Select border style"
                      className="max-w-xs"
                      color="secondary"
                      onChange={(e) => {
                        const value = styleBorderList[+e.target.value];
                        setContentAreaBorderLeft({
                          ...contentAreaBorderLeft,
                          style: value,
                        });
                        dispatch(
                          updateContentAreaBorderLeft({
                            ...contentAreaBorderLeft,
                            style: value,
                          })
                        );
                      }}
                    >
                      {styleBorderList.map((style, index) => (
                        <SelectItem key={index} value={index}>
                          {style}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +contentAreaBorderLeft.width - 1 < 0
                              ? 0
                              : +contentAreaBorderLeft.width - 1;
                          setContentAreaBorderLeft({
                            ...contentAreaBorderLeft,
                            width: value,
                          });
                          dispatch(
                            updateContentAreaBorderLeft({
                              ...contentAreaBorderLeft,
                              width: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {contentAreaBorderLeft?.width}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +contentAreaBorderLeft.width + 1;
                          setContentAreaBorderLeft({
                            ...contentAreaBorderLeft,
                            width: value,
                          });
                          dispatch(
                            updateContentAreaBorderLeft({
                              ...contentAreaBorderLeft,
                              width: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                      <input
                        type="color"
                        defaultValue={contentAreaBorderLeft?.color}
                        onChange={(e) => {
                          const value = e.target.value;
                          setContentAreaBorderLeft({
                            ...contentAreaBorderLeft,
                            color: value,
                          });
                          dispatch(
                            updateContentAreaBorderLeft({
                              ...contentAreaBorderLeft,
                              color: value,
                            })
                          );
                        }}
                      />
                      <span>
                        {contentAreaBorderLeft?.color
                          ? contentAreaBorderLeft.color
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="px-5 py-5 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Content area rounded corners</span>
            <div className="flex items-center gap-x-2">
              <span>More options</span>
              <Switch
                defaultSelected={false}
                color="secondary"
                onChange={(e) => {
                  setCheckContentAreaRounded(e.target.checked);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between gap-x-5 text-[14px] opacity-70 font-semibold">
            {!checkContentAreaRounded ? (
              <div className="flex flex-col gap-y-2">
                <span>All corners</span>
                <div className="flex border rounded-sm">
                  <div
                    className="bg-white px-2 border text-[14px] cursor-pointer"
                    onClick={() => {
                      const value =
                        +contentAreaRounded?.all - 1 < 0
                          ? 0
                          : +contentAreaRounded?.all - 1;
                      setContentAreaRounded({
                        all: value,
                        topLeft: value,
                        topRight: value,
                        bottomRight: value,
                        bottomLeft: value,
                      });
                      dispatch(
                        updateContentAreaBorderRadius({
                          all: value,
                          topLeft: value,
                          topRight: value,
                          bottomRight: value,
                          bottomLeft: value,
                        })
                      );
                    }}
                  >
                    -
                  </div>
                  <div className="bg-white px-2 border text-[15px] ">
                    {contentAreaRounded?.all}
                  </div>
                  <div
                    className="bg-white px-2 border text-[14px] cursor-pointer"
                    onClick={() => {
                      const value = +contentAreaRounded?.all + 1;
                      setContentAreaRounded({
                        all: value,
                        topLeft: value,
                        topRight: value,
                        bottomRight: value,
                        bottomLeft: value,
                      });
                      dispatch(
                        updateContentAreaBorderRadius({
                          all: value,
                          topLeft: value,
                          topRight: value,
                          bottomRight: value,
                          bottomLeft: value,
                        })
                      );
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-y-2">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-y-2">
                    <span>Top-Left</span>
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +contentAreaRounded?.topLeft - 1 < 0
                              ? 0
                              : +contentAreaRounded?.topLeft - 1;
                          setContentAreaRounded({
                            ...contentAreaRounded,
                            topLeft: value,
                          });
                          dispatch(
                            updateContentAreaBorderRadius({
                              topLeft: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {contentAreaRounded?.topLeft}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +contentAreaRounded?.topLeft + 1;
                          setContentAreaRounded({
                            ...contentAreaRounded,
                            topLeft: value,
                          });
                          dispatch(
                            updateContentAreaBorderRadius({
                              topLeft: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <span>Top-Right</span>
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +contentAreaRounded?.topRight - 1 < 0
                              ? 0
                              : +contentAreaRounded?.topRight - 1;
                          setContentAreaRounded({
                            ...contentAreaRounded,
                            topRight: value,
                          });
                          dispatch(
                            updateContentAreaBorderRadius({
                              topRight: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {contentAreaRounded?.topRight}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +contentAreaRounded?.topRight + 1;
                          setContentAreaRounded({
                            ...contentAreaRounded,
                            topRight: value,
                          });
                          dispatch(
                            updateContentAreaBorderRadius({
                              topRight: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-y-2">
                    <span>Bottom-Left</span>
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +contentAreaRounded?.bottomLeft - 1 < 0
                              ? 0
                              : +contentAreaRounded?.bottomLeft - 1;
                          setContentAreaRounded({
                            ...contentAreaRounded,
                            bottomLeft: value,
                          });
                          dispatch(
                            updateContentAreaBorderRadius({
                              bottomLeft: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {contentAreaRounded?.bottomLeft}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +contentAreaRounded?.bottomLeft + 1;
                          setContentAreaRounded({
                            ...contentAreaRounded,
                            bottomLeft: value,
                          });
                          dispatch(
                            updateContentAreaBorderRadius({
                              bottomLeft: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <span>Bottom-Right</span>
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +contentAreaRounded?.bottomRight - 1 < 0
                              ? 0
                              : +contentAreaRounded?.bottomRight - 1;
                          setContentAreaRounded({
                            ...contentAreaRounded,
                            bottomRight: value,
                          });
                          dispatch(
                            updateContentAreaBorderRadius({
                              bottomRight: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {contentAreaRounded?.bottomRight}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +contentAreaRounded?.bottomRight + 1;
                          setContentAreaRounded({
                            ...contentAreaRounded,
                            bottomRight: value,
                          });
                          dispatch(
                            updateContentAreaBorderRadius({
                              bottomRight: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <Image src={letterImg} alt="letter" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          LAYOUT
        </div>
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Vertical Align
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <BiSolidObjectsVerticalTop />
            <BiSolidObjectsVerticalCenter />
            <BiSolidObjectsVerticalBottom />
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold px-5 py-2">
          <span>Stack on mobile</span>
          <Switch
            defaultSelected={false}
            color="secondary"
            onChange={(e) => {
              setCheckStackOnMobile(e.target.checked);
            }}
          />
        </div>
        <hr />
        {checkStackOnMobile ? (
          <>
            <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold px-5 py-2">
              <span>Stack order on mobile</span>
              <Select
                label="Select type"
                className="max-w-xs"
                color="secondary"
              >
                <SelectItem value={"default"}>Default</SelectItem>
                <SelectItem value={"reverse"}>Reverse</SelectItem>
              </Select>
            </div>
            <hr />
          </>
        ) : (
          ""
        )}
        <div className="px-5 py-2 flex justify-between text-[14px] opacity-70 font-semibold items-center">
          <span>Hide on</span>
          <div className="flex items-center border text-[18px]">
            <div className="px-2 py-2 cursor-pointer border-r rounded-sm">
              <FaDesktop />
            </div>
            <div className="px-2 py-2 cursor-pointer">
              <MdPhoneAndroid />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          <span>COLUMNS STRUCTURE</span>
          <div className="flex flex-col gap-y-2">
            <Button
              className="font-bold text-[14px] w-fit ml-auto"
              color="secondary"
              onClick={() => {
                if (!row?.columns) return;
                dispatch(addColumn());
              }}
            >
              <FaPlusCircle /> Add new
            </Button>
            <div className="grid grid-cols-12 gap-2">
              {row?.columns.map((column, index) => {
                let colSpan;
                if (column?.colSpan) {
                  colSpan = colSpans[column?.colSpan];
                }
                return (
                  <div
                    className={
                      "bg-white h-[60px] border-2 rounded-md flex justify-center items-center font-bold border-solid border-violet-600 text-violet-700 cursor-pointer " +
                      colSpan
                    }
                    key={index}
                    id={index}
                    onClick={(e) => {
                      const columnIndex = +e.target.id + 1;
                      setColumnNumber(columnIndex);
                      dispatch(updateColumnIndex(+e.target.id));
                    }}
                  >
                    {column?.colSpan * 2}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Edit column */}
        {row?.columns?.length ? (
          <>
            <div className="px-5 py-2 flex flex-col gap-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[14px] opacity-70 font-semibold">
                  COLUMN {columnNumber}
                </span>
                <Button
                  className="font-bold text-[14px] w-fit ml-auto"
                  color="danger"
                  id={columnNumber - 1}
                  onClick={(e) => {
                    dispatch(deleteColumn(+e.target.id));
                    const num = +e.target.id < 1 ? 1 : +e.target.id;
                    setColumnNumber(num);
                  }}
                >
                  Delete
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] opacity-70 font-semibold">
                  Column background
                </span>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-3/5">
                    <input
                      type="color"
                      defaultValue={columnBgColor}
                      onChange={(e) => {
                        const value = e.target.value;
                        setColumnBgColor(value);
                        dispatch(updateColumnBackgroundColor(value));
                      }}
                    />
                    <span>{columnBgColor}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="px-5 py-5 flex flex-col gap-y-4">
              <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
                <span>Padding</span>
                <div className="flex items-center gap-x-2">
                  <span>More options</span>
                  <Switch
                    defaultSelected={false}
                    color="secondary"
                    onChange={(e) => {
                      setCheckColumnPadding(e.target.checked);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-x-5 text-[14px] opacity-70 font-semibold">
                {!checkColumnPadding ? (
                  <div className="flex flex-col gap-y-2">
                    <span>All corners</span>
                    <div className="flex border rounded-sm">
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value =
                            +columnPadding.all - 1 < 0
                              ? 0
                              : +columnPadding.all - 1;
                          setColumnPadding({
                            all: value,
                            top: value,
                            right: value,
                            bottom: value,
                            left: value,
                          });
                          dispatch(
                            updateColumnPadding({
                              all: value,
                              top: value,
                              right: value,
                              bottom: value,
                              left: value,
                            })
                          );
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {columnPadding.all}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          const value = +columnPadding.all + 1;
                          setColumnPadding({
                            all: value,
                            top: value,
                            right: value,
                            bottom: value,
                            left: value,
                          });
                          dispatch(
                            updateColumnPadding({
                              all: value,
                              top: value,
                              right: value,
                              bottom: value,
                              left: value,
                            })
                          );
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col gap-y-2">
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-y-2">
                        <span>Top</span>
                        <div className="flex border rounded-sm">
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value =
                                +columnPadding.top - 1 < 0
                                  ? 0
                                  : +columnPadding.top - 1;
                              setColumnPadding({
                                ...columnPadding,
                                top: value,
                              });
                              dispatch(
                                updateColumnPadding({
                                  ...columnPadding,
                                  top: value,
                                })
                              );
                            }}
                          >
                            -
                          </div>
                          <div className="bg-white px-2 border text-[15px] ">
                            {columnPadding.top}
                          </div>
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value = +columnPadding.top + 1;
                              setColumnPadding({
                                ...columnPadding,
                                top: value,
                              });
                              dispatch(
                                updateColumnPadding({
                                  ...columnPadding,
                                  top: value,
                                })
                              );
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <span>Right</span>
                        <div className="flex border rounded-sm">
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value =
                                +columnPadding.right - 1 < 0
                                  ? 0
                                  : +columnPadding.right - 1;
                              setColumnPadding({
                                ...columnPadding,
                                right: value,
                              });
                              dispatch(
                                updateColumnPadding({
                                  ...columnPadding,
                                  right: value,
                                })
                              );
                            }}
                          >
                            -
                          </div>
                          <div className="bg-white px-2 border text-[15px] ">
                            {columnPadding.right}
                          </div>
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value = +columnPadding.right + 1;
                              setColumnPadding({
                                ...columnPadding,
                                right: value,
                              });
                              dispatch(
                                updateColumnPadding({
                                  ...columnPadding,
                                  right: value,
                                })
                              );
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-y-2">
                        <span>Bottom</span>
                        <div className="flex border rounded-sm">
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value =
                                +columnPadding.bottom - 1 < 0
                                  ? 0
                                  : +columnPadding.bottom - 1;
                              setColumnPadding({
                                ...columnPadding,
                                bottom: value,
                              });
                              dispatch(
                                updateColumnPadding({
                                  ...columnPadding,
                                  bottom: value,
                                })
                              );
                            }}
                          >
                            -
                          </div>
                          <div className="bg-white px-2 border text-[15px] ">
                            {columnPadding.bottom}
                          </div>
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value = +columnPadding.bottom + 1;
                              setColumnPadding({
                                ...columnPadding,
                                bottom: value,
                              });
                              dispatch(
                                updateColumnPadding({
                                  ...columnPadding,
                                  bottom: value,
                                })
                              );
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <span>Left</span>
                        <div className="flex border rounded-sm">
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value =
                                +columnPadding.left - 1 < 0
                                  ? 0
                                  : +columnPadding.left - 1;
                              setColumnPadding({
                                ...columnPadding,
                                left: value,
                              });
                              dispatch(
                                updateColumnPadding({
                                  ...columnPadding,
                                  left: value,
                                })
                              );
                            }}
                          >
                            -
                          </div>
                          <div className="bg-white px-2 border text-[15px] ">
                            {columnPadding.left}
                          </div>
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value = +columnPadding.left + 1;
                              setColumnPadding({
                                ...columnPadding,
                                left: value,
                              });
                              dispatch(
                                updateColumnPadding({
                                  ...columnPadding,
                                  left: value,
                                })
                              );
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <Image src={letterImg} alt="letter" />
                </div>
              </div>
            </div>
            <hr />
            <div className="px-5 py-2 flex flex-col gap-y-4">
              <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
                <span>Border</span>
                <div className="flex items-center gap-x-2">
                  <span>More options</span>
                  <Switch
                    defaultSelected={false}
                    color="secondary"
                    onChange={(e) => {
                      setCheckColumnBorder(e.target.checked);
                    }}
                  />
                </div>
              </div>
              {!checkColumnBorder ? (
                <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                  <div className="flex flex-col gap-y-2">
                    <span>All sides</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-y-2">
                    <div className="flex-1 flex justify-end">
                      <Select
                        label="Select border style"
                        className="max-w-xs"
                        color="secondary"
                        onChange={(e) => {
                          const value = styleBorderList[+e.target.value];
                          setColumnBorderAll({
                            ...columnBorderAll,
                            style: value,
                          });
                          dispatch(
                            updateColumnBorder({
                              ...columnBorderAll,
                              style: value,
                            })
                          );
                        }}
                      >
                        {styleBorderList.map((style, index) => (
                          <SelectItem key={index} value={index}>
                            {style}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                      <div className="flex border rounded-sm">
                        <div
                          className="bg-white px-2 border text-[14px] cursor-pointer"
                          onClick={() => {
                            const value =
                              +columnBorderAll.width - 1 < 0
                                ? 0
                                : +columnBorderAll.width - 1;
                            setColumnBorderAll({
                              ...columnBorderAll,
                              width: value,
                            });
                            setColumnBorderTop({
                              ...columnBorderTop,
                              width: value,
                            });
                            setColumnBorderRight({
                              ...columnBorderRight,
                              width: value,
                            });
                            setColumnBorderBottom({
                              ...columnBorderBottom,
                              width: value,
                            });
                            setColumnBorderLeft({
                              ...columnBorderLeft,
                              width: value,
                            });
                            dispatch(
                              updateColumnBorder({
                                ...columnBorderAll,
                                width: value,
                              })
                            );
                            dispatch(
                              updateColumnBorderTop({
                                ...columnBorderTop,
                                width: value,
                              })
                            );
                            dispatch(
                              updateColumnBorderRight({
                                ...columnBorderRight,
                                width: value,
                              })
                            );
                            dispatch(
                              updateColumnBorderBottom({
                                ...columnBorderBottom,
                                width: value,
                              })
                            );
                            dispatch(
                              updateColumnBorderLeft({
                                ...columnBorderLeft,
                                width: value,
                              })
                            );
                          }}
                        >
                          -
                        </div>
                        <div className="bg-white px-2 border text-[15px] ">
                          {columnBorderAll?.width}
                        </div>
                        <div
                          className="bg-white px-2 border text-[14px] cursor-pointer"
                          onClick={() => {
                            const value = +columnBorderAll.width + 1;
                            setColumnBorderAll({
                              ...columnBorderAll,
                              width: value,
                            });
                            setColumnBorderTop({
                              ...columnBorderTop,
                              width: value,
                            });
                            setColumnBorderRight({
                              ...columnBorderRight,
                              width: value,
                            });
                            setColumnBorderBottom({
                              ...columnBorderBottom,
                              width: value,
                            });
                            setColumnBorderLeft({
                              ...columnBorderLeft,
                              width: value,
                            });
                            dispatch(
                              updateColumnBorder({
                                ...columnBorderAll,
                                width: value,
                              })
                            );
                            dispatch(
                              updateColumnBorderTop({
                                ...columnBorderTop,
                                width: value,
                              })
                            );
                            dispatch(
                              updateColumnBorderRight({
                                ...columnBorderRight,
                                width: value,
                              })
                            );
                            dispatch(
                              updateColumnBorderBottom({
                                ...columnBorderBottom,
                                width: value,
                              })
                            );
                            dispatch(
                              updateColumnBorderLeft({
                                ...columnBorderLeft,
                                width: value,
                              })
                            );
                          }}
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-end">
                      <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                        <input
                          type="color"
                          defaultValue={
                            columnBorderAll?.color ? columnBorderAll?.color : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setColumnBorderAll({
                              ...columnBorderAll,
                              color: value,
                            });
                            dispatch(
                              updateColumnBorder({
                                ...columnBorderAll,
                                color: value,
                              })
                            );
                          }}
                        />
                        <span>
                          {columnBorderAll?.color ? columnBorderAll.color : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                    <div className="flex flex-col gap-y-2">
                      <span>Top</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-y-2">
                      <div className="flex-1 flex justify-end">
                        <Select
                          label="Select border style"
                          className="max-w-xs"
                          color="secondary"
                          onChange={(e) => {
                            const value = styleBorderList[+e.target.value];
                            setColumnBorderTop({
                              ...columnBorderTop,
                              style: value,
                            });
                            dispatch(
                              updateColumnBorderTop({
                                ...columnBorderTop,
                                style: value,
                              })
                            );
                          }}
                        >
                          {styleBorderList.map((style, index) => (
                            <SelectItem key={index} value={index}>
                              {style}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                        <div className="flex border rounded-sm">
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value =
                                +columnBorderTop.width - 1 < 0
                                  ? 0
                                  : +columnBorderTop.width - 1;
                              setColumnBorderTop({
                                ...columnBorderTop,
                                width: value,
                              });
                              dispatch(
                                updateColumnBorderTop({
                                  ...columnBorderTop,
                                  width: value,
                                })
                              );
                            }}
                          >
                            -
                          </div>
                          <div className="bg-white px-2 border text-[15px] ">
                            {columnBorderTop?.width}
                          </div>
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value = +columnBorderTop.width + 1;
                              setColumnBorderTop({
                                ...columnBorderTop,
                                width: value,
                              });
                              dispatch(
                                updateColumnBorderTop({
                                  ...columnBorderTop,
                                  width: value,
                                })
                              );
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-end">
                        <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                          <input
                            type="color"
                            defaultValue={
                              columnBorderTop?.color
                                ? columnBorderTop.color
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setColumnBorderTop({
                                ...columnBorderTop,
                                color: value,
                              });
                              dispatch(
                                updateColumnBorderTop({
                                  ...columnBorderTop,
                                  color: value,
                                })
                              );
                            }}
                          />
                          <span>
                            {columnBorderTop?.color
                              ? columnBorderTop.color
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                    <div className="flex flex-col gap-y-2">
                      <span>Right</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-y-2">
                      <div className="flex-1 flex justify-end">
                        <Select
                          label="Select border style"
                          className="max-w-xs"
                          color="secondary"
                          onChange={(e) => {
                            const value = styleBorderList[+e.target.value];
                            setColumnBorderRight({
                              ...columnBorderRight,
                              style: value,
                            });
                            dispatch(
                              updateColumnBorderRight({
                                ...columnBorderRight,
                                style: value,
                              })
                            );
                          }}
                        >
                          {styleBorderList.map((style, index) => (
                            <SelectItem key={index} value={index}>
                              {style}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                        <div className="flex border rounded-sm">
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value =
                                +columnBorderRight.width - 1 < 0
                                  ? 0
                                  : +columnBorderRight.width - 1;
                              setColumnBorderRight({
                                ...columnBorderRight,
                                width: value,
                              });
                              dispatch(
                                updateColumnBorderRight({
                                  ...columnBorderRight,
                                  width: value,
                                })
                              );
                            }}
                          >
                            -
                          </div>
                          <div className="bg-white px-2 border text-[15px] ">
                            {columnBorderRight?.width}
                          </div>
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value = +columnBorderRight.width + 1;
                              setColumnBorderRight({
                                ...columnBorderRight,
                                width: value,
                              });
                              dispatch(
                                updateColumnBorderRight({
                                  ...columnBorderRight,
                                  width: value,
                                })
                              );
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-end">
                        <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                          <input
                            type="color"
                            defaultValue={
                              columnBorderRight?.color
                                ? columnBorderRight.color
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setColumnBorderRight({
                                ...columnBorderRight,
                                color: value,
                              });
                              dispatch(
                                updateColumnBorderRight({
                                  ...columnBorderRight,
                                  color: value,
                                })
                              );
                            }}
                          />
                          <span>
                            {columnBorderRight?.color
                              ? columnBorderRight.color
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                    <div className="flex flex-col gap-y-2">
                      <span>Bottom</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-y-2">
                      <div className="flex-1 flex justify-end">
                        <Select
                          label="Select border style"
                          className="max-w-xs"
                          color="secondary"
                          onChange={(e) => {
                            const value = styleBorderList[+e.target.value];
                            setColumnBorderBottom({
                              ...columnBorderBottom,
                              style: value,
                            });
                            dispatch(
                              updateColumnBorderBottom({
                                ...columnBorderBottom,
                                style: value,
                              })
                            );
                          }}
                        >
                          {styleBorderList.map((style, index) => (
                            <SelectItem key={index} value={index}>
                              {style}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                        <div className="flex border rounded-sm">
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value =
                                +columnBorderBottom.width - 1 < 0
                                  ? 0
                                  : +columnBorderBottom.width - 1;
                              setColumnBorderBottom({
                                ...columnBorderBottom,
                                width: value,
                              });
                              dispatch(
                                updateColumnBorderBottom({
                                  ...columnBorderBottom,
                                  width: value,
                                })
                              );
                            }}
                          >
                            -
                          </div>
                          <div className="bg-white px-2 border text-[15px] ">
                            {columnBorderBottom?.width}
                          </div>
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value = +columnBorderBottom.width + 1;
                              setColumnBorderBottom({
                                ...columnBorderBottom,
                                width: value,
                              });
                              dispatch(
                                updateColumnBorderBottom({
                                  ...columnBorderBottom,
                                  width: value,
                                })
                              );
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-end">
                        <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                          <input
                            type="color"
                            defaultValue={
                              columnBorderBottom?.color
                                ? columnBorderBottom.color
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setColumnBorderBottom({
                                ...columnBorderBottom,
                                color: value,
                              });
                              dispatch(
                                updateColumnBorderBottom({
                                  ...columnBorderBottom,
                                  color: value,
                                })
                              );
                            }}
                          />
                          <span>
                            {columnBorderBottom?.color
                              ? columnBorderBottom.color
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                    <div className="flex flex-col gap-y-2">
                      <span>Left</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-y-2">
                      <div className="flex-1 flex justify-end">
                        <Select
                          label="Select border style"
                          className="max-w-xs"
                          color="secondary"
                          onChange={(e) => {
                            const value = styleBorderList[+e.target.value];
                            setColumnBorderLeft({
                              ...columnBorderLeft,
                              style: value,
                            });
                            dispatch(
                              updateColumnBorderLeft({
                                ...columnBorderLeft,
                                style: value,
                              })
                            );
                          }}
                        >
                          {styleBorderList.map((style, index) => (
                            <SelectItem key={index} value={index}>
                              {style}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
                        <div className="flex border rounded-sm">
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value =
                                +columnBorderLeft.width - 1 < 0
                                  ? 0
                                  : +columnBorderLeft.width - 1;
                              setColumnBorderLeft({
                                ...columnBorderLeft,
                                width: value,
                              });
                              dispatch(
                                updateColumnBorderLeft({
                                  ...columnBorderLeft,
                                  width: value,
                                })
                              );
                            }}
                          >
                            -
                          </div>
                          <div className="bg-white px-2 border text-[15px] ">
                            {columnBorderLeft?.width}
                          </div>
                          <div
                            className="bg-white px-2 border text-[14px] cursor-pointer"
                            onClick={() => {
                              const value = +columnBorderLeft.width + 1;
                              setColumnBorderLeft({
                                ...columnBorderLeft,
                                width: value,
                              });
                              dispatch(
                                updateColumnBorderLeft({
                                  ...columnBorderLeft,
                                  width: value,
                                })
                              );
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-end">
                        <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                          <input
                            type="color"
                            defaultValue={
                              columnBorderLeft?.color
                                ? columnBorderLeft.color
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setColumnBorderLeft({
                                ...columnBorderLeft,
                                color: value,
                              });
                              dispatch(
                                updateColumnBorderLeft({
                                  ...columnBorderLeft,
                                  color: value,
                                })
                              );
                            }}
                          />
                          <span>
                            {columnBorderLeft?.color
                              ? columnBorderLeft.color
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <hr />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default RowEditor;
