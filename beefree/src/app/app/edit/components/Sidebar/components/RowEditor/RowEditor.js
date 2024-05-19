"use client";
import React, { useState } from "react";
import { Switch, Select, SelectItem, Input, Button } from "@nextui-org/react";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import letterImg from "../../../../../../../assets/images/letter.png";
import Image from "next/image";
import { BiSolidObjectsVerticalTop } from "react-icons/bi";
import { BiSolidObjectsVerticalCenter } from "react-icons/bi";
import { BiSolidObjectsVerticalBottom } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";

function RowEditor() {
  const areaList = ["CONTENT AREA", "ROW"];
  const styleBorderList = ["solid", "dotted", "dashed"];
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
            <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
              <input type="color" />
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Content area background color
          </span>
          <div className="flex-1 flex justify-end">
            <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
              <input type="color" />
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[14px] opacity-70 font-semibold">
              Row background image
            </span>
            <Switch defaultSelected={false} color="secondary" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Button className="font-bold text-[14px] w-fit" color="secondary">
              Choose image
            </Button>
            <Input
              key="primary"
              type="text"
              color="secondary"
              placeholder="Enter your URL"
              className="w-full"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] opacity-70 font-semibold">
              Apply image to
            </span>
            <Select label="Select area" className="max-w-xs" color="secondary">
              {areaList.map((area, index) => (
                <SelectItem key={index} value={index}>
                  {area}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center">
              <Switch defaultSelected={false} color="secondary" />
              <span className="text-[14px] opacity-70 font-semibold">
                Fit to background
              </span>
            </div>
            <div className="border-l">
              <Select
                label="Select type"
                className="max-w-xs"
                color="secondary"
              >
                <SelectItem value={"repeat"}>Repeat</SelectItem>
                <SelectItem value={"center"}>Center</SelectItem>
              </Select>
            </div>
          </div>
          <p className="text-[12px] opacity-50 font-semibold">
            Background image support varies across email clients. Choose a
            fallback content area background color for optimal results.
          </p>
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
              <Switch defaultSelected={false} color="secondary" />
            </div>
          </div>
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
                  <div className="bg-white px-2 border text-[14px] cursor-pointer">
                    -
                  </div>
                  <div className="bg-white px-2 border text-[15px] ">0</div>
                  <div className="bg-white px-2 border text-[14px] cursor-pointer">
                    +
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                  <input type="color" />
                  <span></span>
                </div>
              </div>
            </div>
          </div>
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
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input type="color" />
                    <span></span>
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
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input type="color" />
                    <span></span>
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
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input type="color" />
                    <span></span>
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
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input type="color" />
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
        <hr />
        <div className="px-5 py-5 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Content area rounded corners</span>
            <div className="flex items-center gap-x-2">
              <span>More options</span>
              <Switch defaultSelected={false} color="secondary" />
            </div>
          </div>
          <div className="flex justify-between gap-x-5 text-[14px] opacity-70 font-semibold">
            <div className="flex flex-col gap-y-2">
              <span>All corners</span>
              <div className="flex border rounded-sm">
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  -
                </div>
                <div className="bg-white px-2 border text-[15px] ">0</div>
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  +
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-y-2">
              <div className="flex justify-between">
                <div className="flex flex-col gap-y-2">
                  <span>Top</span>
                  <div className="flex border rounded-sm">
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span>Right</span>
                  <div className="flex border rounded-sm">
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-y-2">
                  <span>Bottom</span>
                  <div className="flex border rounded-sm">
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span>Left</span>
                  <div className="flex border rounded-sm">
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          <Switch defaultSelected={false} color="secondary" />
        </div>
        <hr />
        <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold px-5 py-2">
          <span>Stack order on mobile</span>
          <Select label="Select type" className="max-w-xs" color="secondary">
            <SelectItem value={"default"}>Default</SelectItem>
            <SelectItem value={"reverse"}>Reverse</SelectItem>
          </Select>
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
        <div className="flex flex-col gap-y-4 flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          <span>COLUMNS STRUCTURE</span>
          <div className="flex flex-col gap-y-2">
            <Button
              className="font-bold text-[14px] w-fit ml-auto"
              color="secondary"
            >
              <FaPlusCircle /> Add new
            </Button>
            <div className="grid grid-cols-12 gap-2">
              <div className="bg-white h-[60px] border-2 rounded-md flex justify-center items-center font-bold border-solid border-violet-600 text-violet-700 col-span-10">
                10
              </div>
              <div className="bg-white h-[60px] border-2 rounded-md flex justify-center items-center font-bold border-solid border-violet-600 text-violet-700 col-span-2">
                2
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-2 flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[14px] opacity-70 font-semibold">
              COLUMN 1
            </span>
            <Button
              className="font-bold text-[14px] w-fit ml-auto"
              color="danger"
            >
              Delete
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] opacity-70 font-semibold">
              Row background color
            </span>
            <div className="flex-1 flex justify-end">
              <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                <input type="color" />
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
              <Switch defaultSelected={false} color="secondary" />
            </div>
          </div>
          <div className="flex justify-between gap-x-5 text-[14px] opacity-70 font-semibold">
            <div className="flex flex-col gap-y-2">
              <span>All corners</span>
              <div className="flex border rounded-sm">
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  -
                </div>
                <div className="bg-white px-2 border text-[15px] ">0</div>
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  +
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-y-2">
              <div className="flex justify-between">
                <div className="flex flex-col gap-y-2">
                  <span>Top</span>
                  <div className="flex border rounded-sm">
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span>Right</span>
                  <div className="flex border rounded-sm">
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-y-2">
                  <span>Bottom</span>
                  <div className="flex border rounded-sm">
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span>Left</span>
                  <div className="flex border rounded-sm">
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image src={letterImg} alt="letter" />
            </div>
          </div>
        </div>
        <div className="px-5 py-2 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Border</span>
            <div className="flex items-center gap-x-2">
              <span>More options</span>
              <Switch defaultSelected={false} color="secondary" />
            </div>
          </div>
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
                  <div className="bg-white px-2 border text-[14px] cursor-pointer">
                    -
                  </div>
                  <div className="bg-white px-2 border text-[15px] ">0</div>
                  <div className="bg-white px-2 border text-[14px] cursor-pointer">
                    +
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                  <input type="color" />
                  <span></span>
                </div>
              </div>
            </div>
          </div>
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
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input type="color" />
                    <span></span>
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
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input type="color" />
                    <span></span>
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
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input type="color" />
                    <span></span>
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
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      -
                    </div>
                    <div className="bg-white px-2 border text-[15px] ">0</div>
                    <div className="bg-white px-2 border text-[14px] cursor-pointer">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                    <input type="color" />
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default RowEditor;
