"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Select, SelectItem, Slider } from "@nextui-org/react";
import { FaMagic } from "react-icons/fa";
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
import { Input } from "@nextui-org/react";
import { CiAlignLeft } from "react-icons/ci";
import { CiAlignRight } from "react-icons/ci";
import { CiAlignCenterH } from "react-icons/ci";
import EditOptions from "../EditOptions/EditOptions";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { editorSlice } from "@/redux/slice/editorSlice";
import { getStyleObjectFromString } from "@/utils/convert";
const {
  updateFontFamily,
  updateFontWeight,
  updateTextColor,
  updateBackgroundColor,
  updateLineHeight,
  updateLetterSpacing,
  updatePadding,
  updatePaddingLeft,
  updatePaddingRight,
  updatePaddingTop,
  updatePaddingBottom,
  updateFontSize,
  updateParagraphSpacing,
  updateButtonContent,
  updateWidth,
  updateJustifyContent,
  updateBorderRadius,
  updateBorderColor,
  updateBorderWidth,
  updateBorderStyle,
  updateBorderBottomColor,
  updateBorderBottomWidth,
  updateBorderBottomStyle,
  updateBorderLeftColor,
  updateBorderLeftStyle,
  updateBorderLeftWidth,
  updateBorderRightColor,
  updateBorderRightStyle,
  updateBorderRightWidth,
  updateBorderTopColor,
  updateBorderTopStyle,
  updateBorderTopWidth,
  updateMargin,
} = builderSlice.actions;

function ButtonToolEditor() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  const rowIndex = useSelector((state) => state.builder.rowIndex);
  const columnIndex = useSelector((state) => state.builder.columnIndex);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
  let widthButton = getStyleObjectFromString(
    data.rows[rowIndex]?.columns[columnIndex]?.contents[contentIndex]?.content
      ?.match(/style=".*?"/g)[0]
      ?.slice(7, -1)
  )?.width;
  if (widthButton) {
    // remove % from width
    widthButton = widthButton.slice(0, -1);
  }
  const [textColor, setTextColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [borderRadius, setBorderRadius] = useState(0);
  const [isCheck, setCheck] = useState(false);
  const [isCheckBorder, setCheckBorder] = useState(false);
  const [padding, setPadding] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderWidthLeft, setBorderWidthLeft] = useState(0);
  const [borderWidthRight, setBorderWidthRight] = useState(0);
  const [borderWidthTop, setBorderWidthTop] = useState(0);
  const [borderWidthBottom, setBorderWidthBottom] = useState(0);
  const [borderColor, setBorderColor] = useState("");
  const [borderColorLeft, setBorderColorLeft] = useState("");
  const [borderColorRight, setBorderColorRight] = useState("");
  const [borderColorTop, setBorderColorTop] = useState("");
  const [borderColorBottom, setBorderColorBottom] = useState("");
  const [isAutoWidth, setAutoWidth] = useState(false);
  const [contentButton, setContentButton] = useState("");
  const [width, setWidth] = useState(+widthButton || 20);
  const styleBorderList = ["solid", "dotted", "dashed"];
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
  const imageLinkList = [
    "Open web page",
    "Send Email",
    "Make call",
    "Send SMS",
  ];
  useEffect(() => {
    const dataButton =
      data?.rows[rowIndex]?.columns[columnIndex]?.contents[contentIndex];
    const content = dataButton?.content;
    // get content from button tag
    const value = content.slice(
      content.indexOf(">") + 1,
      content.lastIndexOf("</button>")
    );
    if (value) {
      setContentButton(value);
    }
    let style = content.match(/style=".*?"/g);
    if (style?.length) {
      style = style[0].replace(/style="/g, "").replace(/"/g, "");
      const obj = getStyleObjectFromString(style);
      if (obj?.fontSize) {
        const value = obj.fontSize.slice(0, -2);
        setFontSize(+value);
      }
      if (obj?.color) {
        setTextColor(obj.color);
      }
      if (obj?.backgroundColor) {
        setBackgroundColor(obj.backgroundColor);
      }
      if (obj?.letterSpacing) {
        const value = obj.letterSpacing.slice(0, -2);
        setLetterSpacing(+value);
      }
      if (obj?.borderRadius) {
        let value;
        if (obj.borderRadius.includes("px")) {
          value = obj.borderRadius.slice(0, -2);
        } else {
          value = 0;
        }
        setBorderRadius(+value);
      }
      if (obj?.borderWidth) {
        const value = obj.borderWidth.slice(0, -2);
        setBorderWidth(+value);
        setBorderWidthLeft(+value);
        setBorderWidthRight(+value);
        setBorderWidthTop(+value);
        setBorderWidthBottom(+value);
      }
      if (obj?.borderColor) {
        setBorderColor(obj.borderColor);
      }
      if (obj?.borderTopWidth) {
        const value = obj.borderTopWidth.slice(0, -2);
        setBorderWidthTop(+value);
      }
      if (obj?.borderTopColor) {
        setBorderColorTop(obj.borderTopColor);
      }
      if (obj?.borderRightWidth) {
        const value = obj.borderRightWidth.slice(0, -2);
        setBorderWidthRight(+value);
      }
      if (obj?.borderRightColor) {
        setBorderColorRight(obj.borderRightColor);
      }
      if (obj?.borderBottomWidth) {
        const value = obj.borderBottomWidth.slice(0, -2);
        setBorderWidthBottom(+value);
      }
      if (obj?.borderBottomColor) {
        setBorderColorBottom(obj.borderBottomColor);
      }
      if (obj?.borderLeftWidth) {
        const value = obj.borderLeftWidth.slice(0, -2);
        setBorderWidthLeft(+value);
      }
      if (obj?.borderLeftColor) {
        setBorderColorLeft(obj.borderLeftColor);
      }
      if (obj?.padding) {
        let value;
        if (obj.padding.includes("px")) {
          value = obj.padding.slice(0, -2);
        } else {
          value = 0;
        }
        setPadding(+value);
        setPaddingLeft(+value);
        setPaddingRight(+value);
        setPaddingTop(+value);
        setPaddingBottom(+value);
      }
      if (obj?.paddingTop) {
        const value = obj.paddingTop.slice(0, -2);
        setPaddingTop(+value);
      }
      if (obj?.paddingRight) {
        const value = obj.paddingRight.slice(0, -2);
        setPaddingRight(+value);
      }
      if (obj?.paddingBottom) {
        const value = obj.paddingBottom.slice(0, -2);
        setPaddingBottom(+value);
      }
      if (obj?.paddingLeft) {
        const value = obj.paddingLeft.slice(0, -2);
        setPaddingLeft(+value);
      }
    }
  }, []);
  return (
    <div className={"title_tool " + (isCheckBorder ? "h-[44%]" : "h-[56%]")}>
      <EditOptions />
      <div className="bg-gray-50 h-full overflow-auto">
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          ARTIFICIAL INTELLIGENCE
        </div>
        <div className="px-5 py-3">
          <Button
            color="secondary"
            className="font-bold text-[14px]"
            onClick={() => {
              alert("Hông cóa đou :)))");
            }}
          >
            <FaMagic /> Write with AI
          </Button>
        </div>
        <hr />
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          ACTION
        </div>
        <div className="px-5 py-3 text-[14px] opacity-70 font-semibold flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <span>Image link</span>
            <Select
              className="max-w-xs"
              color="secondary"
              label="Select image link"
            >
              {imageLinkList.map((linkType, index) => (
                <SelectItem key={index} value={index}>
                  {linkType}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-x-2 items-center">
            <span>URL</span>
            <Input
              key="primary"
              type="text"
              color="secondary"
              placeholder="Enter your URL"
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-x-2 font-normal text-violet-600">
            <Link href={"#"}>Special links</Link>
            <span>|</span>
            <Link href={"#"}>Link file</Link>
          </div>
        </div>
        <hr />
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          BUTTON CONTENT
        </div>
        <div className="px-5 py-3 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <div className="flex items-center justify-between gap-x-2">
            <span>Content</span>
            <Input
              key="secondary"
              type="text"
              color="secondary"
              placeholder="Enter your content"
              className="w-full"
              value={contentButton}
              onChange={(e) => {
                setContentButton(e.target.value);
              }}
              onBlur={(e) => {
                let value = e.target.value;
                value = value.replaceAll(`<`, `&lt;`);
                value = value.replaceAll(`>`, `&gt;`);
                value = value.replaceAll(`'`, `&apos;`);
                value = value.replaceAll(`"`, `&quot;`);
                dispatch(updateButtonContent(value));
              }}
            />
          </div>
        </div>
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          BUTTON OPTIONS
        </div>
        <div className="px-5 py-3 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <div className="flex items-center justify-between">
            <span>Auto width</span>
            <Switch
              defaultSelected={false}
              color="secondary"
              onChange={(value) => {
                const status = !isAutoWidth;
                setAutoWidth(status);
              }}
            />
          </div>
          <div>
            <Slider
              label="Width (percent)"
              step={1}
              maxValue={100}
              minValue={20}
              defaultValue={width}
              className="max-w-md"
              color="secondary"
              isDisabled={isAutoWidth}
              onChange={(value) => {
                setWidth(value);
                dispatch(updateWidth(+value));
              }}
            />
          </div>
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
            Background color
          </span>
          <div className="flex-1 flex justify-end">
            <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-3/5">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => {
                  setBackgroundColor(e.target.value);
                  dispatch(updateBackgroundColor(e.target.value));
                }}
              />
              <span>{backgroundColor}</span>
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
                value={textColor}
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
                dispatch(updateMargin("10px auto 10px 0"));
              }}
            />
            <CiAlignCenterH
              onClick={() => {
                dispatch(updateMargin("10px auto"));
              }}
            />
            <CiAlignRight
              onClick={() => {
                dispatch(updateMargin("10px 0 10px auto"));
              }}
            />
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
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Border radius
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <div className="flex border rounded-sm">
              <div
                className="bg-white px-2 border text-[14px] cursor-pointer"
                onClick={() => {
                  let value = borderRadius;
                  value = value - 1;
                  if (value < 0) {
                    value = 0;
                  }
                  setBorderRadius(value);
                  dispatch(updateBorderRadius(value));
                }}
              >
                -
              </div>
              <div className="bg-white px-2 border text-[15px] ">
                {borderRadius}
              </div>
              <div
                className="bg-white px-2 border text-[14px] cursor-pointer"
                onClick={() => {
                  let value = borderRadius;
                  value = value + 1;
                  setBorderRadius(value);
                  dispatch(updateBorderRadius(value));
                }}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-5 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Border</span>
            <div className="flex items-center gap-x-2">
              <span>More options</span>
              <Switch
                defaultSelected={false}
                color="secondary"
                onClick={() => {
                  let check = isCheckBorder;
                  setCheckBorder(!check);
                }}
              />
            </div>
          </div>
          {!isCheckBorder ? (
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
                      const style = styleBorderList.find(
                        (style, index) => index === +e.target.value
                      );
                      dispatch(updateBorderStyle(style));
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
                        let value = borderWidth;
                        value = value - 1;
                        if (value < 0) {
                          value = 0;
                        }
                        setBorderWidth(value);
                        setBorderWidthBottom(value);
                        setBorderWidthLeft(value);
                        setBorderWidthRight(value);
                        setBorderWidthTop(value);
                        dispatch(updateBorderWidth(value));
                      }}
                    >
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">
                      {borderWidth}
                    </div>
                    <div
                      className="bg-white px-2 border text-[14px] cursor-pointer"
                      onClick={() => {
                        let value = borderWidth;
                        value = value + 1;
                        setBorderWidth(value);
                        dispatch(updateBorderWidth(value));
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
                      value={borderColor}
                      onChange={(e) => {
                        setBorderColor(e.target.value);
                        dispatch(updateBorderColor(e.target.value));
                      }}
                    />
                    <span>{borderColor}</span>
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
                        const style = styleBorderList.find(
                          (style, index) => index === +e.target.value
                        );
                        dispatch(updateBorderTopStyle(style));
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
                          let value = borderWidthTop;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setBorderWidthTop(value);
                          dispatch(updateBorderTopWidth(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {borderWidthTop}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = borderWidthTop;
                          value = value + 1;
                          setBorderWidthTop(value);
                          dispatch(updateBorderTopWidth(value));
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
                        value={borderColorTop}
                        onChange={(e) => {
                          setBorderColorTop(e.target.value);
                          dispatch(updateBorderTopColor(e.target.value));
                        }}
                      />
                      <span>{borderColorTop}</span>
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
                        const style = styleBorderList.find(
                          (style, index) => index === +e.target.value
                        );
                        dispatch(updateBorderRightStyle(style));
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
                          let value = borderWidthRight;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setBorderWidthRight(value);
                          dispatch(updateBorderRightWidth(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {borderWidthRight}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = borderWidthRight;
                          value = value + 1;
                          setBorderWidthRight(value);
                          dispatch(updateBorderRightWidth(value));
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
                        value={borderColorRight}
                        onChange={(e) => {
                          setBorderColorRight(e.target.value);
                          dispatch(updateBorderRightColor(e.target.value));
                        }}
                      />
                      <span>{borderColorRight}</span>
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
                        const style = styleBorderList.find(
                          (style, index) => index === +e.target.value
                        );
                        dispatch(updateBorderBottomStyle(style));
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
                          let value = borderWidthBottom;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setBorderWidthBottom(value);
                          dispatch(updateBorderBottomWidth(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {borderWidthBottom}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = borderWidthBottom;
                          value = value + 1;
                          setBorderWidthBottom(value);
                          dispatch(updateBorderBottomWidth(value));
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
                        value={borderColorBottom}
                        onChange={(e) => {
                          setBorderColorBottom(e.target.value);
                          dispatch(updateBorderBottomColor(e.target.value));
                        }}
                      />
                      <span>{borderColorBottom}</span>
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
                        const style = styleBorderList.find(
                          (style, index) => index === +e.target.value
                        );
                        dispatch(updateBorderLeftStyle(style));
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
                          let value = borderWidthLeft;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setBorderWidthLeft(value);
                          dispatch(updateBorderLeftWidth(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {borderWidthLeft}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = borderWidthLeft;
                          value = value + 1;
                          setBorderWidthLeft(value);
                          dispatch(updateBorderLeftWidth(value));
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
                        value={borderColorLeft}
                        onChange={(e) => {
                          setBorderColorLeft(e.target.value);
                          dispatch(updateBorderLeftColor(e.target.value));
                        }}
                      />
                      <span>{borderColorLeft}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
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

export default ButtonToolEditor;
