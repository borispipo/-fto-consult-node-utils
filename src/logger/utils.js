'use strict';

const createDir = require("../createDir");
const isWritable = require("../isWritable");
const FILE = require("../file");
const getAppDataPath = require("../getAppDataPath");
const path = require('path');
const {parseDate} = require("../date");
const {extendObj} = require("../object");

const logConfig = {};

/**** permet de définir la fonction de configuration
    @param {object} config
*/
const setConfig = (config)=>{
    extendObj(logConfig,config);
}

module.exports.setConfig = setConfig;
module.exports.getConfig = ()=>Object.assign({},logConfig);

/**** retourne le chemin des fichiers logs 
    par défaut les fichiers logs sont stockés dans le dossier /logs/mois-annee/
    @param {string} appName, le nom de l'application
*/
module.exports.getFilePath = function(appName) {
    const years = new Date().getFullYear();
    const {day,month,year} = parseDate();
    const date = [month,year].join("-");
    appName = typeof appName =="string" && appName || typeof logConfig.appName =="string" && logConfig.appName || "";
    appName =  String(FILE.sanitizeFileName(appName)||'').replaceAll("/","-").replace(/\s+/g, '');
    let fPath = process.env.LOGS_FOLDER && typeof process.env.LOGS_FOLDER =="string" ? FILE.sanitize(process.env.LOGS_FOLDER) : null;
    if(!fPath || !isWritable(fPath)){
        try {
            fPath = path.resolve(getAppDataPath(appName),"logs")
        }catch(e){
            const cwd = process.execPath || process.cwd();
            if(cwd && isWritable(cwd)){
                fPath = path.resolve(cwd,"logs");
            } else {
                console.log(e,"unable to retrieve app data path as log folder");
                return null;
            }
        }
    }
    const folderPath = path.join(fPath,String(years),date);
    const fileName = `${appName ? `${appName}-`:""}${[day,month,year].join("-")}.log`; 
    if(!createDir(folderPath)){
        return null;
    }
    if(!isWritable(folderPath)) return null;
    return path.resolve(folderPath,fileName);
};

const logLevels = ["info","debug","log","warning","warn","error","prod"];
module.exports.logLevels = logLevels;

const isDev = String(process.env.NODE_ENV).toLowerCase().trim() !== 'production';

const defaultSupportedLevels = isDev ? logLevels : ["error","warning","prod"];

module.exports.defaultSupportedLevels = defaultSupportedLevels;

///la variable d'environnement LOGS_LEVELS : {exemple:prod,error,warning}, permet de spécifier les logs qui seront prise en compte durant l'exécution de l'application
let supportedLevels = process.env.LOGS_LEVELS && typeof process.env.LOGS_LEVELS =="string" ? String(process.env.LOGS_LEVELS).trim() : null;
if(supportedLevels){
    supportedLevels = supportedLevels.split(",").filter((s,i)=>{
        if(!s){
            return false;
        }
        return logLevels.includes(s.toLowerCase().trim());
    }).map((s)=>s.toLowerCase().trim());
    if(!supportedLevels.length){
        supportedLevels = defaultSupportedLevels;
    }
} else supportedLevels = defaultSupportedLevels;

module.exports.supportedLogsLevels = supportedLevels;