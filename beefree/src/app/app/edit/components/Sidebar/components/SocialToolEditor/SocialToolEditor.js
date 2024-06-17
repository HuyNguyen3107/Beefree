"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import {
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import { CiAlignLeft } from "react-icons/ci";
import { CiAlignRight } from "react-icons/ci";
import { CiAlignCenterH } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import EditOptions from "../EditOptions/EditOptions";
import { useSelector, useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
import { editorSlice } from "@/redux/slice/editorSlice";
import { getStyleObjectFromString } from "@/utils/convert";
const {
  updatePadding,
  updatePaddingLeft,
  updatePaddingRight,
  updatePaddingTop,
  updatePaddingBottom,
  addSocialIcons,
  updateSocialIcons,
  deleteSocialIcons,
  updateJustifyContent,
  updateColumnGap,
} = builderSlice.actions;

import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "@/utils/firebase";

function SocialToolEditor() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  const contentIndex = useSelector((state) => state.builder.contentIndex);
  const columnIndex = useSelector((state) => state.builder.columnIndex);
  const rowIndex = useSelector((state) => state.builder.rowIndex);
  const [isCheck, setCheck] = useState(false);
  const [padding, setPadding] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [iconList, setIconList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [restIconList, setRestIconList] = useState([]);
  const spacingList = ["5", "10", "15", "20", "25", "30", "35", "40"];
  const iconListRef = ref(storage, "icons");

  useEffect(() => {
    const row = data?.rows?.find((row, index) => index === +rowIndex);
    const column = row?.columns?.find(
      (column, index) => index === +columnIndex
    );
    const content = column?.contents?.find(
      (content, index) => index === +contentIndex
    );
    setIconList(content.iconList);
    const icons = content.iconList;
    const newRestIcons = [];
    let count = 0;
    listAll(iconListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          let src = url;
          let title = src.slice(src.lastIndexOf("%2F") + 3, src.indexOf("?"));
          title = title.slice(0, title.indexOf("."));
          const icon = {
            title,
            src,
            alt: "",
            url: "#",
          };
          const check = icons.find((icon) => icon.src === src);
          let flag;
          if (newRestIcons.length === 0) {
            flag = false;
          } else {
            flag = newRestIcons.find((icon) => icon.src === src);
          }
          if (!flag && !check) {
            newRestIcons.push(icon);
            if (+response.items.length - 1 === count) {
              setRestIconList(newRestIcons);
              return;
            } else {
              count += 1;
            }
          } else {
            count += 1;
          }
        });
      });
    });
  }, [data]);

  useEffect(() => {
    const socialData =
      data?.rows[rowIndex]?.columns[columnIndex]?.contents[contentIndex];
    const content = socialData?.content;
    const style = content?.match(/style=".*?"/g);
    if (style?.length) {
      const styleString = style[0].replace(/style="/g, "").replace(/"/g, "");
      const styleObj = getStyleObjectFromString(styleString);
      if (styleObj.padding) {
        let value;
        if (styleObj.padding.includes("px")) {
          value = styleObj.padding.replace("px", "");
        } else {
          value = 0;
        }
        setPadding(+value);
      }
      if (styleObj.paddingLeft) {
        const value = styleObj.paddingLeft.replace("px", "");
        setPaddingLeft(+value);
      }
      if (styleObj.paddingRight) {
        const value = styleObj.paddingRight.replace("px", "");
        setPaddingRight(+value);
      }
      if (styleObj.paddingTop) {
        const value = styleObj.paddingTop.replace("px", "");
        setPaddingTop(+value);
      }
      if (styleObj.paddingBottom) {
        const value = styleObj.paddingBottom.replace("px", "");
        setPaddingBottom(+value);
      }
    }
  }, []);

  return (
    <div className="social_tool h-screen">
      <EditOptions />
      <div className="bg-gray-50 h-[78%] overflow-auto">
        <div className="px-5 py-5 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <span>Configure icon collection</span>
          <div className="flex flex-col gap-y-2">
            {iconList?.length
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
                          <span>{icon.title}</span>
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
                      <div className="flex flex-col gap-y-2">
                        {showList.includes(index) ? (
                          <>
                            <Input
                              key="primary"
                              type="text"
                              color="secondary"
                              placeholder="Enter your Title"
                              label="Title"
                              className="w-full"
                              id={icon.src}
                              onBlur={(e) => {
                                dispatch(
                                  updateSocialIcons({
                                    src: e.target.id,
                                    title: e.target.value,
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
                                dispatch(
                                  updateSocialIcons({
                                    src: e.target.id,
                                    alt: e.target.value,
                                  })
                                );
                              }}
                            />
                          </>
                        ) : (
                          ""
                        )}
                        <Input
                          key="third"
                          type="text"
                          color="secondary"
                          placeholder="Enter your URL"
                          label="URL"
                          className="w-full"
                          id={icon.src}
                          onBlur={(e) => {
                            dispatch(
                              updateSocialIcons({
                                src: e.target.id,
                                url: e.target.value,
                              })
                            );
                          }}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          color="danger"
                          className="font-bold text-[12px]"
                          id={icon.src}
                          onClick={(e) => {
                            dispatch(deleteSocialIcons(e.target?.id));
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          {restIconList?.length ? (
            <Dropdown>
              <DropdownTrigger>
                <Button color="secondary" className="font-bold">
                  <FaPlusCircle className="text-white" /> ADD NEW ICON
                </Button>
              </DropdownTrigger>
              {Array.isArray(restIconList) ? (
                <DropdownMenu aria-label="Dynamic Actions" items={restIconList}>
                  {(icon) => (
                    <DropdownItem
                      key={icon.title}
                      id={icon.src}
                      onClick={(e) => {
                        dispatch(addSocialIcons(e?.target?.id));
                      }}
                    >
                      <div id={icon.src} className="flex gap-x-2">
                        <img
                          id={icon.src}
                          src={icon.src}
                          alt={icon.alt}
                          style={{
                            width: "18px",
                            height: "auto",
                          }}
                        />{" "}
                        {icon.title}
                      </div>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              ) : (
                ""
              )}
            </Dropdown>
          ) : (
            <Button color="secondary" className="font-bold">
              <FaPlusCircle className="text-white" /> ADD NEW ICON
            </Button>
          )}
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
                const space = spacingList.find(
                  (space, index) => index === +e.target.value
                );
                dispatch(updateColumnGap(+space));
              }}
            >
              {spacingList.map((space, index) => (
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

export default SocialToolEditor;
