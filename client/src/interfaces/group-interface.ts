/** @module Interface/Group */

interface Group {
    id: string;
    name: string;
    type: string;
    UserGroups: {
        groupId: string;
        userId: string;
    };
}

export default Group;
