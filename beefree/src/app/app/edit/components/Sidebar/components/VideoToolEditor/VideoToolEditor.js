"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Switch, Select, SelectItem } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import EditOptions from "../EditOptions/EditOptions";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const {
  updatePadding,
  updatePaddingLeft,
  updatePaddingRight,
  updatePaddingTop,
  updatePaddingBottom,
  updateVideo,
  updatePlayIconColor,
  updatePlayIconSize,
  updateVideoTitle,
} = builderSlice.actions;
import { isYoutubeLink, getYoutubeVideoId } from "@/utils/regex";
import { getStyleObjectFromString } from "@/utils/convert";

function VideoToolEditor() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
  const columnIndex = useSelector((state) => state.builder.columnIndex);
  const rowIndex = useSelector((state) => state.builder.rowIndex);
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [check, setCheck] = useState(false);
  const [urlStatus, setUrlStatus] = useState(true);
  const [titleStatus, setTitleStatus] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [padding, setPadding] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const colorList = ["Dark", "Light"];
  const fontSizeList = ["50px", "55px", "60px", "65px", "70px", "75px", "80px"];
  useEffect(() => {
    const row = data?.rows?.find((row, index) => index === +rowIndex);
    const column = row?.columns?.find(
      (column, index) => index === +columnIndex
    );
    const content = column?.contents?.find(
      (content, index) => index === +contentIndex
    );
    let code = content.content;
    if (code.includes("<a")) {
      const url = code.slice(
        code.indexOf(`id="`) + 4,
        code.indexOf(`href="`) - 2
      );
      const title = code.slice(
        code.indexOf(`title="`) + 7,
        code.indexOf(`src="`) - 2
      );
      setUrl(url);
      setTitle(title);
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [data]);
  useEffect(() => {
    const videoData =
      data?.rows[rowIndex]?.columns[columnIndex]?.contents[contentIndex];
    const content = videoData?.content;
    let style = content.match(/style=".*?"/g);
    if (style?.length) {
      style = style[0].replace(/style="|"/g, "");
      const obj = getStyleObjectFromString(style);
      if (obj?.padding) {
        let value;
        if (obj.padding.includes("px")) {
          value = obj.padding.replace("px", "");
        } else {
          value = 0;
        }
        setPadding(+value);
        setPaddingLeft(+value);
        setPaddingRight(+value);
        setPaddingTop(+value);
        setPaddingBottom(+value);
      }
      if (obj?.paddingLeft) {
        setPaddingLeft(+obj.paddingLeft.replace("px", ""));
      }
      if (obj?.paddingRight) {
        setPaddingRight(+obj.paddingRight.replace("px", ""));
      }
      if (obj?.paddingTop) {
        setPaddingTop(+obj.paddingTop.replace("px", ""));
      }
      if (obj?.paddingBottom) {
        setPaddingBottom(+obj.paddingBottom.replace("px", ""));
      }
    }
  }, []);
  return (
    <div className="video_tool h-screen">
      <EditOptions />
      <div className="bg-gray-50 h-[78%] overflow-auto">
        <div className="px-5 py-5 flex flex-col gap-y-3">
          {url && urlStatus ? (
            <Input
              key="primary"
              type="text"
              color="secondary"
              placeholder="Enter your URL"
              label="URL"
              className="w-full"
              value={url}
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
              label="URL"
              className="w-full"
              defaultValue={url}
              onBlur={async (e) => {
                const url = e.target.value;
                if (isYoutubeLink(url)) {
                  const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getYoutubeVideoId(
                      url
                    )}&fields=items(id%2Csnippet)&key=AIzaSyDdeoRB9QA08j7vMG1E2ovKkQjgxk4-69I`
                  );
                  const info = await response.json();
                  const title = info?.items[0]?.snippet?.localized?.title;
                  const link = info?.items[0]?.snippet?.thumbnails?.maxres?.url;
                  dispatch(
                    updateVideo({
                      title,
                      link,
                      url,
                    })
                  );
                }
                setUrlStatus(true);
              }}
            />
          )}
          <p className="text-[14px] opacity-60">
            Add a{" "}
            <Link
              href={"https://www.youtube.com/"}
              className="text-violet-800 opacity-100 font-semibold"
              target="_blank"
            >
              Youtube
            </Link>{" "}
            or{" "}
            <Link
              href={"https://vimeo.com/"}
              className="text-violet-800 opacity-100 font-semibold"
              target="_blank"
            >
              Vimeo
            </Link>{" "}
            URL to automatically generate a preview image. The image will link
            to the provided URL.
          </p>
          {title && titleStatus ? (
            <Input
              key="secondary"
              type="text"
              color="secondary"
              placeholder="Enter your Title"
              label="Title"
              className="w-full"
              value={title}
              onClick={() => {
                setTitleStatus(false);
              }}
            />
          ) : (
            <Input
              key="secondary"
              type="text"
              color="secondary"
              placeholder="Enter your Title"
              label="Title"
              className="w-full"
              defaultValue={title}
              onBlur={(e) => {
                if (check) {
                  dispatch(updateVideoTitle(e.target.value));
                }
                setTitleStatus(true);
              }}
            />
          )}
        </div>
        <hr />
        {check ? (
          <>
            <div className="px-5 py-2 flex justify-between items-center">
              <span className="text-[14px] opacity-70 font-semibold">
                Play icon <br /> color
              </span>
              <div className="flex-1 flex justify-end">
                <Select
                  label="Select play icon color"
                  className="max-w-xs"
                  color="secondary"
                  onChange={(e) => {
                    const color = colorList.find(
                      (space, index) => index === +e.target.value
                    );
                    if (check) {
                      dispatch(updatePlayIconColor(color));
                    }
                  }}
                >
                  {colorList.map((color, index) => (
                    <SelectItem key={index} value={index}>
                      {color}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <hr />
            <div className="px-5 py-2 flex justify-between items-center">
              <span className="text-[14px] opacity-70 font-semibold">
                Play icon <br /> size
              </span>
              <div className="flex-1 flex justify-end">
                <Select
                  label="Select play icon size"
                  className="max-w-xs"
                  color="secondary"
                  onChange={(e) => {
                    const size = fontSizeList.find(
                      (size, index) => index === +e.target.value
                    );
                    if (check) {
                      dispatch(updatePlayIconSize(size));
                    }
                  }}
                >
                  {fontSizeList.map((size, index) => (
                    <SelectItem key={index} value={index}>
                      {size}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
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
                  setIsCheck(!check);
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

export default VideoToolEditor;
