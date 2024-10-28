"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import Spinner from "@/components/Spinner/Spinner";
import { handleUpdateUserInfo } from "../../action";
import { notifySuccess, notifyWarning } from "@/utils/toast";
import { useRouter } from "next/navigation";

function UserInfoForm({ data: userData }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  return (
    <>
      <form
        action={async (form) => {
          setIsLoading(true);
          const response = await handleUpdateUserInfo(form);
          setIsLoading(false);
          if (!response.success) {
            notifyWarning(response.error);
            return;
          }
          notifySuccess("User information updated successfully");
          router.push("/app/profile");
        }}
        className="bg-white p-6 shadow rounded w-[48%]"
      >
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
            value={userData?.email}
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
            defaultValue={userData?.firstName}
            name="firstName"
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
            defaultValue={userData?.lastName}
            name="lastName"
          />
        </div>
        <div className="mt-6">
          <Button color="secondary" className="w-full" type="submit">
            Update
          </Button>
        </div>
      </form>
      <Spinner isLoading={isLoading} />
    </>
  );
}

export default UserInfoForm;
