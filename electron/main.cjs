const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    title: "IFLab",
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL("http://localhost:5173");
}

app.on("ready", createWindow);
