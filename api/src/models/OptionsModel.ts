import { Schema, model } from "mongoose";

interface IOptions{
    title: string;
    qId: Schema.Types.ObjectId | string;
}

const OptionSchema = new Schema<IOptions>({
    title:{
        type:String,
        required: true
    },
    qId:{
        type: Schema.Types.ObjectId,
        ref:"questions",
        required:true
    }
});
export const OptionsModel = model("options", OptionSchema)