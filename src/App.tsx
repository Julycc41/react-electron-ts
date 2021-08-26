import { Checkbox } from 'antd'
import React, { useState } from 'react'
import './App.css'
import { shiftLIst } from './assets/js/constants'
import GetImage from './component/GetImage'
import { createFile } from './component/GetImage/createfile'
import WindowBar from './component/WindowBar'
import { readFileStream } from './readFile'
function App() {
  const [preIdx, setPreIdx] = useState(0)
  const [dataList, setDataList] = useState(shiftLIst.map(item => ({ ...item, checked: false })))
  function ulclick(type: any, event: any) {
    const idx = dataList.findIndex(item => item.type === type)
    if (event.shiftKey) {
      let max = Math.max(preIdx, idx)
      let min = Math.min(preIdx, idx)
      const list = dataList.map((item, index) => ({ ...item, checked: index >= min && index <= max ? true : false }))
      setDataList(list)
    } else {
      const list = dataList.map((item, index) => ({ ...item, checked: index === idx ? true : false }))
      setDataList(list)
      setPreIdx(idx)
    }
  }
  return (
    <div className="App">
      <WindowBar leftContent="无人机智能巡检系统" />
      <div onClick={() => createFile()}>生成文件</div>
      <div onClick={() => readFileStream('C:/Users/caper/Desktop/code-work/desktop-solar-plant/resource/69/task/585.zip')}>读取文件</div>
      <div id="container">
        <div className="left">
          {dataList.map((item, index) => {
            return (
              <p onClick={e => ulclick(item.type, e)}>
                <Checkbox data-index={index} checked={item.checked} value={item.name}>
                  {item.name}
                </Checkbox>
              </p>
            )
          })}
        </div>
        <div className="right"></div>
      </div>
      {/* <RealTimeControl></RealTimeControl> */}
      <GetImage />
    </div>
  )
}

export default App
