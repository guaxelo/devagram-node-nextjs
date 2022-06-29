import type {NextApiResponse} from 'next'
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg'
import nc from 'next-connect'
import {upload, uploadImagemCosmic} from '../../services/uploadImagemCosmic'
import {conectarMongoDB} from '../../middlewares/conectarMongoDB'  
import {validarTokenJWT} from '../../middlewares/validarTokenJWT'  

const handler = nc()
    .use(upload.single('file'))
    .use(async (req : any, res : NextApiResponse<RespostaPadraoMsg>) =>{

        try{

            if(!req || !req.body){
                return res.status(400).json({erro : 'Parametros de entrada nao informados'})
            }

            const {descricao, file} = req?.body

            if(!descricao || descricao.length < 2){
                return res.status(400).json({erro : 'descricao nao é valida'})
            }

            if(!req.file || !req.file.originalname){
                return res.status(400).json({erro : 'a imagem é obrigatoria'})
            }

            return res.status(200).json({msg : 'Publicação esta valida'})
            

        }catch(e){
            return res.status(400).json({erro : 'Erro ao cadastrar publicação'})
    
    }
});

export const config = {
    api :{
        bodyParser : false

    }
}

export default validarTokenJWT(conectarMongoDB(handler))