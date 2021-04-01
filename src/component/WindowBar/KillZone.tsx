import { BlockOutlined, BorderOutlined, CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { observer, useObserver } from "mobx-react";
import React, { useState } from "react";
import "./WindowBar.scss";
const { ipcRenderer } = window.require("electron");

export const KillZone = observer(({ needMaxButton = true }: { needMaxButton?: boolean }) => {
  const [maximized, setMaximized] = useState(false);
  const handleMax = () => {
    maximized ? ipcRenderer.send("window-restore") : ipcRenderer.send("window-maximize");
    setMaximized((s) => !s);
  };

  const windowClose = () => {
    ipcRenderer.send("window-close");
  };

  return useObserver(() => (
    <div className="kill-zone">
      <Button type="text" onClick={() => ipcRenderer.send("window-minimize")}>
        <MinusOutlined />
      </Button>
      {needMaxButton && (
        <Button type="text" onClick={handleMax}>
          {maximized ? <BlockOutlined /> : <BorderOutlined />}
        </Button>
      )}
      <Button type="text" onClick={windowClose}>
        <CloseOutlined />
      </Button>
    </div>
  ));
});
