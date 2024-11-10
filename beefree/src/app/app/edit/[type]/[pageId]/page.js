import React from "react";
import Edit from "./Edit";
import {cookies, headers} from "next/headers";
import {getSessionServer} from "@/utils/session";

async function EditPage() {
  const token = cookies().get("token");
  const { accessToken } = JSON.parse(token.value);
  const session = await getSessionServer(headers().get("cookie"));
  return (
    <>
      <Edit accessToken={accessToken} userId={session?.data?.id}/>
    </>
  );
}

export default EditPage;
