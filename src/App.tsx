import React, { useState } from 'react'
import './App.css'
import { shiftLIst } from './assets/js/constants'
import GetImage from './component/GetImage'
import { createFile } from './component/GetImage/createfile'
import WindowBar from './component/WindowBar'
import { readFileStream } from './readFile'
function App() {
  let selectedIds = [] //存放被选中的数据
  let preIdx = 0 //被选中的数组的第一个值，用以比较范围

  let ul: any = document.getElementById('main')
  let lis = document.getElementsByTagName('li')
  const [state, setstate] = useState(0)
  function ulclick(event: { target: any; shiftKey: any }) {
    selectedIds = []
    let target = event.target
    let idx = target.dataset.index

    if (event.shiftKey) {
      let max = Math.max(preIdx, idx)
      let min = Math.min(preIdx, idx)
      for (let j = min; j <= max; j++) {
        selectedIds.push(j)
      }
      for (let i = 0; i < lis.length; i++) {
        let itemIdx = selectedIds.findIndex(c => c == i)
        if (itemIdx > -1) {
          lis[i].style.background = 'cyan'
        } else {
          lis[i].style.background = 'transparent'
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        if (i == idx) {
          lis[idx].style.background = 'cyan'
        } else {
          lis[i].style.background = 'transparent'
        }
      }
      selectedIds.push(idx)
      preIdx = idx
    }

    console.log(selectedIds)
  }

  const list = []
  function a() {
    for (let i = 0; i < 30; i++) {
      console.log(i)
      setstate(i)
    }
  }
  return (
    <div className="App">
      <WindowBar leftContent="无人机智能巡检系统" />
      {/* <RealTimeControl></RealTimeControl> */}

      <div onClick={() => createFile()}>生成文件</div>
      <div onClick={() => readFileStream('C:/Users/caper/Desktop/code-work/desktop-solar-plant/resource/69/task/585.zip')}>读取文件</div>
      <div id="container">
        <div className="left">
          <ul id="main" onClick={ulclick}>
            {shiftLIst.map((item, index) => {
              return <li data-index={index}>{item.name}</li>
            })}
          </ul>
        </div>
        <div className="right"></div>
      </div>
      <div>{state}</div>
      {/* <RealTimeControl></RealTimeControl> */}
      <GetImage />
    </div>
  )
}

export default App
