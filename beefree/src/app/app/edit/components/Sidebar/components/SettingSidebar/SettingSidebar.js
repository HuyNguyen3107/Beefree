"use client";

import React from "react";
import {
  Select,
  SelectItem,
  Input,
  Slider,
  Switch,
  Button,
} from "@nextui-org/react";

function SettingSidebar() {
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
              defaultValue={745}
              className="max-w-md"
              color="secondary"
            />
          </div>
          <hr />
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold px-5 py-2">
            <span>Content area alignment</span>
            <Select label="Select type" className="max-w-xs" color="secondary">
              <SelectItem value={"left"}>Left</SelectItem>
              <SelectItem value={"center"}>Center</SelectItem>
            </Select>
          </div>
          <hr />
          <div className="px-5 py-2 flex justify-between items-center">
            <span className="text-[14px] opacity-70 font-semibold">
              Background color
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
          <div className="px-5 py-2 flex justify-between items-center">
            <span className="text-[14px] opacity-70 font-semibold">
              Default font
            </span>
            <div className="flex-1 flex justify-end">
              <Select
                label="Select font"
                className="max-w-xs"
                color="secondary"
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
              Link color
            </span>
            <div className="flex-1 flex justify-end">
              <div className="bg-white px-2 py-1 rounded-md border flex gap-x-2 w-2/5">
                <input type="color" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingSidebar;
