"use client";
import React, { useState, useEffect } from "react";
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
  updateFontFamily,
  updateFontWeight,
  updateTextColor,
  updateLinkColor,
  updateLetterSpacing,
  updateJustifyContent,
  updateFontSize,
  updateColumnGap,
  addNewItem,
  updateItem,
  deleteItem,
  updateFlexDirection,
  separateMenu,
} = builderSlice.actions;

function MenuToolEditor() {
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
  const [fontSize, setFontSize] = useState(16);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textColor, setTextColor] = useState("");
  const [linkColor, setLinkColor] = useState("");
  const [itemList, setItemList] = useState([]);
  const [separator, setSeparator] = useState("");
  const [checkLayout, setCheckLayout] = useState(false);
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
  const layoutList = ["Vertical", "Horizontal"];
  const targetList = ["New page", "Current page"];

  useEffect(() => {
    const row = data?.rows?.find((row, index) => index === +rowIndex);
    const column = row?.columns?.find(
      (column, index) => index === +columnIndex
    );
    const content = column?.contents?.find(
      (content, index) => index === +contentIndex
    );
    setItemList(content?.itemList);
  }, [data]);

  return (
    <div className="menu_tool h-screen">
      <EditOptions />
      <div className="bg-gray-50 h-[78%] overflow-auto">
        <div className="px-5 py-5 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <span>Configure icon collection</span>
          {itemList?.length
            ? itemList.map((item, index) => {
                return (
                  <div
                    className="bg-white border rounded-sm px-3 py-3 flex flex-col gap-y-2"
                    key={index}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <GiHamburgerMenu className="text-[24px]" />
                        <span>{item.text}</span>
                      </div>
                      <Button
                        color="danger"
                        className="font-bold text-[12px]"
                        id={index}
                        onClick={(e) => {
                          dispatch(deleteItem(+e.target.id));
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <Input
                        key="primary"
                        type="text"
                        color="secondary"
                        placeholder="Enter your Text"
                        label="Text"
                        className="w-full"
                        id={index}
                        onBlur={(e) => {
                          let value = e.target.value;
                          value = value.replaceAll(`<`, `&lt;`);
                          value = value.replaceAll(`>`, `&gt;`);
                          value = value.replaceAll(`'`, `&apos;`);
                          value = value.replaceAll(`"`, `&quot;`);
                          dispatch(
                            updateItem({
                              text: value,
                              index: e.target.id,
                            })
                          );
                        }}
                      />
                      <Input
                        key="secondary"
                        type="text"
                        color="secondary"
                        placeholder="Enter your Url"
                        label="Url"
                        className="w-full"
                        id={index}
                        onBlur={(e) => {
                          dispatch(
                            updateItem({
                              url: e.target.value,
                              index: e.target.id,
                            })
                          );
                        }}
                      />
                      <div className="gap-x-2 flex justify-between items-center">
                        <span className="text-[14px] opacity-70 font-semibold">
                          Target
                        </span>
                        <div className="flex-1 flex justify-end">
                          <Select
                            label="Select target"
                            className="max-w-xs"
                            color="secondary"
                            onChange={(e) => {
                              const valueItem = e.target.value;
                              const target = targetList.find(
                                (target, index) =>
                                  index === +valueItem.slice(0, 1)
                              );
                              dispatch(
                                updateItem({
                                  index: +valueItem.slice(2),
                                  target: target === "New page" ? "_blank" : "",
                                })
                              );
                            }}
                          >
                            {targetList.map((target, i) => (
                              <SelectItem key={i} value={i + "_" + index}>
                                {target}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <Input
                        key="third"
                        type="text"
                        color="secondary"
                        placeholder="Enter your Title"
                        label="Title"
                        className="w-full"
                        id={index}
                        onBlur={(e) => {
                          dispatch(
                            updateItem({
                              title: e.target.value,
                              index: e.target.id,
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })
            : ""}
          <Button
            color="secondary"
            className="font-bold"
            onClick={() => {
              dispatch(addNewItem());
            }}
          >
            <FaPlusCircle className="text-white" /> ADD NEW ITEM
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
        <div className="px-5 py-2 gap-x-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">Layout</span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select layout"
              className="max-w-xs"
              color="secondary"
              onChange={(e) => {
                const layout = layoutList.find(
                  (layout, index) => index === +e.target.value
                );
                const temp = layout === "Horizontal" ? true : false;
                const direction = layout === "Horizontal" ? "row" : "column";
                setCheckLayout(temp);
                dispatch(updateFlexDirection(direction));
              }}
            >
              {layoutList.map((layout, index) => (
                <SelectItem key={index} value={index}>
                  {layout}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        {checkLayout ? (
          <>
            <div className="px-5 py-2 gap-x-2 flex justify-between items-center">
              {/* <span className="text-[14px] opacity-70 font-semibold">Separator</span> */}
              <div className="flex-1 flex justify-end">
                <Input
                  key="secondary"
                  type="text"
                  color="secondary"
                  placeholder="Enter your Separator"
                  label="Separator"
                  className="w-full"
                  onBlur={(e) => {
                    let value = e.target.value;
                    value = value.replaceAll(`<`, `&lt;`);
                    value = value.replaceAll(`>`, `&gt;`);
                    value = value.replaceAll(`'`, `&apos;`);
                    value = value.replaceAll(`"`, `&quot;`);
                    dispatch(separateMenu(value));
                  }}
                />
              </div>
            </div>
            <hr />
          </>
        ) : (
          ""
        )}
        <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold px-5 py-3">
          <span>Mobile menu</span>
          <Switch
            defaultSelected={false}
            color="secondary"
            onChange={() => {
              alert("Chưa cóa đou :))))");
            }}
          />
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

export default MenuToolEditor;
