import { Schema } from "mongoose";

export interface IUser{
    name:string;
    email:string;
    lastName:string;
    password:string;
    rol: "administrator" | "client"
}
export interface IQuestion{
    title: string,
    type: "radio"| "checkbox"| "select"|"text";
    isMandatory: boolean,
    qstId: Schema.Types.ObjectId|string
}
export interface IQuestionnaire{
    title: string;
    description: string;
    userId: Schema.Types.ObjectId | string;
}
export interface IOptions{
    title: string;
    qId: Schema.Types.ObjectId | string;
}
export interface IAnswer{
    qstId:Schema.Types.ObjectId | string;
    qId:Schema.Types.ObjectId | string;
    answer:string;
}