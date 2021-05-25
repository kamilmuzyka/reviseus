/** @module Util/ActivateLinks */
import escapeHTML from './escape-html';

const linkRegExp = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gim;

/** Finds all valid links in the provided string and puts them in HTML anchor
 * tags. */
const activateLinks = (text: string): string => {
    const escapedText = escapeHTML(text);
    return escapedText.replace(linkRegExp, (href) => {
        return `<a href="${href}" target="_blank" style="word-break: break-all; color: var(--accent)">${href}</a>`;
    });
};

export default activateLinks;
