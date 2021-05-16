import moment from "moment";

export const parseDateToString = (date, format) => {
    return moment(date).format(format);
}

export const isInDateRange = (fromDate, toDate, startDate, endDate) => {

    return false
}