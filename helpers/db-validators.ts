
import Usuario from '../models/usuario';


export const emailExiste = async (correo='')=>{

    const existeEmail= await Usuario.findOne({
        where: {
            email: correo
        }
    })

    if(existeEmail){
        throw new Error(`the email: ${correo} already exists`);
    }
}


export const existeUsuarioPorId= async(id:number)=>{

    const existeUsuario= Usuario.findByPk(id);

    if(!existeUsuario){
        throw new Error('the id does not exists')
    }
}
