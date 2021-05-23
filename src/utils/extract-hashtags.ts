/** @module Util/ExtractHashtags */

const hashtagRegExp = /#[a-zA-Z0-9_]+/g;

/** Extracts words starting with '#' from a provided string. */
const extractHashtags = (string: string): string[] => {
    const hashtags = [...string.matchAll(hashtagRegExp)].map((hashtag) =>
        hashtag[0].slice(1)
    );
    return hashtags;
};

export default extractHashtags;
