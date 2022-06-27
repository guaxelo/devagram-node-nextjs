import type {NextApiRequest, NextApiResponse} from 'next'
import { conectarMongoDB } from '../../middlewares/conectarMongoDB'
import type {ResportaPadraoMsg} from '../../types/RespostaPadraoMsg'
import md5 from 'md5'
import { UsuarioModel } from '../../models/UsuarioModel'

const endpointLogin = async (
    req: NextApiRequest,
    res: NextApiResponse<ResportaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body

        const usuariosEncotrados = await UsuarioModel.find({email : login, senha : senha})
        if(usuariosEncotrados && usuariosEncotrados.length > 0){
            const usuarioEncontrado = usuariosEncotrados[0]
            return res.status(200).json({msg: `Usuario ${usuarioEncontrado.nome} autenticado com sucesso`})  
        }
        return res.status(400).json({erro: 'Usuario ou senha não encontrado'})
    }
    return res.status(405).json({erro: 'metodo informado não é valido'})
}

export default conectarMongoDB(endpointLogin)