import { Schema,model } from "mongoose";

interface IQuestion{
    title: string,
    type: "radio"| "checkbox"| "select"|"text";
    isMandatory: boolean,
    qstId: Schema.Types.ObjectId|string

}

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