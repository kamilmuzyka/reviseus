/** @module Model/Group */
import { Optional } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface GroupAttributes {
    id: string;
    name: string;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

@Table({
    timestamps: false,
})
class Group extends Model<GroupAttributes, GroupCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
}

export default Group;
