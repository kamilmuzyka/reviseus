/** @module Model/Answer */
import { Optional } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface AnswerAttributes {
    id: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> {}

@Table
class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING(510),
        allowNull: false,
    })
    content: string;
}

export default Answer;
