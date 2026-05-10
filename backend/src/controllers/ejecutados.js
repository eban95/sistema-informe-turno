import ejecutadosModel from "../models/ejecutados.js";

const isCastError = (error) => error?.name === "CastError";

const ejecutadosController = {
  create: async (req, res) => {
    try {
      const { name, maquina, tiempo, area, horno, comentarios } = req.body;
      const newEjecutado = new ejecutadosModel({
        name,
        maquina,
        tiempo,
        area,
        horno,
        comentarios,
      });
      await newEjecutado.save();
      res.status(201).json({ message: "ejecucion creada", data: newEjecutado });
    } catch (error) {
      res.status(500).json({ message: "error al crear la ejecucion" });
    }
  },

  readAll: async (req, res) => {
    try {
      const allEjecutados = await ejecutadosModel.find();
      res.status(200).json({ data: allEjecutados });
    } catch (error) {
      res.status(500).json({ message: "error al obtener las ejecuciones" });
    }
  },

  read: async (req, res) => {
    try {
      const { id } = req.params;
      const ejecutadoFound = await ejecutadosModel.findById(id);
      if (!ejecutadoFound) {
        return res.status(404).json({ message: "ejecucion no encontrada" });
      }
      return res.status(200).json({ data: ejecutadoFound });
    } catch (error) {
      if (isCastError(error)) {
        return res.status(400).json({ message: "id invalido" });
      }
      res.status(500).json({ message: "error al obtener la ejecucion" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, maquina, tiempo, area, horno, comentarios } = req.body;
      const ejecutadoUpdate = await ejecutadosModel.findByIdAndUpdate(
        id,
        { name, maquina, tiempo, area, horno, comentarios },
        { new: true, runValidators: true }
      );
      if (!ejecutadoUpdate) {
        return res.status(404).json({ message: "ejecucion no encontrada" });
      }
      return res.status(200).json({
        message: "ejecucion actualizada",
        data: ejecutadoUpdate,
      });
    } catch (error) {
      if (isCastError(error)) {
        return res.status(400).json({ message: "id invalido" });
      }
      res.status(500).json({ message: "error al actualizar la ejecucion" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const ejecutadoDelete = await ejecutadosModel.findByIdAndDelete(id);
      if (!ejecutadoDelete) {
        return res.status(404).json({ message: "ejecucion no encontrada" });
      }
      return res.status(200).json({ message: "ejecucion eliminada" });
    } catch (error) {
      if (isCastError(error)) {
        return res.status(400).json({ message: "id invalido" });
      }
      res.status(500).json({ message: "error al eliminar la ejecucion" });
    }
  },
};

export default ejecutadosController;
