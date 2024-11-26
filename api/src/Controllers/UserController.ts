import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";
import jwt from "jsonwebtoken";

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

        const user = await UserModel.create({
            name,
            lastName,
            email,
            password,
            rol
        })
        const token = jwt.sign(JSON.stringify(user), "pocoyo");

        return res.status(200).json({
            msg:"Usuario registrado con exito", token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Hubo un error al crear el usuario"
        })
    }
}

export const signIn = async (req:Request, res:Response)
:Promise<any> =>{

    //verificar existencia de usuario
    try{
    const user = await UserModel.findOne({email:req.body.email, 
        password:req.body.password})

    //si si devuelve token
    if(!user){
        return res.status(400).json({
        msg: "No hay usuarios que coincidan"
    })
}   
        const token = jwt.sign(JSON.stringify(user), "poyoyopo");
        return res.status(200).json({
            msg: "Iniciando sesion..."
    })
    
    //si no devuelve error
}catch (error) {
    console.log(error);
    return res.status(500).json({
        msg:"Error al iniciar sesion"
    })
}}