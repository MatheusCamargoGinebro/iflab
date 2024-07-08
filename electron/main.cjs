const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({ title: "IFLab", width: 1024, height: 768 });
  win.loadURL("http://localhost:5173");
}

app.on("ready", createWindow);
