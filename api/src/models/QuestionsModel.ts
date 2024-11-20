import { Schema,model } from "mongoose";
import { IQuestion } from "../GrobalTypes";

const QuestionSchema = new Schema<IQuestion>({
    title:{
        type:String,
        required: true
    },
    type:{
        type:String,
        enum: ["radio", "checkbox", "seclect","text"],
        required:true
    },
    isMandatory:{
        type: Boolean,
        required:true
    },
    qstId:{
        type : Schema.Types.ObjectId,
        ref:"questionnaires",
        required:true
    }

});
export const QuestionModel = model("questions", QuestionSchema)