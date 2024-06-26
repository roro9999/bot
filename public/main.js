const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 1240,
    height: 790,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})