import ordenesModel from '../models/ordenes.js';

const ordenesController = {
create: async (req, res) => {
    try {
    const nuevaOrden = new ordenesModel(req.body);
    await nuevaOrden.save();
    res.status(201).json({ message: 'Orden creada', data: nuevaOrden });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear la orden' });
    }
},

readAll: async (req, res) => {
    try {
    const ordenes = await ordenesModel.find();
    res.status(200).json({ data: ordenes });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener las órdenes' });
    }
}
};

export default ordenesController;