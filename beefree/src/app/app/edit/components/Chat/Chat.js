"use client";

import React, { useState, useEffect } from "react";

function ChatSpace() {
  return (
    <div className="h-screen">
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-full flex items-center flex-col justify-center">
        <p className="text-xl text-white font-extrabold">
          Chat Feature is still under development
        </p>
        <span className="text-white">......</span>
      </div>
    </div>
  );
}

export default ChatSpace;

// import { StreamChat } from "stream-chat";
// import {
//   Chat,
//   Channel,
//   Window,
//   ChannelHeader,
//   MessageList,
//   MessageInput,
//   Thread,
//   LoadingIndicator,
// } from "stream-chat-react";

// import "stream-chat-react/dist/css/index.css";

// const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_API_KEY;
// const secretKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_SECRET_KEY;

// const user = {
//   id: "user",
//   name: "User",
//   image:
//     "https://tse2.mm.bing.net/th?id=OIP.3YlQm0XZq1d8wH8ut43vZwHaFb&pid=Api&P=0&h=180",
// };

// const [client, setClient] = useState(null);
//   const [channel, setChannel] = useState(null);

//   useEffect(() => {
//     async function init() {
//       const chatClient = StreamChat.getInstance(apiKey);

//       const { app } = await chatClient.getAppSettings();
//       console.log(app.permission_version);
//       // disable auth checks, allows dev token usage
//       await chatClient.updateAppSettings({
//         disable_auth_checks: true,
//       });

//       // disable permission checks
//       await chatClient.updateAppSettings({
//         disable_permissions_checks: true,
//       });

//       await chatClient.connectUser(user, chatClient.devToken(user.id));

//       const channel = chatClient.channel("messaging", "beefree talk", {
//         image:
//           "https://tse2.mm.bing.net/th?id=OIP.3YlQm0XZq1d8wH8ut43vZwHaFb&pid=Api&P=0&h=180",
//         name: "Talk about BeeFree",
//         members: [user.id],
//       });

//       await channel.watch();

//       setChannel(channel);
//       setClient(chatClient);
//     }

//     init();
//     if (client) {
//       return () => client.disconnectUser();
//     }
//   }, []);
//   if (!client || !channel) {
//     return <LoadingIndicator />;
//   }
//   return (
//     <>
//       <Chat client={client} theme={"messaging light"}>
//         <Channel channel={channel}>
//           <Window>
//             <ChannelHeader />
//             <MessageList />
//             <MessageInput />
//           </Window>
//           <Thread />
//         </Channel>
//       </Chat>
//     </>
//   );
