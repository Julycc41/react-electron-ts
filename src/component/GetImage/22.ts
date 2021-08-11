export const ss=()=>{
  
}
// import { Button, Empty, message, Radio, Table, Tooltip } from "antd";
// import { observer, useObserver } from "mobx-react";
// import React from "react";
// import { getTaskPath, getTaskPointPhotoJsonPath } from "../../../../../../assets/js/getPaths";
// import { checkFileExists, setJsonPromise } from "../../../../../../assets/js/localStore";
// import { getDefectAlgo, getNewDefect, getPoints, rePacketLock } from "../../../../../../service/api";
// import { plantStore } from "../../../../../../store/plant/plantStore";
// import taskStore from "../../../../../../store/task";
// import { getAlgoState, getDefectTransformation, handleAlgorithState, pointFetchDataRecursive } from "../../methods";
// import PointProcess from "../PointProcess";
// import "./SceneSort.scss";

// const JsZip = require("jszip");
// const fs = window.require("fs");
// export const SceneSort = observer(
//   ({
//     radioValue,
//     handleCancel,
//     changeSetImageSelectType,
//     logPath,
//     continues,
//     onClickClose,
//     succeedOnClose,
//     deleteAll,
//     imageStore,
//     uploadFlag,
//     changeUploadFlag,
//   }) => {
//     const { localRepetition, setSelectChecked, selectChecked, successUploadStatus, setSuccessUploadStatus } =
//       imageStore;
//     const { currentTask, setPoints, setDefects } = taskStore;
//     const { currentPlant } = plantStore;
//     const onChangeRadio = (e) => {
//       console.log("radio checked", e.target.value);
//       setSelectChecked(e.target.value);
//     };

//     const columns: any = [
//       {
//         title: "航点编号",
//         dataIndex: "name",
//         width: 120,
//         fixed: "left",
//       },
//       {
//         title: "图像名称(红外/可见光)",
//         dataIndex: "imageUrl",
//         width: 130,
//         fixed: "left",
//         render: (imageUrl) => (
//           <span>
//             {imageUrl.map((imageUrl, index) => {
//               return (
//                 <span key={index}>
//                   {imageUrl.infrared_name}
//                   {index === 0 && "/ "}
//                   {imageUrl.light_name}
//                 </span>
//               );
//             })}
//           </span>
//         ),
//       },

//       {
//         title: "图像大小(红外/可见光)",
//         dataIndex: "size",
//         width: 170,
//         render: (size) => (
//           <span>
//             {size.map((size, index) => {
//               return (
//                 <span key={index}>
//                   {size.infrared_size} {index === 0 && "/ "} {size.light_size}
//                 </span>
//               );
//             })}
//           </span>
//         ),
//       },
//       {
//         title: "图像比例(红外/可见光)",
//         dataIndex: "ratio",
//         width: 120,
//         render: (ratio) => (
//           <span>
//             {ratio.map((ratio, index) => {
//               return (
//                 <span key={index}>
//                   {ratio.infrared_ratio}*{ratio.light_ratio} {index === 0 && "/ "}
//                 </span>
//               );
//             })}
//           </span>
//         ),
//       },
//       {
//         title: "经度",
//         dataIndex: "longitude",
//         ellipsis: {
//           showTitle: true,
//         },
//         render: (address) => (
//           <Tooltip placement="topLeft" title={address}>
//             {address}
//           </Tooltip>
//         ),

//         width: 120,
//       },
//       {
//         title: "纬度",
//         dataIndex: "latitude",
//         ellipsis: {
//           showTitle: true,
//         },
//         render: (address) => (
//           <Tooltip placement="topLeft" title={address}>
//             {address}
//           </Tooltip>
//         ),
//         width: 120,
//       },
//       {
//         title: "高度",
//         dataIndex: "altitude",
//       },
//     ];

//     function onChange(pagination, filters, sorter, extra) {
//       console.log("params", pagination, filters, sorter, extra);
//     }
//     const changSelectType = (type) => {
//       //删除本地数据
//       changeSetImageSelectType(type);
//     };
//     //上传数据包切片进度条响应方法
//     const progressResponse = (message, progress) => {
//       setSuccessUploadStatus(Math.floor(progress));
//     };
//     //上传新建数据
//     const upLoad = async () => {
//       changeUploadFlag(true);
//       message.loading({
//         content: "数据上传中...",
//         duration: 0,
//         key: currentTask.id,
//       });
//       if (!localRepetition.length) {
//         message.error({
//           content: "当前未有数据可上传",
//           key: currentTask.id,
//         });

//         return;
//       }
//       continues.current = true;
//       const getContinues = () => continues.current; // 用于用户中断
//       const zip = new JsZip();
//       let uploadDeleteDefectPoints = localRepetition.filter((item) => selectChecked !== item.lens);

//       let uploadDefectPoints = localRepetition.filter(
//         (item) => selectChecked === item.lens && item.selectType !== "service",
//       );

//       let currentTaskPath = getTaskPath(currentPlant.id, currentTask.id, false);
//       let deletePath = [];
//       //例如有2中镜头类型 筛选出非选择的进行删除
//       uploadDeleteDefectPoints.forEach((item) => {
//         let itemPath = getTaskPointPhotoJsonPath(currentPlant.id, currentTask.id, item.ids, false);
//         let infraredUrl = `${currentTaskPath}\\${item.infrared_name}`;
//         let lightUrl = `${currentTaskPath}\\${item.light_name}`;
//         deletePath.push(itemPath, infraredUrl, lightUrl);
//       });

//       deletePath.map((itemPath) => {
//         // console.log(itemPath, "删除的");
//         if (checkFileExists(itemPath)) {
//           if (fs.existsSync(itemPath)) {
//             fs.unlinkSync(itemPath);
//           }
//         }
//       });

//       const servicePoints: any = await getPoints(currentTask.id);

//       //作为上传
//       if (!servicePoints.length) {
//         uploadDefectPoints.map((item, index) => {
//           let imagesJsonPath = getTaskPointPhotoJsonPath(currentPlant.id, currentTask.id, item.ids, false);
//           let infraredUrl = `${currentTaskPath}\\${item.infrared_name}`;
//           let lightUrl = `${currentTaskPath}\\${item.light_name}`;

//           try {
//             if (checkFileExists(imagesJsonPath) && checkFileExists(infraredUrl) && checkFileExists(lightUrl)) {
//               // console.log(imagesJsonPath, infraredUrl, lightUrl, "上传的");

//               zip.folder(`${currentTask.id}`);
//               zip.file(`${currentTask.id}/${item.light_name}`, fs.readFileSync(lightUrl), { base64: true });
//               zip.file(`${currentTask.id}/${item.infrared_name}`, fs.readFileSync(infraredUrl), { base64: true });
//               zip.file(`${currentTask.id}/${item.ids}.json`, fs.readFileSync(imagesJsonPath, "utf-8"));
//             }
//           } catch (error) {
//             message.error({
//               content: "当前有文件数据不存在请查找",
//               key: currentTask.id,
//             });
//             console.log(imagesJsonPath, infraredUrl, lightUrl);
//           }
//         });
//       } else {
//         //作为更新
//         uploadDefectPoints.map((item, index) => {
//           let imagesJsonPath = getTaskPointPhotoJsonPath(currentPlant.id, currentTask.id, item.ids, false);
//           let infraredUrl = `${currentTaskPath}\\${item.infrared_name}`;
//           let lightUrl = `${currentTaskPath}\\${item.light_name}`;

//           try {
//             if (checkFileExists(imagesJsonPath) && checkFileExists(infraredUrl) && checkFileExists(lightUrl)) {
//               // console.log(imagesJsonPath, infraredUrl, lightUrl, "上传的");
//               zip.file(`${item.light_name}`, fs.readFileSync(lightUrl), { base64: true });
//               zip.file(`${item.infrared_name}`, fs.readFileSync(infraredUrl), { base64: true });
//               zip.file(`${item.ids}.json`, fs.readFileSync(imagesJsonPath, "utf-8"));
//             }
//           } catch (error) {
//             message.error({
//               content: "当前有文件数据不存在请查找",
//               key: currentTask.id,
//             });
//             console.log(imagesJsonPath, infraredUrl, lightUrl);
//           }
//         });
//       }

//       zip
//         .generateInternalStream({
//           type: "blob",
//           compression: "DEFLATE",
//           compressionOptions: {
//             level: 8,
//           },
//           streamFiles: true,
//         })
//         .on("data", (data: any, metadata: any) => console.log(data))
//         .on("end", () => console.log())
//         .resume();
//       // .then(async (content) => {
//       //   if (servicePoints.length >= 1) {
//       //     //更新
//       //     var fils = new File([content], "images.zip", { type: "application/zip" });

//       //     await getPacketLock(currentTask.id) //获取锁
//       //       .then((res: any) => {
//       //         const lock = res.data;
//       //         upLoadPointChunk(
//       //           fils,
//       //           currentPlant,
//       //           currentTask,
//       //           continues.current,
//       //           successResponse,
//       //           errorResponse,
//       //           progressResponse,
//       //           lock,
//       //         );
//       //       });
//       //   } else {
//       //     //上传zip切片
//       //     addLoadPointChunk(
//       //       content,
//       //       currentPlant,
//       //       currentTask,
//       //       successResponse,
//       //       errorResponse,
//       //       progressResponse,
//       //       radioValue,
//       //       getContinues,
//       //       selectChecked,
//       //     );
//       //   }
//       // })
//       // .catch((error) => {
//       //   console.log(error);
//       //   debugger;
//       //   message.error({
//       //     content: "压缩错误",
//       //     key: currentTask.id,
//       //   });

//       //   // onClickClose();
//       // });
//     };
//     //上传成功回调
//     const successResponse = async () => {
//       message.loading({
//         content: "算法正在计算中...",
//         duration: 0,
//         key: currentTask.id,
//       });
//       const getContinues = () => continues.current; // 用于用户中断
//       await handleAlgorithState(currentTask.id, 5000, getContinues)
//         .then(async (res) => {
//           message.success({
//             content: "算法成功",
//             key: currentTask.id,
//           });
//           await startAlgo();
//         })
//         .catch((error) => {
//           message.error({
//             content: "算法失败",
//             key: currentTask.id,
//           });

//           onClickClose();
//         });
//     };
//     const errorResponse = () => {
//       message.error({
//         content: "上传失败",
//         key: currentTask.id,
//       });

//       onClickClose();
//     };
//     const getContinues = () => continues.current; // 用于用户中断

//     //畸变矫正
//     const startAlgo = async () => {
//       if (!getContinues()) {
//         return;
//       }
//       await getDefectAlgo(currentTask.id, "rectify").then(async (res) => {
//         message.loading({
//           content: "开始畸变校正...",
//           duration: 0,
//           key: currentTask.id,
//         });
//         if (!getContinues()) {
//           return;
//         }
//         await getAlgoState(currentTask.id, 5000, "rectify", getContinues)
//           .then((res) => {
//             if (!getContinues()) {
//               return;
//             } else {
//               message.success({
//                 content: "矫正成功",
//                 key: currentTask.id,
//               });

//               startTransformation();
//             }
//           })
//           .catch((error) => {
//             message.error({
//               content: "矫正失败",
//               key: currentTask.id,
//             });

//             onClickClose();
//           });
//       });
//     };
//     //区域转换
//     const startTransformation = async () => {
//       if (!getContinues()) {
//         return;
//       }
//       await getDefectAlgo(currentTask.id, "transform").then(async (res) => {
//         if (!getContinues()) {
//           return;
//         }
//         message.loading({
//           content: "开始区域转换...",
//           duration: 0,
//           key: currentTask.id,
//         });
//         if (!getContinues()) {
//           message.error({
//             content: "转换失败",
//             key: currentTask.id,
//           });

//           return;
//         }
//         await getDefectTransformation(currentTask.id, 5000, "transform")
//           .then(async (res) => {
//             if (!getContinues()) {
//               return;
//             }
//             rePacketLock(currentTask.id);
//             message.success({
//               content: "转换成功",
//               key: currentTask.id,
//             });
//             if (!getContinues()) {
//               return;
//             }
//             await getNewDefect(currentPlant.id, currentTask.id).then(async (res: any) => {
//               let newDefect = [];
//               res.forEach(async (item) => {
//                 let pathJson = getTaskPointPhotoJsonPath(currentPlant.id, currentTask.id, item.ids, false);
//                 if (item.defects.length) {
//                   item.defectStatus = 1; //有缺陷 1
//                   item.defectLength = item.defects.length;
//                   newDefect.push(...item.defects);
//                 } else {
//                   item.defectStatus = 0; //没有缺陷 0
//                 }
//                 await setJsonPromise(pathJson, item);
//               });

//               setDefects([...newDefect]);
//               pointFetchDataRecursive(res, currentPlant.id, currentTask.id);
//               setPoints(res);
//             });

//             succeedOnClose();
//           })
//           .catch((error) => {
//             message.error({
//               content: "转换失败",
//               key: currentTask.id,
//             });

//             onClickClose();
//           });
//       });
//     };
//     return useObserver(() => (
//       <div className="scene-sort-wrapper">
//         {successUploadStatus !== 0 && (
//           <div className="image-sort-edit-progress">
//             上传进度<PointProcess successProcess={successUploadStatus}></PointProcess>
//           </div>
//         )}

//         {localRepetition.length >= 1 ? (
//           <>
//             <Radio.Group onChange={onChangeRadio} value={selectChecked}>
//               {radioValue.length &&
//                 radioValue.map((item, index) => (
//                   <Radio
//                     value={item.cameraType}
//                     key={index}
//                     disabled={!(successUploadStatus === 0 && localRepetition.length >= 1)}
//                   >
//                     {item.cameraType} <em> {item.length}</em>
//                     个航点
//                   </Radio>
//                 ))}
//             </Radio.Group>
//             <Table
//               columns={columns}
//               scroll={{ x: 700, y: "calc(80vh - 70px - 230px)" }}
//               dataSource={
//                 selectChecked
//                   ? localRepetition &&
//                     localRepetition.filter(
//                       (item) =>
//                         item.cameraType[0].infrared_cameraType === selectChecked && item.selectType !== "service",
//                     )
//                   : localRepetition
//               }
//               onChange={onChange}
//               rowKey="ids"
//             />
//           </>
//         ) : (
//           <Empty description="暂无数据" />
//         )}

//         <div className="imageWrapper-bottom">
//           {!uploadFlag ? (
//             <Button
//               className="modal-button next"
//               type="primary"
//               onClick={() => {
//                 upLoad();
//               }}
//             >
//               上传
//             </Button>
//           ) : (
//             <Button className="modal-button next" type="primary">
//               数据上传中...
//             </Button>
//           )}
//           <Button className="modal-button " type="primary" onClick={() => changSelectType("pointMatching")}>
//             上一步
//           </Button>
//           <Button className="modal-button" type="primary" onClick={handleCancel}>
//             取消
//           </Button>
//         </div>
//       </div>
//     ));
//   },
// );
