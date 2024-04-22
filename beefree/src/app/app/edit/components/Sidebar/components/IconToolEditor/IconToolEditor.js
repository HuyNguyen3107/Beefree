"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { CiAlignLeft } from "react-icons/ci";
import { CiAlignRight } from "react-icons/ci";
import { CiAlignCenterH } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import EditOptions from "../EditOptions/EditOptions";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { editorSlice } from "@/redux/slice/editorSlice";
const {
  updatePadding,
  updatePaddingLeft,
  updatePaddingRight,
  updatePaddingTop,
  updatePaddingBottom,
  addNewIcon,
  deleteIcon,
  updateIcon,
  changeUploadFileStatus,
  changeImageIconStatus,
  updateFontFamily,
  updateFontWeight,
  updateTextColor,
  updateLetterSpacing,
  updateJustifyContent,
  updateFontSize,
  updateIconSize,
  updateColumnGap,
} = builderSlice.actions;

function IconToolEditor() {
  const dispatch = useDispatch();
  const contentList = useSelector((state) => state.builder.contentList);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
  const [isCheck, setCheck] = useState(false);
  const [padding, setPadding] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textColor, setTextColor] = useState("");
  const [iconList, setIconList] = useState([]);
  const [showList, setShowList] = useState([]);
  const fontFamilyList = [
    "Default",
    "Arial",
    "Courier New",
    "Georgia",
    "Lucida Sans Unicode",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Helvetica",
    "Impact",
    "Verdana",
  ];
  const fontWeightList = ["Bold", "Regular"];
  const iconSizeList = ["16px", "32px", "64px", "128px"];
  const iconSpaceList = ["5", "10", "15", "20", "25", "30", "35", "40"];
  useEffect(() => {
    const content = contentList.find(
      (content, index) => index === +contentIndex
    );
    setIconList(content.iconList);
  }, [contentList]);

  return (
    <div className="icon_tool h-screen">
      <EditOptions />
      <a href=""></a>
      <div className="bg-gray-50 h-[78%] overflow-auto">
        <div className="px-5 py-5 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <span>Configure icon collection</span>
          {iconList.length
            ? iconList.map((icon, index) => {
                return (
                  <div
                    className="bg-white border rounded-sm px-3 py-3 flex flex-col gap-y-2"
                    key={index}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <GiHamburgerMenu className="text-[24px]" />
                        <img
                          src={icon.src}
                          alt={icon.alt}
                          style={{ width: "32px", height: "auto" }}
                        />
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span>More options</span>
                        <Switch
                          defaultSelected={false}
                          color="secondary"
                          id={index}
                          onChange={(e) => {
                            const index =
                              e.target.parentElement.parentElement.id;
                            let temp = [...showList];
                            if (temp.includes(+index)) {
                              temp = temp.filter((item) => {
                                if (item === +index) return false;
                                return true;
                              });
                            } else {
                              temp.push(+index);
                            }
                            setShowList(temp);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        color="secondary"
                        className="font-bold text-[12px]"
                        id={index}
                        onClick={(e) => {
                          dispatch(changeUploadFileStatus(true));
                          dispatch(
                            changeImageIconStatus({
                              status: true,
                              index: +e.target?.id,
                            })
                          );
                        }}
                      >
                        Change image
                      </Button>
                      <Button
                        color="danger"
                        className="font-bold text-[12px]"
                        id={icon.src}
                        onClick={(e) => {
                          dispatch(deleteIcon(e.target?.id));
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      {showList.includes(index) ? (
                        <>
                          <Input
                            key="primary"
                            type="text"
                            color="secondary"
                            placeholder="Enter your Url"
                            label="Url"
                            className="w-full"
                            id={icon.src}
                            onBlur={(e) => {
                              let value = e.target.value;
                              dispatch(
                                updateIcon({
                                  src: e.target.id,
                                  url: value,
                                })
                              );
                            }}
                          />
                          <Input
                            key="secondary"
                            type="text"
                            color="secondary"
                            placeholder="Enter your Alt text"
                            label="Alt text"
                            className="w-full"
                            id={icon.src}
                            onBlur={(e) => {
                              let value = e.target.value;
                              dispatch(
                                updateIcon({
                                  src: e.target.id,
                                  alt: value,
                                })
                              );
                            }}
                          />
                          <Input
                            key="third"
                            type="text"
                            color="secondary"
                            placeholder="Enter your Title"
                            label="Title"
                            className="w-full"
                            id={icon.src}
                            onBlur={(e) => {
                              let value = e.target.value;
                              dispatch(
                                updateIcon({
                                  src: e.target.id,
                                  title: value,
                                })
                              );
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })
            : ""}
          <Button
            color="secondary"
            className="font-bold"
            onClick={() => {
              dispatch(addNewIcon());
            }}
          >
            <FaPlusCircle className="text-white" /> ADD NEW ICON
          </Button>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Font family
          </span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select font family"
              className="max-w-xs"
              color="secondary"
              onChange={(e) => {
                const indexFont = e.target.value;
                const font = fontFamilyList.find((font, index) => {
                  return +indexFont === +index;
                });
                dispatch(updateFontFamily(font));
              }}
            >
              {fontFamilyList.map((font, index) => (
                <SelectItem key={index} value={index}>
                  {font}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Font weight
          </span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select font-weight"
              className="max-w-xs"
              color="secondary"
              onChange={(e) => {
                const indexFont = +e.target.value;
                const font = fontWeightList.find((font, index) => {
                  return index === indexFont;
                });
                dispatch(updateFontWeight(font));
              }}
            >
              {fontWeightList.map((font, index) => (
                <SelectItem key={index} value={index}>
                  {font}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Font size
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <div className="flex border rounded-sm">
              <div
                className="bg-white px-2 border text-[14px] cursor-pointer"
                onClick={() => {
                  let value = fontSize;
                  value = value - 1;
                  if (value < 0) {
                    value = 0;
                  }
                  setFontSize(value);
                  dispatch(updateFontSize(value));
                }}
              >
                -
              </div>
              <div className="bg-white px-2 border text-[15px] ">
                {fontSize}
              </div>
              <div
                className="bg-white px-2 border text-[14px] cursor-pointer"
                onClick={() => {
                  let value = fontSize;
                  value = value + 1;
                  setFontSize(value);
                  dispatch(updateFontSize(value));
                }}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Text color
          </span>
          <div className="flex-1 flex justify-end">
            <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
              <input
                type="color"
                onChange={(e) => {
                  setTextColor(e.target.value);
                  dispatch(updateTextColor(e.target.value));
                }}
              />
              <span>{textColor}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">Align</span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <CiAlignLeft
              onClick={() => {
                dispatch(updateJustifyContent("start"));
              }}
            />
            <CiAlignCenterH
              onClick={() => {
                dispatch(updateJustifyContent("center"));
              }}
            />
            <CiAlignRight
              onClick={() => {
                dispatch(updateJustifyContent("end"));
              }}
            />
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Letter spacing
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <div className="flex border rounded-sm">
              <div
                className="bg-white px-2 border text-[14px] cursor-pointer"
                onClick={() => {
                  let value = letterSpacing;
                  value = value - 1;
                  if (value < 0) {
                    value = 0;
                  }
                  setLetterSpacing(value);
                  dispatch(updateLetterSpacing(value));
                }}
              >
                -
              </div>
              <div className="bg-white px-2 border text-[15px] ">
                {letterSpacing}
              </div>
              <div
                className="bg-white px-2 border text-[14px] cursor-pointer"
                onClick={() => {
                  let value = letterSpacing;
                  value = value + 1;
                  setLetterSpacing(value);
                  dispatch(updateLetterSpacing(value));
                }}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Icon size
          </span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select icon size"
              className="max-w-xs"
              color="secondary"
              onChange={(e) => {
                const size = iconSizeList.find(
                  (size, index) => index === +e.target.value
                );
                dispatch(updateIconSize(size));
              }}
            >
              {iconSizeList.map((size, index) => (
                <SelectItem key={index} value={index}>
                  {size}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Icon <br /> spacing
          </span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select icon spacing"
              className="max-w-xs"
              color="secondary"
              onChange={(e) => {
                const space = iconSpaceList.find(
                  (space, index) => index === +e.target.value
                );
                dispatch(updateColumnGap(+space));
              }}
            >
              {iconSpaceList.map((space, index) => (
                <SelectItem key={index} value={index}>
                  {space}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          BLOCK OPTIONS
        </div>
        <div className="px-5 py-5 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Padding</span>
            <div className="flex items-center gap-x-2">
              <span>More options</span>
              <Switch
                defaultSelected={false}
                color="secondary"
                onClick={() => {
                  let check = isCheck;
                  setCheck(!check);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between gap-x-5 text-[14px] opacity-70 font-semibold">
            {!isCheck ? (
              <div className="flex flex-col gap-y-2">
                <span>All sides</span>
                <div className="flex border rounded-sm">
                  <div
                    className="bg-white px-2 border text-[14px] cursor-pointer"
                    onClick={() => {
                      let value = padding;
                      value = value - 1;
                      if (value < 0) {
                        value = 0;
                      }
                      setPadding(value);
                      setPaddingLeft(value);
                      setPaddingRight(value);
                      setPaddingTop(value);
                      setPaddingBottom(value);
                      dispatch(updatePadding(value));
                    }}
                  >
                    -
                  </div>
                  <div className="bg-white px-2 border text-[15px] ">
                    {padding}
                  </div>
                  <div
                    className="bg-white px-2 border text-[14px] cursor-pointer"
                    onClick={() => {
                      let value = padding;
                      value = value + 1;
                      setPadding(value);
                      setPaddingLeft(value);
                      setPaddingRight(value);
                      setPaddingTop(value);
                      setPaddingBottom(value);
                      dispatch(updatePadding(value));
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
                          let value = paddingTop;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setPaddingTop(value);
                          dispatch(updatePaddingTop(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {paddingTop}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = paddingTop;
                          value = value + 1;
                          setPaddingTop(value);
                          dispatch(updatePaddingTop(value));
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
                          let value = paddingRight;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setPaddingRight(value);
                          dispatch(updatePaddingRight(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {paddingRight}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = paddingRight;
                          value = value + 1;
                          setPaddingRight(value);
                          dispatch(updatePaddingRight(value));
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
                          let value = paddingBottom;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setPaddingBottom(value);
                          dispatch(updatePaddingBottom(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {paddingBottom}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = paddingRight;
                          value = value + 1;
                          setPaddingBottom(value);
                          dispatch(updatePaddingBottom(value));
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
                          let value = paddingLeft;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setPaddingLeft(value);
                          dispatch(updatePaddingLeft(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {paddingLeft}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = paddingLeft;
                          value = value + 1;
                          setPaddingLeft(value);
                          dispatch(updatePaddingLeft(value));
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
      </div>
    </div>
  );
}

export default IconToolEditor;
