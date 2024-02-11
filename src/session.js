const Conf = require('./config');
const path = require("path");
const isWritable = require("./isWritable");
const createDir = require("./createDir");
const sessionRef = {};
const {isPlainObject} = require("./object")
/***** @see : https://www.npmjs.com/package/conf */
module.exports = function(options){
    options = Object.assign({},options);
    const appName = typeof options.appName =="string"? options.appName.toUpperCase().trim() : null;
    const cwd = require("./getAppDataPath")(appName);
    if(!createDir(cwd) || !isWritable(cwd)){
        return {
            get : (key)=>{
                if(typeof key ==='string'){
                    return sessionRef[key];
                }
                return sessionRef;
            },
            set : (key,value)=>{
                if(isPlainObject(key)){
                    for(let i in key){
                        sessionRef[i] = key[i];
                    }
                    return sessionRef;
                }
                if(typeof key =="string" && key){
                    sessionRef[key] = value;
                    return value;
                }
                return sessionRef;
            },
            remove : (key)=>{
                if(typeof key =="string" && key){
                    delete sessionRef[key];
                    return true;
                }
                return false;
            }
        }
    }
    return new Conf({cwd:path.resolve(cwd,"CONFIG"),...options});
};