import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {

    try {
        const usuarios = await Usuario.findAll();

        res.json([usuarios]);
    } catch (error) {
        res.status(500).json({
            msg: 'there was an error on server'
        })
    }
}

export const getUsuario = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `the user with the: ${id} does not exist`
            })
        }

        res.json({
            usuario
        })
    } catch (error) {
        res.status(500).json({
            msg: 'there was an error on server'
        })
    }
}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if (existeEmail) {
            return res.status(400).json({
                msg: `the user with email: ${body.email} already exists`
            })
        }

        const { estado, ...data } = body;
        const usuario = Usuario.build(data);
        await usuario.save();

        res.json(usuario);


    } catch (error) {

        res.status(500).json({
            msg: 'there was an error on server'
        })
    }
}

export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `the user with id: ${id} doesn't exist`
            })
        }

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if (existeEmail) {
            return res.status(400).json({
                msg: `the user with email: ${body.email} already exists`
            })
        }

        const { estado, ...data } = body;

        await usuario.update(data);

        res.json({
            usuario
        })



    } catch (error) {

        res.status(500).json({
            msg: 'there was an error on server'
        })
    }
}

export const deleteUsuario = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'deleteUsuario',
        id
    })
}


