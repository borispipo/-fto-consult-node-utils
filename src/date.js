const daysNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const monthsNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

function parseDate(date) {
    let d = date ? new Date(date) : new Date(),
        month = d.getMonth() + 1,
        day = d.getDate(),
        year = d.getFullYear();
    const m = month <= 0 ? 0 : month-1;
    const dayName = daysNames[d.getDay()];
    const dayNameShort = String(dayName).substring(0,3);
    const monthName = monthsNames[m];
    const monthNameShort = String(monthName).substring(0,3);
    day = String(day); month = String(month);
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return {year,day,month,hours:d.getHours(),date:d,minutes : d.getMinutes(),seconds : d.getSeconds(),monthName,monthNameShort,dayName,dayNameShort};
}

module.exports.parseDate = parseDate;
module.exports.daysNames = daysNames;
module.exports.monthsNames = monthsNames;