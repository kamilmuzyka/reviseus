/** @module Model/File */
import { Optional } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface FileAttributes {
    id: string;
    uri: string;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

@Table({
    timestamps: false,
})
class File extends Model<FileAttributes, FileCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    uri: string;
}

export default File;
