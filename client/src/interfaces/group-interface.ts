/** @module Interface/Group */
import User from './user-interface';

interface Group {
    id: string;
    name: string;
    type: string;
    users: User[];
    UserGroups?: {
        groupId: string;
        userId: string;
    };
}

export default Group;
