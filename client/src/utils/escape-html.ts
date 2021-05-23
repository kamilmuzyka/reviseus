/** @module Util/EscapeHTML */

const charactersToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
};

const tagRegExp = /[&<>]/g;

/** Prevents XSS attacks by replacing HTML characters found in the provided
 * string with corresponding HTML entities. */
const escapeHTML = (text: string): string => {
    return text.replace(tagRegExp, (tag) => {
        return charactersToReplace[tag] ?? tag;
    });
};

export default escapeHTML;
