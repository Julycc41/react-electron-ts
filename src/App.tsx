import React from "react";
import "./App.css";
import GetImage from "./component/GetImage";
import { createFile } from "./component/GetImage/createfile";
import WindowBar from "./component/WindowBar";
function App() {
  let selectedIds = []; //存放被选中的数据
  let preIdx = 0; //被选中的数组的第一个值，用以比较范围

  let ul: any = document.getElementById("main");
  let lis = document.getElementsByTagName("li");

  function ulclick(event: { target: any; shiftKey: any }) {
    selectedIds = [];
    let target = event.target;
    let idx = target.dataset.index;

    if (event.shiftKey) {
      let max = Math.max(preIdx, idx);
      let min = Math.min(preIdx, idx);
      for (let j = min; j <= max; j++) {
        selectedIds.push(j);
      }
      for (let i = 0; i < lis.length; i++) {
        let itemIdx = selectedIds.findIndex((c) => c == i);
        if (itemIdx > -1) {
          lis[i].style.background = "cyan";
        } else {
          lis[i].style.background = "transparent";
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        if (i == idx) {
          lis[idx].style.background = "cyan";
        } else {
          lis[i].style.background = "transparent";
        }
      }
      selectedIds.push(idx);
      preIdx = idx;
    }

    console.log(selectedIds);
  }

  return (
    <div className="App">
        <WindowBar leftContent="无人机智能巡检系统" />
      <div onClick={() => createFile()}>生成文件</div>
      <div id="container">
        <div className="left">
          <ul id="main" onClick={ulclick}>
            <li data-index="0">这是按住shift键多选测试0</li>
            <li data-index="1">这是按住shift键多选测试1</li>
            <li data-index="2">这是按住shift键多选测试2</li>
            <li data-index="3">这是按住shift键多选测试3</li>
            <li data-index="4">这是按住shift键多选测试4</li>
            <li data-index="5">这是按住shift键多选测试5</li>
          </ul>
        </div>
        <div className="right"></div>
      </div>
    
      {/* <RealTimeControl></RealTimeControl> */}
      <GetImage />
    </div>
  );
}

export default App;
