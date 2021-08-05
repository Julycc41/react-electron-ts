

export function www(){

}
// import { message } from "antd";
// import {
//   AlignmentType,
//   Document,
//   HorizontalPositionAlign,
//   HorizontalPositionRelativeFrom,
//   ImageRun,
//   Packer,
//   PageBreak,
//   Paragraph,
//   Table,
//   TableCell,
//   TableRow,
//   TextRun,
//   TextWrappingSide,
//   TextWrappingType,
//   VerticalAlign,
//   VerticalPositionAlign,
//   VerticalPositionRelativeFrom,
//   WidthType
// } from "docx";
// import { saveAs } from "file-saver";
// import html2canvas from 'html2canvas';
// import { getSolarDefectInfoStatus } from "../../../../assets/js/canvas";
// import { getDefectStatusCounts, statistics } from "./components/methods";
// /**
//  *
//  *
//  * @param {*} ele
//  * @param {*} defectList
//  * @param {*} reportPoints
//  * @param {*} pointsWithDefects
//  * @param {*} defectAllReport
//  * @param {*} columns
//  * @param {*} heatMapSrc
//  * @param {*} currentPlant
//  * @param {*} currentTask
//  */
// export const downloadPDF = async (
//   ele,
//   defectDom,
//   reportPoints,
//   pointsWithDefects,
//   defectAllReport,
//   columns,
//   heatMapSrc,
//   currentPlant,
//   currentTask,
// ) => {
//   const {
//     ProcessingWaypoint,
//     defectWaypoint,
//     noDefectWaypoint,
//     defectWaypointOccupy,
//     noDefectWaypointOccupy,
//     defectAllCounts,
//     defectCount,
//   } = statistics(reportPoints, pointsWithDefects);
//   const date = new Date().toLocaleDateString();

//   const element: any = document.getElementsByClassName(defectDom); //缺陷图片获取

//   const pointMark: any = document.getElementById("point-mark"); //echarts 缺陷航点占比
//   const pointDefect: any = document.getElementById("point-defect"); //echarts 缺陷数量类型统计
//   const pointRecheck: any = document.getElementById("point-recheck"); //echarts 复检完成度

//   if (!element || !pointMark || !pointDefect || !pointRecheck) {
//     console.log(element, pointMark, pointDefect, pointRecheck);
//     message.error({
//       content: "报告生成失败,缺少相关属性",
//       key: 11,
//     });
//   }

//   //将dom生成为base64位的图片信息
//   let pointMarkImageUrl = "";
//   // await domtoimage.toPng(pointMark, { quality: 0.95 }).then((dataUrl: any) => {
//   //   pointMarkImageUrl = dataUrl;
//   // });

//   await html2canvas(pointMark, {
//     imageTimeout: 10000,
//     ignoreElements: (ele) => ele.id === 'point-mark',
//   }).then((dataUrl: any) => {
//     pointMarkImageUrl = dataUrl;
//   });


//   let pointDefectImageUrl = "";
//   // await domtoimage.toPng(pointDefect, { quality: 0.95 }).then((dataUrl: any) => {
//   //   pointDefectImageUrl = dataUrl;
//   // });


//   await html2canvas(pointDefect, {
//     imageTimeout: 10000,
//     ignoreElements: (ele) => ele.id === 'point-defect',
//   }).then((dataUrl: any) => {
//     pointDefectImageUrl = dataUrl;
//   });

//   let pointRecheckImageUrl = "";
//   // await domtoimage.toPng(pointRecheck, { quality: 0.95 }).then((dataUrl: any) => {
//   //   pointRecheckImageUrl = dataUrl;
//   // });

//   await html2canvas(pointDefect, {
//     imageTimeout: 10000,
//     ignoreElements: (ele) => ele.id === 'point-recheck',
//   }).then((dataUrl: any) => {
//     pointRecheckImageUrl = dataUrl;
//   });



//   //热力图写入
//   const heatMapImage = new ImageRun({
//     data: Buffer.from(heatMapSrc.replace("data:image/png;base64,", ""), "base64"),
//     transformation: {
//       width: 500,
//       height: 400,
//     },
//   });

//   //table表格创建
//   const tableColumns = columns.map((item) => {
//     return new TableCell({
//       children: [new Paragraph({ text: item.title, alignment: AlignmentType.CENTER })],
//       verticalAlign: VerticalAlign.CENTER,
//       width: {
//         size: 4000,
//         type: WidthType.DXA,
//       },
//     });
//   });

//   const tableReport = new Table({
//     alignment: AlignmentType.CENTER, //居中
//     rows: [
//       new TableRow({
//         children: [...tableColumns], //顶部第一行
//       }),

//       ...defectAllReport.map(
//         (row: any) =>
//           new TableRow({
//             children: Object.keys(row)
//               .filter((item) => item !== "key")
//               .reverse()
//               .map((cell) => {
//                 return new TableCell({
//                   children: [
//                     new Paragraph({
//                       text: row[cell].toString() || 0,
//                       alignment: AlignmentType.CENTER,
//                     }),
//                   ],
//                   verticalAlign: VerticalAlign.CENTER,
//                   width: {
//                     size: 4000,
//                     type: WidthType.DXA,
//                   },
//                 });
//               }) as any,
//           }) as any,
//       ),
//     ],
//   });

//   getDefectImageUrl(element).then((imageList: any) => {
//     const defectImageItem = imageList.map((item: any, index) => {
//       const defectItem = pointsWithDefects[index];
//       const defectItemImage = new ImageRun({
//         data: Buffer.from(item.replace("data:image/png;base64,", ""), "base64"),
//         transformation: {
//           width: 500,
//           height: 700,
//         },
//         floating: {
//           zIndex: 10,
//           horizontalPosition: {
//             relative: HorizontalPositionRelativeFrom.PAGE,
//             align: HorizontalPositionAlign.RIGHT,
//           },
//           verticalPosition: {
//             relative: VerticalPositionRelativeFrom.MARGIN,
//             align: VerticalPositionAlign.TOP,
//           },
//           wrap: {
//             type: TextWrappingType.SQUARE,
//             side: TextWrappingSide.BOTH_SIDES,
//           },
//           margins: {
//             top: 201440,
//           },
//         },
//       });
//       const results = defectItem.defects.map((item) => {
//         return getSolarDefectInfoStatus(item.defect_type, item.status);
//       });
//       const defectStatusList = getDefectStatusCounts(results);
//       const defectStatusListAll = [];

//       defectStatusList.map((info) => {
//         const title = new TextRun({
//           text: info.title,
//           bold: true,
//         });
//         const itemType = info.list.map((itemType, index) => {
//           return (
//             itemType.count >= 0 &&
//             new TextRun({
//               text: `${itemType.type}:${itemType.count}个`,
//               bold: true,
//               break: 1,
//             })
//           );
//         });

//         defectStatusListAll.push(title, ...itemType);
//       });

//       return {
//         children: [
//           new Paragraph({
//             alignment: AlignmentType.LEFT,
//             children: [...defectStatusListAll],
//           }),
//           new Paragraph({
//             alignment: AlignmentType.LEFT,

//             children: [
//               new TextRun({
//                 text: `经度：${getLonLat(defectItem.longitude)}`,
//                 bold: true,
//                 break: 1,
//               }),
//               new TextRun({
//                 text: `纬度：${getLonLat(defectItem.latitude)}`,
//                 bold: true,
//                 break: 1,
//               }),
//               new TextRun({
//                 text: `高度：${getLonLat(defectItem.altitude)}`,
//                 bold: true,
//                 break: 1,
//               }),
//             ],
//           }),
//           new Paragraph({
//             alignment: AlignmentType.LEFT,
//             spacing: {
//               after: 200,
//             },
//             children: [defectItemImage],
//           }),
//         ],
//       };
//     });

//     const defectAllCountsList = defectAllCounts.map((item, index) => {
//       return (
//         item.count >= 1 &&
//         item.blank !== "总计" &&
//         new Paragraph({
//           spacing: {
//             after: 200,
//           },
//           children: [
//             new TextRun({
//               text: `${item.blank}，${item.count}个， 占比:${Math.round((item.count / defectCount) * 100)}%,`,
//               bold: true,
//             }),
//           ],
//         })
//       );
//     });
//     const documentToBlob = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph({
//               alignment: AlignmentType.CENTER,
//               children: [
//                 new TextRun({
//                   text: `${currentPlant.name}`,
//                   bold: true,
//                   allCaps: true,
//                   size: 40,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               alignment: AlignmentType.RIGHT,
//               children: [
//                 new TextRun({
//                   text: `伯镭极测${date}巡检报告`,
//                   bold: true,
//                   size: 30,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               spacing: {
//                 after: 200,
//               },
//               children: [
//                 new TextRun({
//                   text: `电站介绍${currentPlant.brief || ""}`,
//                   bold: true,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               spacing: {
//                 after: 200,
//               },
//               children: [
//                 new TextRun({
//                   text: `本次巡检共处理航点${ProcessingWaypoint}个`,
//                   bold: true,
//                 }),
//                 new TextRun({
//                   text: `其中有缺陷航点${defectWaypoint}个，占比:${defectWaypointOccupy}%`,
//                   bold: true,
//                 }),
//                 new TextRun({
//                   text: `无缺陷航点${noDefectWaypoint}个，占比:${noDefectWaypointOccupy}%`,
//                   bold: true,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               spacing: {
//                 after: 200,
//               },
//               children: [
//                 new TextRun({
//                   text: `共计识别出缺陷${noDefectWaypoint}个，占比:${defectCount}个`,
//                   bold: true,
//                 }),
//               ],
//             }),
//             ...defectAllCountsList,
//             tableReport,
//             new Paragraph({
//               spacing: {
//                 before: 300,
//               },
//               children: [
//                 new ImageRun({
//                   data: Buffer.from(pointMarkImageUrl.replace("data:image/png;base64,", ""), "base64"),
//                   transformation: {
//                     width: 200,
//                     height: 200,
//                   },
//                 }),
//                 new ImageRun({
//                   data: Buffer.from(pointDefectImageUrl.replace("data:image/png;base64,", ""), "base64"),
//                   transformation: {
//                     width: 200,
//                     height: 200,
//                   },
//                 }),
//                 new ImageRun({
//                   data: Buffer.from(pointRecheckImageUrl.replace("data:image/png;base64,", ""), "base64"),
//                   transformation: {
//                     width: 200,
//                     height: 200,
//                   },
//                 }),
//                 new PageBreak(),
//               ],
//             }),

//             new Paragraph({
//               spacing: {
//                 after: 300,
//               },
//               outlineLevel: 4,
//               children: [
//                 new TextRun({
//                   text: `缺陷热力分布图`,
//                   bold: true,
//                   break: 1,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               spacing: {
//                 before: 300,
//               },
//               children: [heatMapImage, new PageBreak()],
//             }),
//           ],
//         },
//         ...defectImageItem,
//       ],
//     });

//     Packer.toBlob(documentToBlob)
//       .then((blob) => {
//         saveAs(blob, new Date().getTime().toString());
//         console.log("Document created successfully");
//         message.success({
//           content: "报告生成完毕",
//           key: 11,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         message.error({
//           content: "报告生成失败",
//           key: 11,
//         });
//       });
//   });
// };

// const getDefectImageUrl = (element) => {
//   return new Promise(async (res, rej) => {
//     const imageList = [];
//     for (var i = 0; i < element.length; i++) {

//       await html2canvas(element[i], {
//         imageTimeout: 10000,
//         ignoreElements: (ele) => {
//           console.log(ele.className === 'detail-images');
//           return ele.className === 'detail-images'
//         },
//       }).then((dataUrl: any) => {
//         imageList.push(dataUrl);
//       });
//       // await domtoimage.toPng(element[i], { quality: 0.95 }).then((dataUrl: any) => {
//       //   imageList.push(dataUrl);
//       // });
//     }
//     res(imageList);
//   });
// };

// export function getLonLat(str: string) {
//   const index = str.indexOf(".");
//   return str.substring(0, index + 7);
// }

