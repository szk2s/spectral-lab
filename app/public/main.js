const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
global.ProgressBar = require('electron-progressbar');

let mainWindow;

function createWindow() {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({ width, height });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    globalShortcut.register('CommandOrControl+R', () => {
        mainWindow.reload();
    });
    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
