import React from "react";
import Edit from "./Edit";
import { cookies } from "next/headers";

function EditPage() {
  const token = cookies().get("token");
  const { accessToken } = JSON.parse(token.value);
  return (
    <>
      <Edit accessToken={accessToken} />
    </>
  );
}

export default EditPage;
