/** @module Util/TestUUID */

const uuidRegExp = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
);

/** Checks if a provided string is a valid UUID. */
const testUUID = (id: string): boolean => {
    if (uuidRegExp.test(id)) {
        return true;
    }
    return false;
};

export default testUUID;
