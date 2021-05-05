/** @module Model/File */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
class File extends Model<File> {
    @Column({
        type: DataType.UUID,
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
