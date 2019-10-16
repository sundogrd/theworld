import { app, BrowserWindow } from 'electron';
import installExtension, {
    REACT_DEVELOPER_TOOLS,
    MOBX_DEVTOOLS,
} from 'electron-devtools-installer';

const isDevelopment = process.env.ELECTRON_DEV == 'dev';

// Global reference to mainWindow
// Necessary to prevent win from being garbage collected
let mainWindow: Electron.BrowserWindow;

function createMainWindow() {
    // Construct new BrowserWindow
    mainWindow = new BrowserWindow({
        minHeight: 900,
        minWidth: 1440,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // Set url for `win`
    // points to `webpack-dev-server` in development
    // points to `index.html` in production
    const url = isDevelopment
        ? `http://localhost:3000`
        : `file://${__dirname}/index.html`;

    if (isDevelopment) {
        mainWindow.webContents.once('dom-ready', () => {
            mainWindow.webContents.openDevTools();
        });
    }

    mainWindow.loadURL(url);

    mainWindow.on('closed', () => {
        //mainWindow = null
    });

    mainWindow.webContents.on('devtools-opened', () => {
        mainWindow.focus();
        setImmediate(() => {
            mainWindow.focus();
        });
    });

    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name: any) => console.log(`[DEBUG]添加插件：${name}`))
        .catch((err: Error) =>
            console.log(`[DEBUG]添加插件${name}错误：`, err),
        );

    installExtension(MOBX_DEVTOOLS)
        .then((name: any) => console.log(`[DEBUG]添加插件：${name}`))
        .catch((err: Error) =>
            console.log(`[DEBUG]添加插件${name}错误：`, err),
        );

    return mainWindow;
}

// Quit application when all windows are closed
app.on('window-all-closed', () => {
    // On macOS it is common for applications to stay open
    // until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it is common to re-create a window
    // even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});

// Create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow();
});
