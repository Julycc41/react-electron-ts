import { observer, useObserver } from "mobx-react";
import React, { useState } from "react";
import { OPERATION_CONTROL, PLANE_CONTROL } from "../../assets/js/constants";
import { OperationControl, PlaneControl } from "../../typings/interface";
import "./RealTimeControl.scss";

export const RealTimeControl = observer(() => {
  const [currentSelectControl, setCurrentSelectControl] = useState<
    string | null
  >(null);
  const [photoTakingCount, setPhotoTakingCount] = useState(0);
  let [zoomParams, setZoomParams] = useState(0); //当前变倍档位
  let [actionValue, setActionValue] = useState(0); //当前控制机身角度值
  let [ptzParams, setPtzParams] = useState(-90); //当前云台角度
  const currentCount = 5; //每次调整的数量
  const [state, setstate] = useState(0);
  const changeCurrentSelectControl = (controlKey: string, type: string) => {
    setCurrentSelectControl(controlKey);
    let droneHandType: any = {};
    let move: any = {};
    let action = "";
    let zoom: any = {};
    let take_pic = {};
    let ptz: any = {};
    if (controlKey === OperationControl.xiangji) {
      setPhotoTakingCount(photoTakingCount + 1);
    }
    action = type;
    if (controlKey === PlaneControl.shang) {
      //云台控制上 90 -90 ptz_params
      ptzParams += currentCount;
      if (ptzParams > 0) {
        ptzParams = 0;
      }
      ptz.ptz_params = ptzParams;
      setPtzParams(ptzParams);
      droneHandType = ptz;
      console.log("云台上", ptzParams);
    } else if (controlKey === PlaneControl.xia) {
      //云台控制下
      ptzParams -= currentCount;
      if (ptzParams < -90) {
        ptzParams = -90;
      }
      ptz.ptz_params = ptzParams;
      setPtzParams(ptzParams);
      droneHandType = ptz;
      console.log("云台下", ptzParams);
    } else if (controlKey === PlaneControl.you) {
      //机身控制左  180 -180 action_value
      move.action_type = 6;
      move.action_value = -currentCount;
      droneHandType = move;
      console.log("机身左", actionValue);
      setActionValue(actionValue);
    } else if (controlKey === PlaneControl.zuo) {
      //机身控制右
      move.action_type = 6;
      move.action_value = +currentCount;
      droneHandType = move;
      console.log("机身右", actionValue);
      setActionValue(actionValue);
    } else if (controlKey === PlaneControl.shuaxin) {
      //刷新
      move.action_type = 6;
      move.action_value = 0;
      droneHandType = move;
      console.log("机身角度归位", actionValue);
    } else if (controlKey === OperationControl.xiangji) {
      //拍照
      droneHandType = take_pic;
    } else if (controlKey === OperationControl.fangda) {
      //放大
      zoomParams += currentCount;
      zoomParams >= 30 && (zoomParams = 30);
      zoom.zoom_params = zoomParams;
      droneHandType = zoom;
      setZoomParams(zoomParams);
      console.log("放大", zoomParams);
    } else if (controlKey === OperationControl.suoxiao) {
      //缩小
      zoomParams -= currentCount;
      zoomParams <= 0 && (zoomParams = 0);
      zoom.zoom_params = zoomParams;
      droneHandType = zoom;
      setZoomParams(zoomParams);
      console.log("缩小", zoomParams);
    }
    console.log(action, droneHandType);
  };

  async function getMoney() {
    for (let i = 0; i < 30; i++) {
      await setstate(i);
    }
  }

  return useObserver(() => (
    <div className="real-time-control-wrapper">
      <div onClick={getMoney}>a加加加</div>
      <div>{state}</div>
      <div className="control-wrapper">
        <div className="control-slider-wrapper">
          <div className="control-direction">
            {PLANE_CONTROL.map((itemType) => (
              <div
                className={[
                  `iconfont icon-${itemType.type}`,
                  itemType.index,
                  currentSelectControl === itemType.index
                    ? "control-active"
                    : "",
                ].join(" ")}
                key={itemType.index}
                onClick={() =>
                  changeCurrentSelectControl(itemType.index, itemType.type)
                }
              ></div>
            ))}
          </div>

          <div className="control-operation">
            {OPERATION_CONTROL.map((itemType) => (
              <span
                className={[
                  `iconfont icon-${itemType.type}`,
                  currentSelectControl === itemType.index
                    ? "control-active"
                    : "",
                ].join(" ")}
                key={itemType.index}
                onClick={() =>
                  changeCurrentSelectControl(itemType.index, itemType.type)
                }
              >
                {itemType.index === OperationControl.xiangji &&
                  photoTakingCount !== 0 && <b>{photoTakingCount}</b>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  ));
});
