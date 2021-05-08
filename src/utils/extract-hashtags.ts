/** @module Util/ExtractHashtags */

/** Extracts words starting with '#' from a provided string. */
const extractHashtags = (string: string): string[] => {
    const HashtagRegExp = /#[a-zA-Z0-9_]+/g;
    const hashtags = [...string.matchAll(HashtagRegExp)].map((hashtag) =>
        hashtag[0].slice(1)
    );
    return hashtags;
};

export default extractHashtags;
