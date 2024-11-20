import { Schema, model } from "mongoose";
import { IOptions } from "../GrobalTypes";

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