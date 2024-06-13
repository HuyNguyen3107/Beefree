"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import RowProperties from "../RowProperties/RowProperties";
import RowEditor from "../RowEditor/RowEditor";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const { addRow } = builderSlice.actions;

function RowSidebar() {
  const dispatch = useDispatch();
  const isRowEdit = useSelector((state) => state.builder.isRowEdit);
  return (
    <div className="h-screen bg-gray-100 ">
      {isRowEdit ? (
        <>
          <RowProperties />
          <RowEditor />
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <Button
            color="secondary"
            className="w-[200px] text-[22px] font-bold h-[200px] rounded-full"
            onClick={() => {
              dispatch(addRow());
            }}
          >
            Add new row
          </Button>
        </div>
      )}
    </div>
  );
}

export default RowSidebar;
