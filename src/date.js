const daysNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const monthsNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

function parseDate(date) {
    const d = new Date(date),
        month = (d.getMonth() + 1),
        day = d.getDate(),
        year = d.getFullYear();
    const dayName = daysNames[day];
    const dayNameShort = String(dayName).substring(0,3);
    const monthName = monthsNames[month];
    const monthNameShort = String(monthName).substring(0,3);
    
    day = String(day); month = String(month);
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return {year,day,month,hours:d.getHours(),minutes : d.getMinutes(),seconds : d.getSeconds(),monthName,monthNameShort,dayName,dayNameShort};
}

module.exports.parseDate = parseDate;
module.exports.daysNames = daysNames;
module.exports.monthsNames = monthsNames;