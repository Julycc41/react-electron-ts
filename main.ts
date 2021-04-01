const electron = require("electron");
const path = require("path");
const log = require("electron-log");

const { app, BrowserWindow, protocol, globalShortcut, ipcMain } = electron;

const miniSize = [800, 600];
const midSize = [1366, 768];

/* 配置 */
let mainWindow;
// 窗体初始配置按照已登录状态下的midsize
let mainWindowConfig = {
  width: miniSize[0],
  height: miniSize[1],
  minWidth: miniSize[0],
  minHeight: miniSize[1],
  resizable: true,
  maximizable: true,
  frame: false,
  show: false,
  titleBarStyle: "hiddenInset",
  // icon: path.join(__dirname, app.isPackaged ? "./build/icon.ico" : "./public/icon.ico"),
  webPreferences: {
    webgl: true,
    webSecurity: false,
    nodeIntegration: true,
    enableRemoteModule: true,
  },
};

let globals = { mainWindow };

/* ---- 单实例锁 ---- */
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
      mainWindow.show();
    }
  });
}

/* ---- 启动程序窗口 ---- */
app.whenReady().then(() => {
  // 开启file协议, cors（9.0未知原因关闭，这算是workaround）
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = request.url.replace("file:///", "");
    callback(pathname);
  });
  createMainWindow();
});
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

app.on("window-all-closed", function () {
  app.quit();
});

/* 主窗口 */
function createMainWindow() {
  // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
  mainWindow = new BrowserWindow(mainWindowConfig);
  globals.mainWindow = mainWindow;

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (app.isPackaged) {
    mainWindow.loadURL("file://" + path.join(__dirname, "./dist/index.html"));
    mainWindow.setMenu(null);
  } else {
    mainWindow.loadURL("http://localhost:3344");
    mainWindow.webContents.openDevTools(); // 打开开发者工具
  }

  mainWindow.on("closed", function () {
    app.quit();
  });

  mainWindow.webContents.on("render-process-gone", (e) => {
    log.log("[FINAL BREATH]", e);
  });

  globalShortcut.register("ctrl+d+t", () => mainWindow.webContents.openDevTools());
  globalShortcut.register("ctrl+d+r", () => mainWindow.webContents.reload());
  globalShortcut.register("ctrl+e", () => electron.shell.showItemInFolder(app.getPath("crashDumps")));

  ipcMain.on("window-mini-size", (e) => {
    mainWindow.restore(); // 防止maximized 无法修改窗口
    mainWindow.setMinimumSize(...miniSize);
    mainWindow.setSize(...miniSize);
    mainWindow.setResizable(false);
    mainWindow.setMaximizable(false);
  });

  ipcMain.on("window-mid-size", (e) => {
    mainWindow.setResizable(true);
    mainWindow.setMaximizable(true);
    mainWindow.setSize(...midSize);
    mainWindow.setMinimumSize(...midSize);
  });

  ipcMain.on("window-max", (e) => {
    mainWindow.setResizable(true);
    mainWindow.setMaximizable(true);
    mainWindow.maximize();
  });

  ipcMain.on("window-close", (e) => {
    e.sender.send("window-before-close");
    mainWindow.close();
  });
  ipcMain.on("window-minimize", (e) => mainWindow.minimize());
  ipcMain.on("window-restore", (e) => mainWindow.restore());
  ipcMain.on("window-maximize", (e) => mainWindow.maximize());
  ipcMain.on("window-hide", (e) => mainWindow.setOpacity(0));
  ipcMain.on("window-show", (e) => mainWindow.setOpacity(1));
}
