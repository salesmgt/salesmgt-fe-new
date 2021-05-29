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

export const calculateSchoolYear = () => {
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth()

    // Từ tháng 5 năm nay tới tháng 5 năm sau: đi sales cho các tasks theo năm học sau
    // nên report cũng tính là năm học sau.
    if (0 <= thisMonth < 4) {   // Jan = 0, May = 4
        return `${thisYear}-${thisYear + 1}`
    } else if (4 <= thisMonth < 11) {
        return `${thisYear - 1}-${thisYear}`
    } else {
        return null
    }
}