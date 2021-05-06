/** @module Model/Tag */
import { Optional } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface TagAttributes {
    id: string;
    name: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, 'id'> {}

@Table({
    timestamps: false,
})
class Tag extends Model<TagAttributes, TagCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING(35),
        allowNull: false,
    })
    name: string;
}

export default Tag;
