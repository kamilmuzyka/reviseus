/** @module Util/HTMLTag */

/** Tag function that returns a standard template string without changing it. It
 * helps to highlight and format HTML inside of JavaScript when using extensions
 * such as lit-HTML (Visual Studio Code) that only work with tagged template
 * literals. */
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
