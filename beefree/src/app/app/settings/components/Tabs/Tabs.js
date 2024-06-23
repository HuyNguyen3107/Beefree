"use client";

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import GeneralSettings from "../GeneralSettings/GeneralSettings";
import Styles from "../Styles/Styles";
import Connectors from "../Connectors/Connectors";

function TabsComponent() {
  return (
    <div className="flex w-full flex-col mt-4">
      <Tabs aria-label="Options" color="secondary" size="lg" radius="sm">
        <Tab key="general_settings" title="General settings">
          <Card>
            <CardBody>
              <GeneralSettings />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="styles" title="Styles">
          <Card>
            <CardBody>
              <Styles />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="connectors" title="Connectors">
          <Card>
            <CardBody>
              <Connectors />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabsComponent;
