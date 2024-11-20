import { Schema, model } from "mongoose";
import { IAnswer } from "../GrobalTypes";

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