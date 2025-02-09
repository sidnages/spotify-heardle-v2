import path from 'path';
import axios from 'axios';
import log from 'electron-log/main';
import * as fs from 'fs';
import { app, BrowserWindow, ipcMain } from 'electron';
import { PRIMARY_BACKGROUND_COLOR } from './constants/styleConstants';
import { 
  FETCH_URL_EVENT_NAME,
  READ_FROM_FILE_EVENT_NAME,
  SAVE_TO_FILE_EVENT_NAME,
  APP_CLOSE_EVENT_NAME 
} from './constants/ipcConstants';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Check if in development mode
const isDev = process.env.NODE_ENV === 'development'

// Path to directory containing saved user date
const dataDirectoryPath = isDev ? path.join(__dirname, '../../data') : path.join(process.resourcesPath, 'data');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Communication with renderer - certain tasks only the server can perform and not the renderer
ipcMain.handle(FETCH_URL_EVENT_NAME, async (event, ...args) => {
  log.info(`Received fetch URL event with URL ${args[0].url}`);
  const response = await axios.get(args[0].url);
  log.info(`Received response from Axios for URL ${args[0].url}`);
  return response.data;
})

ipcMain.handle(READ_FROM_FILE_EVENT_NAME, async (event, ...args) => {
  log.info(`Received read from file event with filename ${args[0].filename}`);
  const filePath = path.join(dataDirectoryPath, args[0].filename);
  const data: any = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  log.info(`Successfully read from file ${args[0].filename}`);
  return data;
})

ipcMain.handle(SAVE_TO_FILE_EVENT_NAME, async (event, ...args) => {
  log.info(`Received save to file event with filename ${args[0].filename}`);
  const filePath = path.join(dataDirectoryPath, args[0].filename)
  fs.writeFileSync(filePath, args[0].content);
  log.info(`Successfully saved content to file ${args[0].filename}`);
})

// Create the window and invoke renderer
const createWindow = (): void => {
  log.initialize();
  log.info('--- Starting App ---');

  const width = 850;
  const height = 600;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: height,
    width: width,
    minHeight: height,
    maxHeight: height,
    minWidth: width,
    maxWidth: width,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: PRIMARY_BACKGROUND_COLOR
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Remove the top menu.
  if (!isDev) {
    mainWindow.setMenuBarVisibility(false);
  }

  // Register cleanup functions to window close.
  mainWindow.on('close', (event) => {
    log.info('Sending app close event');
    mainWindow.webContents.send(APP_CLOSE_EVENT_NAME);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  log.info('--- App Fully Closed ---');
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
