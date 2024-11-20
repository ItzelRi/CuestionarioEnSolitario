interface IUser{
    name:string;
    email:string;
    lastName:string;
    password:string;
    rol: "administrator" | "client"
}
interface IQuestion{
    title: string,
    type: "radio"| "checkbox"| "select"|"text";
    isMandatory: boolean,
    qstId: Schema.Types.ObjectId|string
}
interface IQuestionnaire{
    title: string;
    description: string;
    userId: Schema.Types.ObjectId | string;
}
interface IOptions{
    title: string;
    qId: Schema.Types.ObjectId | string;
}
interface IAnswer{
    qstId:Schema.Types.ObjectId | string;
    qId:Schema.Types.ObjectId | string;
    answer:string;
}

declare namespace Express{
    export interface Request{
        user?:IUser
    }
}