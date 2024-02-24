const logger = require("./logger");
const Utils = require("./utils");

Utils.logLevels.map((log)=>{
    if(typeof Utils[log] !=="function"){
        Utils[log] = (...errors)=>{
            return logger(log,...errors);
        }
    }
});

module.exports = Utils;