import React from "react";
import UserInfoForm from "./components/UserInfoForm/UserInfoForm";
import ChangePasswordForm from "./components/ChangePasswordForm/ChangePasswordForm";
import { headers } from "next/headers";
import { getSessionServer } from "@/utils/session";
import { ToastBox } from "@/utils/toast";

async function ProfilePage() {
  const session = await getSessionServer(headers().get("cookie"));
  return (
    <div className="w-[70%] mx-auto py-10">
      <h2 className="text-[22px] font-semibold">Profile</h2>
      <div className="flex mt-4 justify-between">
        <UserInfoForm data={session.data} />
        <ChangePasswordForm />
        <ToastBox />
      </div>
    </div>
  );
}

export default ProfilePage;
