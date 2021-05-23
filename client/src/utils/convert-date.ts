/** @module Util/ConvertDate */

/** Converts the provided date object into a concise, human-readable string. */
const convertDate = (date: Date): string => {
    const time = Date.now() - new Date(date).getTime();
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 60 / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 28);
    const years = Math.floor(months / 12);
    if (years === 1) {
        return `${years} year ago`;
    }
    if (years > 1) {
        return `${years} years ago`;
    }
    if (months === 1) {
        return `${months} month ago`;
    }
    if (months > 1) {
        return `${months} months ago`;
    }
    if (weeks === 1) {
        return `${weeks} week ago`;
    }
    if (weeks > 1) {
        return `${weeks} weeks ago`;
    }
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
