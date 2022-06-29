import type {NextApiRequest, NextApiResponse} from 'next'
import { conectarMongoDB } from '../../middlewares/conectarMongoDB'
import type {RespostaPadraoMsg as RespostaPadraoMsg} from '../../types/RespostaPadraoMsg'
import type {LoginResposta} from '../../types/LoginResposta'
import md5 from 'md5'
import { UsuarioModel } from '../../models/UsuarioModel'
import jwt from 'jsonwebtoken'


const endpointLogin = async (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg | LoginResposta>
) => {

    const {MINHA_CHAVE_JWT} = process.env
    if(!MINHA_CHAVE_JWT){
        return res.status(500).json({erro : 'ENV Jwt nao informada'})
    }

    if(req.method === 'POST'){
        const {login, senha} = req.body

        const usuariosEncotrados = await UsuarioModel.find({email : login, senha : senha})
        if(usuariosEncotrados && usuariosEncotrados.length > 0){
            const usuarioEncontrado = usuariosEncotrados[0]

            const token = jwt.sign({_id : usuarioEncontrado._id}, MINHA_CHAVE_JWT)

            return res.status(200).json({
                nome: usuarioEncontrado.nome,
                email : usuarioEncontrado.email,
                token})  
        }
        return res.status(400).json({erro: 'Usuario ou senha não encontrado'})
    }
    return res.status(405).json({erro: 'metodo informado não é valido'})
}

export default conectarMongoDB(endpointLogin)