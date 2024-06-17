"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Input,
  Slider,
  Switch,
  Button,
} from "@nextui-org/react";
import {
  getStyleStringFromObject,
  getStyleObjectFromString,
} from "@/utils/convert";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { isImageLink } from "@/utils/regex";
const {
  updateWidthContentGeneral,
  updateContentGeneralAlignment,
  updateGeneralBackgroundColor,
  updateContentGeneralBackgroundColor,
  changeUploadFileStatus,
  changeInsertGeneralImageBgStatus,
  removeGeneralBgImage,
  updateGeneralBgImage,
  updateGeneralBgSize,
  updateGeneralBgPosition,
  updateGeneralBgRepeat,
  updateGeneralFontFamily,
} = builderSlice.actions;

function SettingSidebar() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  let widthContentArea = getStyleObjectFromString(
    data.contentGeneralStyle
  )?.width;
  widthContentArea = widthContentArea ? parseInt(widthContentArea) : 0;
  const [width, setWidth] = useState(widthContentArea || 745);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [contentBackground, setContentBackground] = useState("");
  const [checkBgImage, setCheckBgImage] = useState(false);
  const [url, setUrl] = useState("");
  const [isFitToBackground, setIsFitToBackground] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
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
  useEffect(() => {
    const objContent = getStyleObjectFromString(data.contentGeneralStyle);
    const objGeneral = getStyleObjectFromString(data.generalStyle);
    if (objContent?.width) {
      setWidth(objContent?.width);
    }
    if (objGeneral?.backgroundColor) {
      setBackgroundColor(objGeneral?.backgroundColor);
    }
    if (objContent?.backgroundColor) {
      setContentBackground(objContent?.backgroundColor);
    }
    if (objGeneral?.backgroundImage) {
      let url = objGeneral?.backgroundImage;
      url = url.replace("url(", "").replace(")", "").replace(/'/g, "");
      setUrl(url);
    }
    if (objGeneral?.backgroundSize) {
      setIsFitToBackground(objGeneral?.backgroundSize === "cover");
    }
    if (objGeneral?.backgroundRepeat) {
      setIsRepeat(objGeneral?.backgroundRepeat === "repeat");
    }
    if (objGeneral?.backgroundPosition) {
      setIsCenter(objGeneral?.backgroundPosition === "center");
    }
  }, []);
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full">
        <div className="h-[84%] overflow-auto">
          <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
            GENERAL OPTIONS
          </div>
          <div className="px-5 py-2 flex flex-col gap-y-3">
            <span className="text-[14px] opacity-70 font-semibold">
              Content area width
            </span>
            <Slider
              label="Width (px)"
              step={5}
              maxValue={900}
              minValue={480}
              defaultValue={width}
              className="max-w-md"
              color="secondary"
              onChange={(value) => {
                setWidth(value);
                dispatch(updateWidthContentGeneral(value));
              }}
            />
          </div>
          <hr />
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold px-5 py-2">
            <span>Content area alignment</span>
            <Select
              label="Select type"
              className="max-w-xs"
              color="secondary"
              onChange={(e) => {
                let position = "";
                if (e.target.value.includes("0")) {
                  position = "left";
                } else if (e.target.value.includes("1")) {
                  position = "center";
                }
                if (position) {
                  dispatch(updateContentGeneralAlignment(position));
                }
              }}
            >
              <SelectItem value={0}>Left</SelectItem>
              <SelectItem value={1}>Center</SelectItem>
            </Select>
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
                    dispatch(updateGeneralBackgroundColor(e.target.value));
                  }}
                />
                <span>{backgroundColor}</span>
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
                  value={contentBackground}
                  onChange={(e) => {
                    setContentBackground(e.target.value);
                    dispatch(
                      updateContentGeneralBackgroundColor(e.target.value)
                    );
                  }}
                />
                <span>{backgroundColor}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[14px] opacity-70 font-semibold">
                Background image
              </span>
              <Switch
                defaultSelected={false}
                color="secondary"
                onChange={(e) => {
                  setCheckBgImage(e.target.checked);
                }}
              />
            </div>
            {checkBgImage ? (
              <>
                <div className="flex flex-col gap-y-2">
                  <Button
                    className="font-bold text-[14px] w-fit"
                    color="secondary"
                    onClick={() => {
                      dispatch(changeUploadFileStatus(true));
                      dispatch(changeInsertGeneralImageBgStatus(true));
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
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (isImageLink(url)) {
                        dispatch(updateGeneralBgImage(`url('${url}')`));
                      } else if (url === "") {
                        dispatch(removeGeneralBgImage());
                      }
                    }}
                  />
                </div>
                <div className="flex gap-x-2">
                  <div className="flex items-center">
                    <Switch
                      defaultSelected={isFitToBackground}
                      color="secondary"
                      onChange={(e) => {
                        const value = e.target.checked ? "cover" : "auto";
                        const obj = getStyleObjectFromString(data.generalStyle);
                        if (obj?.backgroundSize) {
                          dispatch(updateGeneralBgSize(value));
                          setIsFitToBackground(e.target.checked);
                        }
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
                        const obj = getStyleObjectFromString(data.generalStyle);
                        if (obj?.backgroundRepeat) {
                          dispatch(updateGeneralBgRepeat(value));
                          setIsRepeat(e.target.checked);
                        }
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
                        const value = e.target.checked ? "center" : "left";
                        const obj = getStyleObjectFromString(data.generalStyle);
                        if (obj?.backgroundPosition) {
                          dispatch(updateGeneralBgPosition(value));
                          setIsCenter(e.target.checked);
                        }
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
          <div className="px-5 py-2 flex justify-between items-center">
            <span className="text-[14px] opacity-70 font-semibold">
              Default font
            </span>
            <div className="flex-1 flex justify-end">
              <Select
                label="Select font"
                className="max-w-xs"
                color="secondary"
                onChange={(e) => {
                  const value = fontFamilyList[e.target.value];
                  dispatch(updateGeneralFontFamily(value));
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
        </div>
      </div>
    </div>
  );
}

export default SettingSidebar;
