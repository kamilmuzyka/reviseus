/** @module Util/HTMLTag */

/** A tag function that recreates a passed template string. Use it as a
 * template tag to highlight and format HTML inside of JavaScript, when using
 * extensions such as lit-html (Visual Studio Code). */
const html = (
    strings: TemplateStringsArray,
    ...interpolations: any[]
): string => {
    return strings.reduce((result, string, index) => {
        const interpolation = interpolations[index] || '';
        return `${result}${string}${interpolation}`;
    }, '');
};

export default html;
