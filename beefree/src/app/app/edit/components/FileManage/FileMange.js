"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";
import { MdHome } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { LuArrowUpRightSquare } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const {
  changeUploadFileStatus,
  insertImage,
  changeImageIconStatus,
  insertImageIcon,
  changeInsertRowImageBgStatus,
  updateBackgroundImage,
  removeBackgroundImage,
  changeInsertGeneralImageBgStatus,
  updateGeneralBgImage,
} = builderSlice.actions;
import { TbCaretUpDownFilled } from "react-icons/tb";
import { v4 } from "uuid";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/utils/firebase";

function FileMange({userId}) {
  const isChangeIconImage = useSelector(
    (state) => state.builder.isChangeIconImage
  );
  const isInsertRowImageBg = useSelector(
    (state) => state.builder.isInsertRowImageBg
  );
  const backgroundImageArea = useSelector(
    (state) => state.builder.backgroundImageArea
  );
  const isInsertGeneralImageBg = useSelector(
    (state) => state.builder.isInsertGeneralImageBg
  );
  const [imageUrls, setImageUrls] = useState([]);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(changeUploadFileStatus(false));
    dispatch(changeImageIconStatus(null));
    dispatch(changeInsertRowImageBgStatus(null));
    dispatch(changeInsertGeneralImageBgStatus(null));
  };
  const imagesListRef = ref(storage, `images/${userId}`);
  const handleUpload = (e) => {
    const imageUpload = e?.target?.files[0];
    const date = new Date();
    const uploadTime = `${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }S${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    }S${date.getFullYear()}`;
    const imageRef = ref(
      storage,
      `images/${userId}/${imageUpload?.name}withId${v4()}withInfo${
        imageUpload.size
      }and${uploadTime}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot?.ref).then((url) => {
        const temp = [...imageUrls];
        temp.push(url);
        setImageUrls(temp);
      });
    });
  };
  const handleDelete = (e) => {
    const path = e?.target?.parentElement?.id;
    deleteObject(ref(storage, path)).then(() => {
      const newImageUrls = [];
      let count = 0;
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (!newImageUrls.includes(url)) {
              newImageUrls.push(url);
              if (+response.items.length - 1 === count) {
                setImageUrls(newImageUrls);
                return;
              } else {
                count += 1;
              }
            }
          });
        });
      });
    });
  };
  const handleInsert = (e) => {
    const url = e?.target?.id;
    if (isInsertRowImageBg) {
      dispatch(
        updateBackgroundImage({
          area: backgroundImageArea,
          url: `url('${url}')`,
        })
      );
      const area = backgroundImageArea === "ROW" ? "CONTENT AREA" : "ROW";
      removeBackgroundImage(area);
      dispatch(changeInsertRowImageBgStatus(null));
    } else if (isChangeIconImage) {
      dispatch(insertImageIcon(url));
    } else if (isInsertGeneralImageBg) {
      dispatch(updateGeneralBgImage(`url('${url}')`));
      dispatch(changeInsertGeneralImageBgStatus(null));
    } else {
      dispatch(insertImage(url));
    }
    dispatch(changeUploadFileStatus(false));
  };
  useEffect(() => {
    const newImageUrls = [];
    let count = 0;
    listAll(imagesListRef).then((response) => {
      if (!response.items.length) {
        setImageUrls(["You don't have any images"]);
        return;
      }
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (!newImageUrls.includes(url)) {
            newImageUrls.push(url);
            if (+response.items.length - 1 === count) {
              setImageUrls(newImageUrls);
              return;
            } else {
              count += 1;
            }
          }
        });
      });
    });
  }, []);
  return (
    <div className="file_mange h-full">
      <div className="flex flex-col px-8 py-4 gap-y-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <h2 className="font-bold text-[18px] opacity-75">File Manager</h2>
            <div className="bg-violet-500 text-white text-[14px] font-semibold rounded-md">
              <label
                htmlFor="upload"
                className="cursor-pointer px-10 py-1 block"
              >
                Upload
              </label>
              <input
                type="file"
                id="upload"
                hidden
                onChange={(e) => {
                  handleUpload(e);
                }}
              />
            </div>
            <div className="bg-gray-400 text-white px-10 py-1 text-[14px] font-semibold rounded-md cursor-pointer">
              Import
            </div>
            <div className="bg-gray-400 text-white px-10 py-1 text-[14px] font-semibold rounded-md cursor-pointer">
              Search free photos
            </div>
          </div>
          <div onClick={handleClick}>
            <TiDelete className="text-[30px] cursor-pointer" />
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center text-gray-400">
          <div className="text-[20px] bg-gray-200 h-fit w-fit px-3 py-3 rounded-full shadow-md">
            <MdHome />
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="flex gap-x-3 text-[20px] items-center">
              <BsFillGrid3X3GapFill />
              <TiThMenu />
            </div>
            <span>|</span>
            <form action="">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in folder"
                  className="bg-gray-100 pl-2 pr-6 py-1 rounded-sm outline-none"
                />
                <FaSearch className="absolute top-1/2 right-0 -translate-y-2/4 right-1" />
              </div>
              <button hidden></button>
            </form>
            <FaFolderPlus className="text-[24px]" />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="w-4/5 m-auto flex justify-between items-center">
          <div className="flex items-center gap-x-6">
            <input type="checkbox" />
            <div className="flex items-center text-gray-400 font-bold text-[14px] opacity-80 cursor-pointer">
              <TbCaretUpDownFilled />
              <span>NAME</span>
            </div>
          </div>
          <div className="flex items-center gap-x-28">
            <div className="flex items-center text-gray-400 font-bold text-[14px] opacity-80 cursor-pointer">
              <TbCaretUpDownFilled />
              <span>DATE</span>
            </div>
            <div className="flex items-center text-gray-400 font-bold text-[14px] opacity-80 cursor-pointer">
              <TbCaretUpDownFilled />
              <span>SIZE</span>
            </div>
            <div className="flex items-center text-gray-400 font-bold text-[14px] opacity-80 cursor-pointer">
              <TbCaretUpDownFilled />
              <span>TYPE</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "w-4/5 m-auto pt-10 flex flex-wrap" +
          (+imageUrls.length > 6 ? " h-[470px] overflow-auto" : "")
        }
      >
        {
          imageUrls[0] === "You don't have any images" ? imageUrls[0] : (
              imageUrls?.length
                  ? imageUrls?.map((url, index) => {
                    return (
                        <div
                            className="px-4 py-4 shadow-md rounded-lg flex w-1/3 gap-x-4"
                            key={index}
                        >
                          <div className="relative">
                            {/* <Image src={avatar} alt="avatar" width={150} height={150} /> */}
                            <img
                                src={url}
                                alt=""
                                style={{
                                  width: "150px",
                                  height: "150px",
                                }}
                            />
                            <div className="absolute bg-white w-fit h-fit px-1 py-1 top-0 left-0 rounded-br-md">
                              <input type="checkbox" />
                            </div>
                          </div>
                          <div className="flex flex-col justify-between flex-1">
                            <div className="flex flex-col ">
                      <span className="text-[14px] text-gray-500">
                        {url
                            .slice(url.lastIndexOf("/") + 1, url.indexOf("?"))
                            .replaceAll("%2F", "/")
                            .slice(
                                url
                                    .slice(url.lastIndexOf("/") + 1, url.indexOf("?"))
                                    .replaceAll("%2F", "/")
                                    .indexOf("withInfo") + 8
                            )
                            .split("and")[1]
                            .replaceAll("S", "/")}
                      </span>
                              <span className="font-bold opacity-85">
                        {url
                            .slice(url.lastIndexOf("/") + 1, url.indexOf("?"))
                            .replaceAll("%2F", "/")
                            .slice(
                                url
                                    .slice(url.lastIndexOf("/") + 1, url.indexOf("?"))
                                    .replaceAll("%2F", "/")
                                    .lastIndexOf("/") + 1,
                                url
                                    .slice(url.lastIndexOf("/") + 1, url.indexOf("?"))
                                    .replaceAll("%2F", "/")
                                    .indexOf("withId")
                            )}
                      </span>
                              <div className="flex gap-x-2 text-[14px] text-gray-500">
                        <span>
                          {
                            url
                                .slice(url.lastIndexOf("/") + 1, url.indexOf("?"))
                                .replaceAll("%2F", "/")
                                .slice(
                                    url
                                        .slice(
                                            url.lastIndexOf("/") + 1,
                                            url.indexOf("?")
                                        )
                                        .replaceAll("%2F", "/")
                                        .indexOf("withInfo") + 8
                                )
                                .split("and")[0]
                          }{" "}
                          bytes
                        </span>
                                <span>|</span>
                                <span>
                          {url
                              .slice(url.lastIndexOf("/") + 1, url.indexOf("?"))
                              .replaceAll("%2F", "/")
                              .slice(
                                  url
                                      .slice(
                                          url.lastIndexOf("/") + 1,
                                          url.indexOf("?")
                                      )
                                      .replaceAll("%2F", "/")
                                      .indexOf(".") + 1,
                                  url
                                      .slice(
                                          url.lastIndexOf("/") + 1,
                                          url.indexOf("?")
                                      )
                                      .replaceAll("%2F", "/")
                                      .indexOf("withId")
                              )}
                        </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                              <hr />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-x-2 text-[18px] text-gray-700 cursor-pointer">
                                  <Link href={url} target="_blank">
                                    <LuArrowUpRightSquare />
                                  </Link>
                                  <FaTrashAlt
                                      id={url
                                          .slice(url.lastIndexOf("/") + 1, url.indexOf("?"))
                                          .replaceAll("%2F", "/")}
                                      onClick={(e) => {
                                        handleDelete(e);
                                      }}
                                  />
                                </div>
                                <button
                                    className="bg-violet-500 text-white px-4 py-1 font-semibold text-[14px] rounded-sm"
                                    onClick={(e) => {
                                      handleInsert(e);
                                    }}
                                    id={url}
                                >
                                  Insert
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                    );
                  })
                  : "Loading..."
          )
        }
      </div>
    </div>
  );
}

export default FileMange;
