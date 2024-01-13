const path = require("path");
const deleteFileOrDirectory = require("./src/deleteFileOrDirectory");
const JSONFileManager = require("./src/JSONFileManager");
module.exports = {
    ...require("./src/object"),
    createDir : require("./src/createDir"),
    writeFile : require("./src/writeFile"),
    isWritable : require("./src/isWritable"),
    copy : require("./src/copy"),
    electronDir : path.resolve(__dirname, ".."),
    isRegExp : require("./src/isRegex"),
    paths : require("./src/paths"),
    exec : require("./src/exec"),
    uniqid : require("./src/uniqid"),
    debounce : require("./src/debounce"),
    postMessage : require("./src/postMessage"),
    deleteFile : deleteFileOrDirectory,
    deleteDirectory : deleteFileOrDirectory,
    deleteFileOrDirectory,
    throwError : (...args)=>{
        console.error(...args);
        process.exit(-1);
    },
    json : require("./src/json"),
    JSON : require("./src/json"),
    replaceAll : require("./src/replaceAll"),
    base64 : require("./src/base64"),
    dataURL : require("./src/dataURL"),
    isValidUrl : require("./src/isValidUrl"),
    createDirSync : require("./src/createDirSync"),
    ...require("./src/dependencies"),
    isObj : x=> typeof x =="object" && x && !Array.isArray(x),
    file : require("./src/file"),
    isNonNullString : require("./src/isNonNullString"),
    JSONManager : JSONFileManager,
    JSONFileManager,
    JSONConfig : JSONFileManager,
    isDateObj : require("./src/isDateObj"),
    string : require("./src/string"),
}