"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FaMagic } from "react-icons/fa";
import { Switch } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { Slider } from "@nextui-org/react";
import { CiAlignLeft } from "react-icons/ci";
import { CiAlignRight } from "react-icons/ci";
import { CiAlignCenterH } from "react-icons/ci";
import { Input } from "@nextui-org/react";
import EditOptions from "../EditOptions/EditOptions";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { getStyleObjectFromString } from "@/utils/convert";
import { notifyInfo } from "@/utils/toast";
const {
  updatePadding,
  updatePaddingLeft,
  updatePaddingRight,
  updatePaddingTop,
  updatePaddingBottom,
  updateWidthImage,
  updateJustifyContent,
  changeUploadFileStatus,
  updateImageUrl,
  updateImageAltText,
  updateImageAction,
} = builderSlice.actions;

function ImageToolEditor() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
  const columnIndex = useSelector((state) => state.builder.columnIndex);
  const rowIndex = useSelector((state) => state.builder.rowIndex);
  const row = data?.rows?.find((row, index) => index === +rowIndex);
  const column = row?.columns?.find((column, index) => index === +columnIndex);
  const contentTag = column?.contents?.find(
    (content, index) => index === +contentIndex
  ).content;
  let widthImage = getStyleObjectFromString(
    contentTag?.match(/style=".*?"/g)[1]?.slice(7, -1)
  )?.width;
  widthImage = widthImage ? +widthImage.slice(0, -1) : 75;
  const [padding, setPadding] = useState(0);
  const [isCheck, setCheck] = useState(false);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [isAutoWidth, setAutoWidth] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [urlStatus, setUrlStatus] = useState(true);
  const [width, setWidth] = useState(widthImage);
  const imageLinkList = [
    "Open web page",
    "Send Email",
    "Make call",
    "Send SMS",
  ];
  useEffect(() => {
    if (contentTag.includes("<a")) {
      const url = contentTag
        .slice(contentTag.indexOf(`src="`) + 5, contentTag.indexOf(`alt="`) - 2)
        .replaceAll("%2F", "/");
      setImageUrl(url);
    }
    let style = contentTag.match(/style=".*?"/g);
    if (style?.length) {
      style = style[0].slice(7, -1);
      const styleObject = getStyleObjectFromString(style);
      if (styleObject?.padding) {
        setPadding(+styleObject.padding.slice(0, -2));
        setPaddingLeft(+styleObject.padding.slice(0, -2));
        setPaddingRight(+styleObject.padding.slice(0, -2));
        setPaddingTop(+styleObject.padding.slice(0, -2));
        setPaddingBottom(+styleObject.padding.slice(0, -2));
      }
      if (styleObject?.paddingLeft) {
        setPaddingLeft(+styleObject.paddingLeft.slice(0, -2));
      }
      if (styleObject?.paddingRight) {
        setPaddingRight(+styleObject.paddingRight.slice(0, -2));
      }
      if (styleObject?.paddingTop) {
        setPaddingTop(+styleObject.paddingTop.slice(0, -2));
      }
      if (styleObject?.paddingBottom) {
        setPaddingBottom(+styleObject.paddingBottom.slice(0, -2));
      }
    }
  }, []);
  return (
    <div className={"image_tool h-screen"}>
      <EditOptions />
      <div className="bg-gray-50 h-[78%] overflow-auto">
        <div className="px-5 py-3 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <div className="flex items-center justify-between">
            <span>Auto width</span>
            <Switch
              defaultSelected={false}
              color="secondary"
              onChange={() => {
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
                dispatch(updateWidthImage(+value));
              }}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" disabled={isAutoWidth} />
            <span>Full width on mobile</span>
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
        <div className="px-5 py-3 text-[14px] opacity-70 font-semibold">
          <div className="flex items-center justify-between">
            <span>Dynamic image</span>
            <Switch
              defaultSelected
              color="secondary"
              onChange={() => {
                notifyInfo("This feature is not available");
              }}
            />
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 text-[14px] opacity-70 font-semibold flex flex-col gap-y-3">
          <div className="flex gap-x-3">
            <Button
              className="font-bold text-[14px]"
              onClick={() => {
                notifyInfo("This feature is not available");
              }}
            >
              Apply effects
            </Button>
            <Button
              color="secondary"
              className="font-bold text-[14px]"
              onClick={() => {
                dispatch(changeUploadFileStatus(true));
              }}
            >
              Change image
            </Button>
          </div>
          <div className="flex gap-x-2 items-center">
            <span>URL</span>
            {urlStatus ? (
              <Input
                key="primary"
                type="text"
                color="secondary"
                placeholder="Enter your URL"
                value={imageUrl ? imageUrl : ""}
                className="w-full"
                onClick={() => {
                  setUrlStatus(false);
                }}
              />
            ) : (
              <Input
                key="primary"
                type="text"
                color="secondary"
                placeholder="Enter your URL"
                defaultValue={""}
                className="w-full"
                onBlur={(e) => {
                  setUrlStatus(true);
                  const url = e.target.value;
                  dispatch(updateImageUrl(url));
                }}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            )}
          </div>
          <div>
            <span className="font-normal">Image name: </span>
            <span>
              {imageUrl
                ? imageUrl.slice(
                    imageUrl.lastIndexOf("/") + 1,
                    imageUrl.indexOf("withId")
                  )
                : ""}
            </span>
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 text-[14px] opacity-70 font-semibold flex flex-col gap-y-3">
          <div className="flex gap-x-2 items-center">
            <span>Alt text</span>
            <Input
              key="secondary"
              type="text"
              color="secondary"
              placeholder="Enter your Alt text"
              className="w-full"
              onBlur={(e) => {
                dispatch(updateImageAltText(e.target.value));
              }}
            />
            <FaMagic className="text-violet-600 text-[18px]" />
          </div>
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
              onChange={(e) => {
                const target = imageLinkList.find(
                  (link, index) => index === +e.target.value
                );
                // dispatch(updateImageAction(target));
              }}
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
              key="third"
              type="text"
              color="secondary"
              placeholder="Enter your URL"
              defaultValue=""
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

export default ImageToolEditor;
