/** @module Model/UserGroups */
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import User from './user-model.js';
import Group from './group-model.js';

export interface UserGroupsAttributes {
    userId: string;
    groupId: string;
}

@Table({
    timestamps: false,
})
class UserGroups extends Model<UserGroupsAttributes> {
    @ForeignKey(() => User)
    @Column
    userId: string;

    @ForeignKey(() => Group)
    @Column
    groupId: string;
}

export default UserGroups;
