/** @module Model/User */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    timestamps: false,
    defaultScope: {
        attributes: { exclude: ['googleId'] },
    },
})
class User extends Model {
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
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    profilePhoto: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    googleId: string;
}

export default User;
