import moment from "moment";

export const parseDateToString = (date, format) => {
    return moment(date).format(format);
}

export const isInDateRange = (fromDate, toDate, startDate, endDate) => {

    return false
}

export const calculateDatesGap = (day1, day2, returnAs) => {
    /** Note:
     *  + day1: earlierDate
     *  + day2: laterDate
     *  + returnAs: tiêu chí tính sự chênh lệch
     *  + / (1000 * 3600 * 24): convert from miliseconds to days
     *  */
    switch (returnAs) {
        case 'D': // days
            return Math.round((day2.getTime() - day1.getTime()) / (1000 * 3600 * 24))
        case 'M': // months
            return day2.getMonth() - day1.getMonth() + (12 * (day2.getFullYear() - day1.getFullYear()))
        default:
            break;
    }
}