import React from "react";
import { KillZone } from "./KillZone";
import "./WindowBar.scss";

type SlotContent = string | JSX.Element;

interface Props {
  leftContent: SlotContent;
  rightContent?: SlotContent;
}

export const WindowBar = ({ leftContent, rightContent }: Props) => {
  return (
    <div className="window-bar-wrapper">
      <div className="slot">
        {typeof leftContent !== "string" ? (
          leftContent
        ) : (
          <div className="title-text" style={{ WebkitAppRegion: "drag" } as any}>
            {leftContent}
          </div>
        )}
      </div>
      <div className="blank" style={{ WebkitAppRegion: "drag" } as any} />
      {rightContent !== undefined && (
        <div className="slot">
          {typeof rightContent !== "string" ? rightContent : <div className="title-text">{rightContent}</div>}
        </div>
      )}
      <KillZone />
    </div>
  );
};
