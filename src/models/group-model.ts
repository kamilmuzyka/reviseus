/** @module Model/Group */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    timestamps: false,
})
class Group extends Model<Group> {
    @Column({
        type: DataType.UUID,
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
