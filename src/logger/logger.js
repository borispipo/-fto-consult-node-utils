const {getFilePath,logLevels,supportedLogsLevels:supportedLevels,isDev} = require("./utils");
const {parseDate} = require("../date");
const fs = require('fs');
const stringify = require("../stringify");

/***************************************************************************
 * @param {string} logLevel - Log level [prod|info|warning|warn|error|debug]
 * @param {Array<any>} errors
 **************************************************************************/
module.exports = function logger(logLevel,...errors) {
    let level = typeof logLevel =="string" && logLevels.includes(logLevel.toLowerCase())? logLevel.toLowerCase() : "info";
    if(level.toLowerCase() ==="warning"){
        level = "warn";
    }
    // Log messages based on log-level
    // If logLevel is prod or prod-trace then dont log debug/trace messages
    if(!isDev && String(level).toLowerCase() === 'prod') {
        return;
    }
    if(!logLevels.includes(level)){
        level = "info";
    }
    if(!supportedLevels.includes(level)) return; ///log level is not suppported so we have to exit
    const logInfo = level.charAt(0).toUpperCase() + level.slice(1);
    const fileName = getFilePath();
    const {day,year,hours,minutes,seconds,dayNameShort,monthNameShort} = parseDate();
    const currentTime = [dayNameShort,day,monthNameShort,year].join( )+[hours,minutes,seconds].join(":");//DateLib.format(new Date(),"ddd dd mmm yyyy à HH:MM:ss");
    const logInConsole = x => console.log(logInfo,currentTime,...errors);
    if(!fileName || (!process.env.LOGS_IN_FILE && (isDev && !process.env.LOGS_IN_CONSOLE))){
        ///file is not writable or environnement is 
        logInConsole();
        return true;
    }
    try {
        const errorText = `******************************* ${currentTime} [${logInfo}] ********************************\n`+errors.map((error)=>{
            return  `${stringify(error)}\n`
        }).join("\n\t")+"\n\n";
        fs.appendFileSync(fileName, errorText);
    } catch(e){
        console.log(e," ****** error on logging");
        logInConsole();
        return false;
    }
}