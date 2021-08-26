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
  const [current, setCurrent] = useState<any>([])
  function ulclick(type: any, event: any) {
    const idx = shiftLIst.findIndex(item => item.type === type)
    if (event.shiftKey) {
      let max = Math.max(preIdx, idx)
      let min = Math.min(preIdx, idx)
      const list = shiftLIst.map((item, index) => (index >= min && index <= max ? item.type : false)).filter(item => item)
      setCurrent(list)
    } else {
      setPreIdx(idx)
      setCurrent([shiftLIst[idx].type])
    }
  }

  return (
    <div className="App">
      <WindowBar leftContent="无人机智能巡检系统" />
      <div onClick={() => createFile()}>生成文件</div>
      <div onClick={() => readFileStream('C:/Users/caper/Desktop/code-work/desktop-solar-plant/resource/69/task/585.zip')}>读取文件</div>
      <div className="App">
        {shiftLIst.map((item: any, index: any) => {
          return (
            <p onClick={e => ulclick(item.type, e)}>
              <Checkbox data-index={index} checked={current.includes(item.type)} value={item.name}>
                {item.name}
              </Checkbox>
            </p>
          )
        })}
      </div>
      {/* <RealTimeControl></RealTimeControl> */}
      <GetImage />
    </div>
  )
}

export default App
