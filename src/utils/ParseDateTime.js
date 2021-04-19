import moment from "moment";

export const parseDateToString = (date, format) => {
    return moment(date).format(format);
}