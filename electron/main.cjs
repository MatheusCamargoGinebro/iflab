const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    title: "IFLab",
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    icon: "./src/assets/icons/iflab/icon-512.png",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL("http://localhost:5173");
}

app.on("ready", createWindow);
