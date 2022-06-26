import type {NextApiRequest, NextApiResponse} from 'next'
import { conectarMongoDB } from '../../middlewares/conectarMongoDB'
import type {ResportaPadraoMsg} from '../../types/RespostaPadraoMsg'

const endpointLogin = (
    req: NextApiRequest,
    res: NextApiResponse<ResportaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body

        if(login === 'admin@admin.com' && 
            senha === 'Admin@123'){
                return res.status(200).json({msg: 'Usuario autenticado com sucesso'})  
        }
        return res.status(400).json({erro: 'Usuario ou senha não encontrado'})
    }
    return res.status(405).json({erro: 'metodo informado não é valido'})
}

export default conectarMongoDB(endpointLogin)