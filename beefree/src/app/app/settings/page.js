import React from "react";
import TabsComponent from "./components/Tabs/Tabs";

function SettingPage() {
  return (
    <div className="settings px-8 py-8">
      <h2 className="text-2xl font-bold">Settings</h2>
      <TabsComponent />
    </div>
  );
}

export default SettingPage;
