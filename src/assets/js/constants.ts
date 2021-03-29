import {

  OperationControl,
  PlaneControl
} from "../../typings/interface";

export const PLANE_CONTROL = [
  {
    name: "左上",
    type: "zuoshang",
    index: PlaneControl.zuoshang,
  },
  {
    name: "上",
    type: "shang",
    index: PlaneControl.shang,
  },
  {
    name: "右上",
    type: "youshang",
    index: PlaneControl.youshang,
  },
  {
    name: "右",
    type: "you",
    index: PlaneControl.you,
  },
  {
    name: "刷新",
    type: "shuaxin",
    index: PlaneControl.shuaxin,
  },
  {
    name: "左",
    type: "zuo",
    index: PlaneControl.zuo,
  },
  {
    name: "左下",
    type: "107fangxiang_zuoxia",
    index: PlaneControl["107fangxiang_zuoxia"],
  },
  {
    name: "下",
    type: "xia",
    index: PlaneControl.xia,
  },
  {
    name: "右下",
    type: "youxia",
    index: PlaneControl.youxia,
  },
];
export const OPERATION_CONTROL = [
  {
    name: "放大",
    type: "fangda",
    index: OperationControl.fangda,
  },
  {
    name: "拍照",
    type: "xiangji",
    index: OperationControl.xiangji,
  },
  {
    name: "缩小",
    type: "suoxiao",
    index: OperationControl.suoxiao,
  },
];

export const waypointList=[
  {
    id:1,
    time:Math.round(Math.random()*80+20),
    imageList:[
      {
        id:1,
        src:"https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      },
      {
        id:2,
        src:"https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      },
      {
        id:3,
        src:"https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      }
    ]
  },
  {
    id:2,
    time:Math.round(Math.random()*80+20),
    imageList:[
      {
        id:1,
        src:"https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      },
      {
        id:2,
        src:"https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      },
      {
        id:3,
        src:"https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      }
    ]
  },
  {
    id:3,
    time:Math.round(Math.random()*80+20),
    imageList:[
      {
        id:1,
        src:"https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      },
      {
        id:2,
        src:"https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      },
      {
        id:3,
        src:"https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      }
    ]
  },
  {
    id:4,
    time:Math.round(Math.random()*80+20),
    imageList:[
      {
        id:1,
        src:"https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      },
      {
        id:2,
        src:"https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      },
      {
        id:3,
        src:"https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
      }
    ]
  }
]