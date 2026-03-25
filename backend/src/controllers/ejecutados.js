import ejecutadosModel from "../models/ejecutados.js";


const ejecutadosController = {
creat: async (req, res) => {
    try {
        const { name, maquina, tiempo, area, comentarios} = req.body;
        const newEjecutado = new ejecutadosModel({
        name, 
        maquina, 
        tiempo, 
        area, 
        comentarios
        });
        await newEjecutado.save();
        res.status(201).json({message: "ejecucion creado"});
    } catch (error) {
        res.status(500).json({message: "error al crear la ejecucion"});
    }
},
readALL: async (req, res) => {
    try {
        const allEjecutados = await ejecutadosModel.find();
        res.status(201).json({data: allEjecutados});
    } catch (error) {
        res.status(500).json({message: "error al obtener las ejecuciones"});
    }
},
read: async (req, res) => {
    try {
        const { id } = req.params;
        const ejecutadoFound = await ejecutadosModel.findById(id);
        res.status(201).json({data: ejecutadoFound});
        if (!ejecutadoFound) {
            res.status(404).json({message: "ejecucion no encontrada"});
        } else {
            res.status(201).json({data: ejecutadoFound});
        }
    } catch (error) {
        res.status(500).json({message: "error al obtener la ejecucion"});
    }
},
update:async (req, res) => {
    try {
        const { id } = req.params;
        const { name, maquina, tiempo, area, comentarios} = req.body;
        const ejecutadoUpdate = await ejecutadosModel.findByIdAndUpdate(id,{ name, maquina, tiempo, area, comentarios});
        res.status(201).json({data: ejecutadoUpdate});
        if (!ejecutadoUpdate) {
            res.status(404).json({message: "ejecucion no encontrada"});
        } else {
            res.status(201).json({message: "ejecucion actualizada"});
        }
    } catch (error) {
        res.status(500).json({message: "error al obtener la ejecucion"});
    }
},
delet: async(req, res) => {
    try {
        const { id } = req.params;
        const ejecutadoDelete = await ejecutadosModel.findByIdAndDelete(id);
        if (!ejecutadoDelete) {
            res.status(404).json({message: "ejecucion no encontrada"});
        } else {
            res.status(201).json({message: "ejecucion eliminada"});
        }
    } catch (error) {
        res.status(500).json({message: "error al eliminar la ejecucion"});
    }
}
}

export default ejecutadosController;