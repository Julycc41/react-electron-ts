import { saveAs } from 'file-saver';
const fs = window.require("fs");

export function readFileStream(spath: any) {
    
    return new Promise((resolve, reject) => {
        //   判断文件是否存在
        if (fs.existsSync(spath)) {
            let readStream = fs.createReadStream(spath);
            console.log(readStream)
            let arr: any = [];
            let startTime = Date.now();
            // 在内部不断触发rs.emit('data',数据)；data不能更改,留动模式开启后，数据会疯狂触发data事件
            readStream.on('data', function (chunk: any) {  //chunk是buffer类型
                arr.push(chunk)
            })
            // 监听文件读取完毕，会自动触发一次end事件，没有读取完是不会触发的
            readStream.on('end', function (chunk: any) {
                let useTime = Date.now() - startTime;
                console.log("读文件用" + (useTime / 1000) + "s")
             
                let file = new File(arr, `${new Date().getTime()}.zip`);
                console.log(file)
                saveAs(file, new Date().getTime().toString());
                resolve(arr)
            })
            // 监听错误
            readStream.on('error', function (err: any) {
                console.log(err);
            })
        } else {
            reject("没有改文件")
        }

    })

    

}

