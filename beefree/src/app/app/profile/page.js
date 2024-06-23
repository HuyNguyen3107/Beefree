import React from "react";
import UserInfoForm from "./components/UserInfoForm/UserInfoForm";
import ChangePasswordForm from "./components/ChangePasswordForm/ChangePasswordForm";

function ProfilePage() {
  return (
    <div className="w-[70%] mx-auto py-10">
      <h2 className="text-[22px] font-semibold">Profile</h2>
      <div className="flex mt-4 justify-between">
        <UserInfoForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default ProfilePage;
