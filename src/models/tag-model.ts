/** @module Model/Tag */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    timestamps: false,
})
class Tag extends Model {
    @Column({
        type: DataType.UUID,
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
