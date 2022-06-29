import mongoose, {mongo, Schema} from "mongoose";

const PublicacaoSchema = new Schema({
    data : {type: Date, required : true},
    idUsuario : {type: String, required : true},
    descricao : {type: String, required : true},
    foto : {type: String, required : true},
    like : {type: Array, required : false, default : []},
    comentario : {type: Array, required : true, default : []}
})

export const PublicacaoModel = (mongoose.models.publicação || mongoose.model('publicacoes', PublicacaoSchema))