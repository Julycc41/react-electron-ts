import React from "react";
import "./GetImage.scss";
import { get11 } from "./ss";
const { Document, render } = require("redocx");

export class GetImage extends React.Component {
  render() {
    return (
      <Document>
        <div id="get-image-wrapper" onClick={() => get11("get-image-wrapper")}>
          <div>生成</div>
          <div id="get-waypoint-list">
            <p>航点32613</p>
            <p>包含组串</p>
          </div>
          <div id="43124141">
            <p>weqeq</p>
            <p>eqweq</p>
          </div>
        </div>
      </Document>
    );
  }
}

render(<GetImage />, `${1111}.docx`);
