"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FaMagic } from "react-icons/fa";
import { TfiAlignLeft } from "react-icons/tfi";
import { TfiAlignRight } from "react-icons/tfi";
import { TfiAlignCenter } from "react-icons/tfi";
import { TfiAlignJustify } from "react-icons/tfi";
import { IoMdMenu } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import { MdFormatTextdirectionLToR } from "react-icons/md";
import { MdFormatTextdirectionRToL } from "react-icons/md";
import { Switch } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import EditOptions from "../EditOptions/EditOptions";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { editorSlice } from "@/redux/slice/editorSlice";
const {
  updateTitle,
  updateFontFamily,
  updateFontWeight,
  updateTextColor,
  updateLinkColor,
  updateAlign,
  updateLineHeight,
  updateLetterSpacing,
  updatePadding,
  updatePaddingLeft,
  updatePaddingRight,
  updatePaddingTop,
  updatePaddingBottom,
  updateFontSize,
  updateParagraphSpacing,
} = builderSlice.actions;

function ParagraphToolEditor() {
  const dispatch = useDispatch();
  const [textColor, setTextColor] = useState("");
  const [linkColor, setLinkColor] = useState("");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [isCheck, setCheck] = useState(false);
  const [padding, setPadding] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [rowGap, setRowGap] = useState(5);
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
  return (
    <div className={"paragraph_tool " + (isCheck ? "h-[99%]" : "h-[102%]")}>
      <EditOptions />
      <div className="bg-gray-50 h-full overflow-auto">
        <div className="px-5 py-3">
          <Button
            color="secondary"
            className="font-bold text-[14px]"
            onClick={() => {
              alert("Hông cóa đâu he he :3");
            }}
          >
            <FaMagic /> Write with AI
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
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Link color
          </span>
          <div className="flex-1 flex justify-end">
            <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
              <input
                type="color"
                onChange={(e) => {
                  setLinkColor(e.target.value);
                  dispatch(updateLinkColor(e.target.value));
                }}
              />
              <span>{linkColor}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">Align</span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <TfiAlignLeft
              className="cursor-pointer"
              onClick={() => dispatch(updateAlign("left"))}
            />
            <TfiAlignRight
              className="cursor-pointer"
              onClick={() => dispatch(updateAlign("right"))}
            />
            <TfiAlignCenter
              className="cursor-pointer"
              onClick={() => dispatch(updateAlign("center"))}
            />
            <TfiAlignJustify
              className="cursor-pointer"
              onClick={() => dispatch(updateAlign("justify"))}
            />
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Paragraph spacing
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <div className="flex border rounded-sm">
              <div
                className="bg-white px-2 border text-[14px] cursor-pointer"
                onClick={() => {
                  let value = rowGap;
                  value = value - 1;
                  if (value < 0) {
                    value = 0;
                  }
                  setRowGap(value);
                  dispatch(updateParagraphSpacing(value));
                }}
              >
                -
              </div>
              <div className="bg-white px-2 border text-[15px] ">{rowGap}</div>
              <div
                className="bg-white px-2 border text-[14px] cursor-pointer"
                onClick={() => {
                  let value = rowGap;
                  value = value + 1;
                  setRowGap(value);
                  dispatch(updateParagraphSpacing(value));
                }}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Line height
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <IoMdMenu
              className="cursor-pointer"
              onClick={() => dispatch(updateLineHeight(1.2))}
            />
            <HiMenu
              className="cursor-pointer"
              onClick={() => dispatch(updateLineHeight(1.5))}
            />
            <AiOutlineMenu
              className="cursor-pointer"
              onClick={() => dispatch(updateLineHeight(1.8))}
            />
            <CiMenuBurger
              className="cursor-pointer"
              onClick={() => dispatch(updateLineHeight(2))}
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

export default ParagraphToolEditor;
