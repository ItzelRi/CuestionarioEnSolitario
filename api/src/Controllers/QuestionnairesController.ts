import { Request, Response } from "express";
import { QuestionnaireModel } from "../models/QuestionnairesModel";
import { QuestionModel } from "../models/QuestionsModel";
import { OptionsModel } from "../models/OptionsModel";

export const registerQues = async (req: Request, res: Response)
:Promise<any> => {
    try {
      const { title, userID, description, questions } = req.body;
  
      //Validar campos 
      if (!title || !description || !userID) {
        return res.status(400).json({ 
            msg: "Su informacion esta incompleta" 
        });
      }
  
      //Crear cuestionario
      const questionnaireCreate = await QuestionnaireModel.create({
        title,
        description,
        userID,
      })
  
      //Preguntas relacionadas
      const ques = await Promise.all(
        questions.map( async (question: any) => {

          const quesCreate = await QuestionModel.create({
            title: question.title,
            type: question.type,
            isMandatory: question.isMandatory,
            questionnaireID: questionnaireCreate._id, 
          })
  
          //Opciones relacionadas
          if (question.options && question.options.length > 0) {
            await Promise.all(
              question.options.map(async (option: any) => {
                await OptionsModel.create({
                  title: option.title,
                  questionID: quesCreate._id,
                })
              })
            )
          }
  
          return quesCreate;
        })
      )
  
      return res.status(200).json({
        msg: "Cuestionario creado exitosamente!",
        cuestionario: questionnaireCreate,
        ques,
      })

    } catch (error) {
      console.error(error)

      return res.status(500).json({ 
        msg: "Hubo un error al realizar esta accion" 
    })
    }
  }