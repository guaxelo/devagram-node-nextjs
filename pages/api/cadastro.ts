import type {NextApiRequest, NextApiResponse} from 'next'
import type {ResportaPadraoMsg} from '../../types/RespostaPadraoMsg'
import type {CadastroRequisicao} from '../../types/CadastroRequisicao'
import {UsuarioModel} from '../../models/UsuarioModel'
import {conectarMongoDB} from '../../middlewares/conectarMongoDB'
import md5 from 'md5'

const endpointCadastro =
    async (req: NextApiRequest, res: NextApiResponse<ResportaPadraoMsg>) =>{
    
    if(req.method === 'POST'){
       const usuario = req.body as CadastroRequisicao
       
       if(!usuario.nome || usuario.nome.length < 2){
            return res.status(400).json({erro: 'Nome invalido'})
       }
       if(!usuario.email || usuario.email.length < 5 
            || !usuario.email.includes('@')
            || !usuario.email.includes('.')){
            return res.status(400).json({erro: 'Email invalido'})
        }
        if(!usuario.senha || usuario.senha.length < 4){
            return res.status(400).json({erro: 'Senha invalida'})
        }

        //validação de duplicidade de usuario
        const usuarioComMesmoEmail = await UsuarioModel.find({email : usuario.email})
        if(usuarioComMesmoEmail && usuarioComMesmoEmail.length > 0){
            return res.status(400).json({erro: 'Essa conta ja existe'})

        }

        // salvar no banco de dados
        const usuarioASerSalvo = {
            nome : usuario.nome,
            email : usuario.email,
            senha : usuario.senha,
        }

        await UsuarioModel.create(usuario)
        return res.status(200).json({msg: 'Usuario criado com sucesso!'})
    }
    return res.status(405).json({erro: 'metodo informado não é valido'})
    }

export default conectarMongoDB(endpointCadastro)