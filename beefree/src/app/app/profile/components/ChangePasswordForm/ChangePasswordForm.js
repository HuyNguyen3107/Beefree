"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import Spinner from "@/components/Spinner/Spinner";
import { notifyWarning, notifySuccess } from "@/utils/toast";
import { handleChangePassword } from "../../action";

function ChangePasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <form
        action={async (form) => {
          setIsLoading(true);
          const response = await handleChangePassword(form);
          setIsLoading(false);
          if (!response.success) {
            notifyWarning(response.error);
            return;
          }
          notifySuccess("Password changed successfully");
        }}
        className="bg-white p-6 shadow rounded w-[48%]"
      >
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
            name="currentPassword"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="newPassword"
            className="block text-[14px] font-medium"
          >
            New Password
          </label>
          <Input
            color="secondary"
            id="newPassword"
            type="password"
            placeholder="New Password"
            className="mt-1"
            name="newPassword"
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
            name="confirmNewPassword"
          />
        </div>
        <div className="mt-6">
          <Button color="secondary" className="w-full" type="submit">
            Update Password
          </Button>
        </div>
      </form>
      <Spinner isLoading={isLoading} />
    </>
  );
}

export default ChangePasswordForm;
