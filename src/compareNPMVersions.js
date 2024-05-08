
/***
    compare two npm packages versions
    @param {string} current, current version
    @param {string} other, other version
    @return {int}, if 0 then versions are equals, if -1 then current are less than other if 1 then current are greater than other
*/
module.exports = function compareNPMVersions(current, other) {
    var cp = String(current).split('.');
    var op = String(other).split('.');
    for (var depth = 0; depth < Math.min(cp.length, op.length); depth++) {
        var cn = Number(cp[depth]);
        var on = Number(op[depth]);
        if (cn > on)
            return 1;
        if (on > cn)
            return -1;
        if (!isNaN(cn) && isNaN(on))
            return 1;
        if (isNaN(cn) && !isNaN(on))
            return -1;
    }
    return 0;
}