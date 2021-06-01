/** @module Interface/User */
import Group from './group-interface';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    groups: Group[];
}

export default User;
