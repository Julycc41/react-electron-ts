### 解决图片太多 使用截图工具导致崩溃

    1.首先说明一下 报错原因以及之前存在的问题
        1.1 未达到需求可编辑,
        1.2 pdf 插件导不出这么长的文件
    2.更换插件docx
        2.1 传递数据 找模板生成想要的数据格式
        2.2 数据格式未有canvas+image 生成
    3. docx遇到的问题
        3.1 原有缺陷是将image+canvas 完成的渲染 所以还是需要用到截图工具只是截图的是单个defectItem dom 存放在数组里面进行 转为base64
        3.2  截图工具(dom-to-image),吃内存 吃内存 吃内存重要的事情说三遍，
        3.3  测试了一下 大概生成200多页也就是400多张缺陷图片 需要 2-3G 只有关闭程序才会释放内存,暂时还未找到解决办法
    4. 官网 https://github.com/dolanmiu/docx
    5. api https://docx.js.org/#/ 基本的文本 图片 table 都可以实现 其他花里胡哨再等等吧
    6. 所有示例 https://github.com/dolanmiu/docx/tree/master/demo   可以自己放在demo里面测试
    7. https://github.com/Julycc41/react-electron-ts 自己写的小demo
    8. 启动 1.yarn 2.yarn start 3.yarn ele 起步就像数123一样容易 冲鸭

