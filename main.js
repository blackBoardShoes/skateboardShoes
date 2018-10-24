// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// 渲染进程与主进程互相通信 
ipcMain.on('min', e=> mainWindow.minimize())
ipcMain.on('max', e=> {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
    } else {
        mainWindow.maximize()
    }
})
ipcMain.on('close', e=> mainWindow.close())

ipcMain.on('loginResize', e=> mainWindow.setSize(840, 360, { animation: true }))
// ipcMain.on('hide', e=> mainWindow.hide())
ipcMain.on('hide', e=> mainWindow.setOpacity(0))
ipcMain.on('nonableResize', e=> mainWindow.setResizable(false))

ipcMain.on('center', e=> mainWindow.center())
ipcMain.on('mainResize', e=> mainWindow.setSize(1366, 768, { animation: true }))
ipcMain.on('ableResize', e=> mainWindow.setResizable(true))
// ipcMain.on('mainshow', e=> mainWindow.show())
ipcMain.on('mainshow', e=> mainWindow.setOpacity(1))

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 840, height: 360, frame: false, resizable: false})
  // mainWindow.webContents.openDevTools({ mode: true })
  // and load the index.html of the app.
  mainWindow.loadFile('vcl-pc/dist/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
