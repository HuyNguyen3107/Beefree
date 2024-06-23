"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { projectSlice } from "@/redux/slice/projectSlice";
import { notifySuccess } from "@/utils/toast";
const { updateProject } = projectSlice.actions;

function SaveButton() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.builder.data);
  const projectInfo = useSelector((state) => state.builder.projectInfo);
  return (
    <Button
      color="secondary"
      className="font-bold"
      onClick={() => {
        dispatch(updateProject({ projectInfo, data }));
        notifySuccess("Saved!");
      }}
    >
      Save
    </Button>
  );
}

export default SaveButton;
