"use client";
import React from "react";
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
import { AiOutlineFileGif } from "react-icons/ai";
import EditOptions from "../EditOptions/EditOptions";

function GifToolEditor() {
  const imageLinkList = [
    "Open web page",
    "Send Email",
    "Make call",
    "Send SMS",
  ];
  return (
    <div className="gif_tool h-full">
      <EditOptions />
      <div className="bg-gray-50 h-full overflow-auto">
        <div className="px-5 py-3 flex justify-between items-center">
          <Button color="secondary" className="text-[12px] font-bold">
            Browse Gifs
          </Button>
          <AiOutlineFileGif className="text-[28px]" />
        </div>
        <hr />
        <div className="px-5 py-3 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <div className="flex items-center justify-between">
            <span>Auto width</span>
            <Switch defaultSelected color="secondary" />
          </div>
          <div>
            <Slider
              label="Width (percent)"
              step={1}
              maxValue={100}
              minValue={20}
              defaultValue={53}
              className="max-w-md"
              color="secondary"
            />
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" />
            <span>Full width on mobile</span>
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">Align</span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <CiAlignLeft />
            <CiAlignCenterH />
            <CiAlignRight />
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 text-[14px] opacity-70 font-semibold">
          <div className="flex items-center justify-between">
            <span>Dynamic image</span>
            <Switch defaultSelected color="secondary" />
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
              defaultValue="https://www.youtube.com/watch?v=jrVhUjiB9Pk"
              className="w-full"
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
            <Select className="max-w-xs" color="secondary">
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
              key="secondary"
              type="text"
              color="secondary"
              placeholder="Enter your URL"
              defaultValue="https://www.youtube.com/watch?v=jrVhUjiB9Pk"
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
              <Switch defaultSelected color="secondary" />
            </div>
          </div>
          <div className="flex justify-between text-[14px] opacity-70 font-semibold">
            <div className="flex flex-col gap-y-2">
              <span>All sides</span>
              <div className="flex border rounded-sm">
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  -
                </div>
                <div className="bg-gray-200 border text-[15px] ">
                  <input
                    type="text"
                    defaultValue={"0"}
                    className="w-[40px] text-center outline-none"
                  />
                </div>
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  +
                </div>
              </div>
            </div>
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

export default GifToolEditor;
