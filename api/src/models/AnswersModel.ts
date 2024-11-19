import { Schema, model } from "mongoose";

interface IAnswer{
    qstId:Schema.Types.ObjectId | string;
    qId:Schema.Types.ObjectId | string;
    answer:string;
}

const AnswerSchema = new Schema<IAnswer>({
    qstId:{
        type: Schema.Types. ObjectId,
        ref:"questionnaires",
        required:true
    },
    qId:{
        type: Schema.Types. ObjectId,
        ref:"questions",
        required:true
    },
    answer:{
        type:String,
        required:true
    }
});

export const AnswerModel = model("answers", AnswerSchema);