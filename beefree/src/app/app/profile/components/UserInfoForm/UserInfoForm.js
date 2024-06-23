"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";

function UserInfoForm() {
  return (
    <div className="bg-white p-6 shadow rounded w-[48%]">
      <h3 className="text-[18px] font-semibold">User Information</h3>
      <div className="mt-4">
        <label htmlFor="email" className="block text-[14px] font-medium">
          Email
        </label>
        <Input
          disabled
          color="secondary"
          id="email"
          type="email"
          placeholder="Email"
          className="mt-1"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="firstName" className="block text-[14px] font-medium">
          First Name
        </label>
        <Input
          color="secondary"
          id="firstName"
          type="text"
          placeholder="First Name"
          className="mt-1"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="lastName" className="block text-[14px] font-medium">
          Last Name
        </label>
        <Input
          color="secondary"
          id="lastName"
          type="text"
          placeholder="Last Name"
          className="mt-1"
        />
      </div>
      <div className="mt-6">
        <Button color="secondary" className="w-full">
          Update
        </Button>
      </div>
    </div>
  );
}

export default UserInfoForm;
