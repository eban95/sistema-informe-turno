import { Schema, model } from 'mongoose';

const ordenesSchema = new Schema({
tipo: {
    type: String,
    required: true
},
maquina: {
    type: String,
    required: true
},
actividad: {
    type: String,
    required: true
},
tiempoEstimado: {
    type: Number,
    required: true
},
estado: {
    type: String,
    required: true,
    default: 'pendiente'
},
fecha: {
    type: Date,
    default: Date.now
}
}, {
versionKey: false,
timestamps: true
});

export default model('ordenes', ordenesSchema);