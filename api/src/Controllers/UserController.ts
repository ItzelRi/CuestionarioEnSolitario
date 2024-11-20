import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";

export const registerUsers = async (req:Request,res:Response)
:Promise<any> => {
    try {
        //los datos existen?
        const name = req.body.name
        const email = req.body.email
        const lastName = req.body.lastName
        const password = req.body.password
        const rol = req.body.rol

        //Admins no pueden crear clientes
        if(req.user?.rol === "administrator" && rol === "client"){
            return res.status(400).json({
                msg:"Los administradores no pueden crear clientes"
        })
    }
        if(!name || !email || !lastName || !password || !rol){
            return res.status(400).json({
                msg:"Faltan datos para crear un usuario"
            })
        }
        //un admin esta creando un usuario admin?
        if(rol === "administrator" && req.user?.rol != "administrator"){
             return res.status(400).json({
                msg:"No puedes crear un nuevo admin si tu no eres uno"
            })
        }

        await UserModel.create({
            name,
            lastName,
            email,
            password,
            rol
        })
        return res.status(200).json({
            msg:"Usuario registrado con exito"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Hubo un error al crear el usuario"
        })
    }
}