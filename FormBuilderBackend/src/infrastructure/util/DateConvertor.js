const moment = require('moment');
const momentJalaali = require('moment-jalaali');

function getPersianMonthDates(date) {
    let dates = [];
    let year = parseInt(date.toString().substring(0, 4));
    let month = parseInt(date.toString().substring(date.toString().length - 2));
    const jalaliDate = momentJalaali(year + '/' + month + '/1', 'jYYYY/jM/jD');
    const daysInMonth = momentJalaali.jDaysInMonth(year, month - 1);
    for (let day = 1; day <= daysInMonth; day++) {
        const gregorianDate = moment(jalaliDate.format('YYYY-MM-DD')).add(day - 1, 'days').format('YYYY-MM-DD');
        dates.push(gregorianDate);
    }
    return dates;
}

function getDaysInRange(startDate, endDate) {
    startDate = moment(startDate, 'YYYY-MM-DD');
    endDate = moment(endDate, 'YYYY-MM-DD');

    // Calculate the difference between the dates in days
    const duration = moment.duration(endDate.diff(startDate));
    const days = duration.asDays();

    // Generate an array of dates between the start and end dates
    const dates = [];
    for (let i = 0; i <= days; i++) {
        const currentDate = startDate.clone().add(i, 'days');
        dates.push(new Date(currentDate.format('YYYY-MM-DD')).toLocaleDateString());
    }
    return dates;
}

function getNext12MonthsFromNextMonthInPersianWithDigit() {
    const currentDate = momentJalaali();

    const next12Months = [];

    for (let i = 0; i < 12; i++) {
        let nextMonth = currentDate.clone().add(i, 'jM');
        next12Months.push(nextMonth.jYear() + '/' + (nextMonth.jMonth() + 1));
    }
    return next12Months;
}

function getNow(format) {
    return new moment().format(format);
}

function phoneNumberValidation(phoneNumber) {
    // ^ asserts position at start of the string
    // \d matches a digit (equivalent to [0-9])
    // {10} matches the previous token exactly 10 times
    // $ asserts position at the end of the string
    let regExp = /^\d{10}$/;
    let number = parseInt(phoneNumber);
    if (number.toString().match(regExp)) {
        return '98' + number;
    } else {
        return null;
    }
}

module.exports = {
    getPersianMonthDates,
    getDaysInRange,
    getNext12MonthsFromNextMonthInPersianWithDigit,
    getNow,
    phoneNumberValidation
};