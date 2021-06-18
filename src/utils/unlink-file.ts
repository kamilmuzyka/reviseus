/** @module Util/UnlinkFile */
import fs from 'fs';
import util from 'util';

/** Removes a specific file from the local filesystem. */
const unlinkFile = util.promisify(fs.unlink);

export default unlinkFile;
