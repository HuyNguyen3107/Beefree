"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";

function ChangePasswordForm() {
  // create user change password form with background color of white and box shadow with current password, new password and confirm new password input fields and label for each filed and save button
  return (
    <div className="bg-white p-6 shadow rounded w-[48%]">
      <h3 className="text-[18px] font-semibold">Change Password</h3>
      <div className="mt-4">
        <label
          htmlFor="currentPassword"
          className="block text-[14px] font-medium"
        >
          Current Password
        </label>
        <Input
          color="secondary"
          id="currentPassword"
          type="password"
          placeholder="Current Password"
          className="mt-1"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="newPassword" className="block text-[14px] font-medium">
          New Password
        </label>
        <Input
          color="secondary"
          id="newPassword"
          type="password"
          placeholder="New Password"
          className="mt-1"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="confirmNewPassword"
          className="block text-[14px] font-medium"
        >
          Confirm New Password
        </label>
        <Input
          color="secondary"
          id="confirmNewPassword"
          type="password"
          placeholder="Confirm New Password"
          className="mt-1"
        />
      </div>
      <div className="mt-6">
        <Button color="secondary" className="w-full">
          Update Password
        </Button>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
