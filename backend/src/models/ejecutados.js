import {Schema,model} from 'mongoose';

/*
{
    name: String,
    maquina: String,
    timpo: Number,
    area: String,
    comentarios: String,
}
*/

const ejecutadosSchema = new Schema({
    name: {type: String, required: true},
    maquina: {type: String, required: true},
    tiempo: {type: Number, required: true},
    area: {type: String, required: true},
    comentarios: {type: String, required: false},
},{versionKey: false, timestamps: true});

export default model('Ejecutados', ejecutadosSchema);
