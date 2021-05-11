/** @module Util/ConvertDate */

/** Converts the provided date object into a concise, human-readable string. */
const convertDate = (date: Date): string => {
    const time = Date.now() - new Date(date).getTime();
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 60 / 60);
    const days = Math.floor(time / 1000 / 60 / 60 / 24);
    if (days === 1) {
        return `${days} day ago`;
    }
    if (days > 1) {
        return `${days} days ago`;
    }
    if (hours === 1) {
        return `${hours} hour ago`;
    }
    if (hours > 1) {
        return `${hours} hours ago`;
    }
    if (minutes === 1) {
        return `${minutes} minute ago`;
    }
    if (minutes > 1) {
        return `${minutes} minutes ago`;
    }
    return 'Seconds ago';
};

export default convertDate;
