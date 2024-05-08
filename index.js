const deleteFileOrDirectory = require("./src/deleteFileOrDirectory");
const JSONFileManager = require("./src/JSONFileManager");
const session = require("./src/session");
const FILE = require("./src/file");
const stringify = require("./src/stringify");
const logger = require("./src/logger");
module.exports = {
    ...require("./src/object"),
    stringify,
    Config : require("./src/config"),
    date : require("./src/date"),
    logger,
    Logger : logger,
    session,
    Session : session, 
    createDir : require("./src/createDir"),
    getDirname : require("./src/getDirname"),
    getDirName : require("./src/getDirname"),
    getAppDataPath : require("./src/getAppDataPath"),
    writeFile : require("./src/writeFile"),
    isWritable : require("./src/isWritable"),
    copy : require("./src/copy"),
    isRegExp : require("./src/isRegex"),
    exec : require("./src/exec"),
    uniqid : require("./src/uniqid"),
    debounce : require("./src/debounce"),
    deleteFile : deleteFileOrDirectory,
    deleteDirectory : deleteFileOrDirectory,
    deleteFileOrDirectory,
    throwError : (...args)=>{
        console.error(...args);
        process.exit(-1);
    },
    json : require("./src/json"),
    JSON : require("./src/json"),
    base64 : require("./src/base64"),
    dataURL : require("./src/dataURL"),
    isValidUrl : require("./src/isValidUrl"),
    createDirSync : require("./src/createDirSync"),
    isObj : x=> typeof x =="object" && x && !Array.isArray(x),
    file : FILE,
    FILE,
    isNonNullString : require("./src/isNonNullString"),
    JSONManager : JSONFileManager,
    JSONFileManager,
    JSONConfig : JSONFileManager,
    isDateObj : require("./src/isDateObj"),
    string : require("./src/string"),
    compareNPMVersions : require(".src/compareNPMVersion"),
}