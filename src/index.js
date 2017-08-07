import { app, BrowserWindow, ipcMain } from 'electron';
import mongoose from 'mongoose';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Maximize Window to fullscreen
  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// connect to DB
mongoose.connect(require('./dbconfig.json').url);
mongoose.Promise = global.Promise;

// Event Collection Schema
let Event = mongoose.model('EventName',
  new mongoose.Schema({ id: String, score: Number }));


// store the participant's ID and redirect him to the quiz
let participant = {};
ipcMain.on('login', (event, id)=> {
    participant.id = id;
    mainWindow.loadURL(`file://${__dirname}/quiz.html`);
});

// get participant's score and save it to DB
ipcMain.on('score', (event, score) => {
    participant.score = score;

    new Event(participant).save(err => {
      if (err) console.log(err);
      else participant = {};
    });
});

// Close the app
ipcMain.on('quit', event => app.quit());
