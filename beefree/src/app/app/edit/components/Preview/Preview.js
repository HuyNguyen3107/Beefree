"use client";
import React, {useState} from "react";
import {MdPhoneAndroid} from "react-icons/md";
import {FaDesktop} from "react-icons/fa";
import {TiDelete} from "react-icons/ti";
import {useDispatch, useSelector} from "react-redux";
import {DeviceFrameset} from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

import {previewSlice} from "@/redux/slice/previewSlice";
import PreviewContent from "./components/PreviewContent/PreviewContent";

const {setPreviewStatus} = previewSlice.actions;

function Preview() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.builder.data);
    const [device, setDevice] = useState("desktop");
    console.log(data);
    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white px-4 py-4 flex items-center justify-between border-t-1">
                <span className="text-[18px] font-bold">Preview Mode</span>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-200 px-2 py-2 rounded-md gap-x-5">
                        <div
                            className={
                                "flex items-center rounded-sm px-8 py-1 gap-x-2 text[10px] font-semibold cursor-pointer" +
                                (device === "desktop" ? " bg-white" : "")
                            }
                            onClick={() => {
                                setDevice("desktop");
                            }}
                        >
                            <FaDesktop/> DESKTOP
                        </div>
                        <div
                            className={
                                "flex items-center rounded-sm px-8 py-1 gap-x-2 text[10px] font-semibold cursor-pointer" +
                                (device === "mobile" ? " bg-white" : "")
                            }
                            onClick={() => {
                                setDevice("mobile");
                            }}
                        >
                            <MdPhoneAndroid/> MOBILE
                        </div>
                    </div>
                    <div
                        className="cursor-pointer text-[32px]"
                        onClick={() => {
                            dispatch(setPreviewStatus(false));
                        }}
                    >
                        <TiDelete/>
                    </div>
                </div>
            </div>
            <div className="px-8 py-8">
                {device === "desktop" ? (
                    <div className="bg-white rounded-md shadow-md h-screen">
                        <div className="bg-gray-200 flex items-center justify-start py-3">
                            <div className="flex gap-x-2 ml-3">
                                <div className="w-[18px] h-[18px] rounded-full border-1 bg-red-600"></div>
                                <div className="w-[18px] h-[18px] rounded-full border-1 bg-yellow-300"></div>
                                <div className="w-[18px] h-[18px] rounded-full border-1 bg-green-500"></div>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-5 h-[75%] overflow-y-auto">
                            <PreviewContent data={data} device={device}/>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <DeviceFrameset device="iPhone 8" color="gold" height={400}>
                            <div className="h-[405px] overflow-y-auto">
                                <PreviewContent data={data} device={device}/>
                            </div>
                        </DeviceFrameset>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Preview;
