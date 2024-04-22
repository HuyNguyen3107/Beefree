"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Switch, Select, SelectItem } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { CiAlignLeft } from "react-icons/ci";
import { CiAlignRight } from "react-icons/ci";
import { CiAlignCenterH } from "react-icons/ci";
import EditOptions from "../EditOptions/EditOptions";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const {
  updatePadding,
  updatePaddingLeft,
  updatePaddingRight,
  updatePaddingTop,
  updatePaddingBottom,
  updateWidthImage,
  updateJustifyContent,
  updateDividerBackground,
  updateDividerHeight,
  updateDividerStyle,
  updateDividerWidth,
} = builderSlice.actions;

function DivideToolEditor() {
  const dispatch = useDispatch();
  const [padding, setPadding] = useState(0);
  const [isCheck, setCheck] = useState(false);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [isTransparent, setTransparent] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const [lineColor, setLineColor] = useState("");
  const [width, setWidth] = useState(100);
  const styleLineList = ["solid", "dotted", "dashed"];
  return (
    <div className={"divide_tool h-[130%]"}>
      <EditOptions />
      <div className="bg-gray-50 h-full overflow-auto">
        <div className="px-5 py-3 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <div className="flex items-center justify-between">
            <span>Transparent</span>
            <Switch
              defaultSelected={false}
              color="secondary"
              onChange={() => {
                const temp = !isTransparent;
                setTransparent(temp);
                dispatch(
                  updateDividerBackground(!temp ? "#9CA3AF" : "transparent")
                );
              }}
            />
          </div>
        </div>
        <hr />
        {!isTransparent ? (
          <>
            <div className="px-5 py-5">
              <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
                <div className="flex flex-col gap-y-2">
                  <span>Line</span>
                </div>
                <div className="flex-1 flex flex-col gap-y-2">
                  <div className="flex-1 flex justify-end">
                    <Select
                      label="Select border style"
                      className="max-w-xs"
                      color="secondary"
                      onChange={(e) => {
                        const style = styleLineList.find(
                          (style, index) => index === +e.target.value
                        );
                        dispatch(updateDividerStyle(style));
                      }}
                    >
                      {styleLineList.map((style, index) => (
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
                          let value = lineHeight;
                          value = value - 1;
                          if (value < 0) {
                            value = 0;
                          }
                          setLineHeight(value);
                          dispatch(updateDividerHeight(value));
                        }}
                      >
                        -
                      </div>
                      <div className="bg-white px-2 border text-[15px] ">
                        {lineHeight}
                      </div>
                      <div
                        className="bg-white px-2 border text-[14px] cursor-pointer"
                        onClick={() => {
                          let value = lineHeight;
                          value = value + 1;
                          setLineHeight(value);
                          dispatch(updateDividerHeight(value));
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
                        onChange={(e) => {
                          setLineColor(e.target.value);
                          dispatch(updateDividerBackground(e.target.value));
                        }}
                      />
                      <span>{lineColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </>
        ) : (
          ""
        )}
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">Width</span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
              <div className="flex border rounded-sm">
                <div
                  className="bg-white px-2 border text-[14px] cursor-pointer"
                  onClick={() => {
                    let value = width;
                    value = value - 5;
                    if (value < 0) {
                      value = 0;
                    }
                    setWidth(value);
                    dispatch(updateDividerWidth(value));
                  }}
                >
                  -
                </div>
                <div className="bg-white px-2 border text-[15px] ">{width}</div>
                <div
                  className="bg-white px-2 border text-[14px] cursor-pointer"
                  onClick={() => {
                    let value = width;
                    value = value + 5;
                    if (value > 100) value = 100;
                    setWidth(value);
                    dispatch(updateDividerWidth(value));
                  }}
                >
                  +
                </div>
              </div>
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

export default DivideToolEditor;
