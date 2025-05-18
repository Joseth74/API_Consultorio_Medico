import {
    listarTodaslasCitasQuery,
    listarCitaPorIdQuery,
    crearCitaQuery,
    actualizarCitaQuery,
    eliminarCitaQuery
  } from "../db/citasQuery.js";
  
  const listarTodaslasCitasController = async (req, res) => {
  try {
    const citas = await listarTodaslasCitasQuery();
    res.json(citas);
  } catch (error) {
    res.status(500).send(error);
  }
};

  /**
   * Obtener el libro con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarCitaPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const cita = await listarCitaPorIdQuery(req.params.id);
      res.json(cita);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un libro
   */
  const crearCita = async (req, res) => {
    console.log(req.body)
    try {
        const datosCita = req.body;
        const resultado = await crearCitaQuery(datosCita);
        res.json({ mensaje: 'Cita creado con éxito', id: resultado.rows[0].id });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un libro
   */
  const actualizarCita = async (req, res) => {
    try {
        const id = req.params.id;
        const datosCita = req.body;
        const resultado = await actualizarCitaQuery(id, datosCita);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Cita actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'Cita no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un libro
   */
  const eliminarCita = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarCitaQuery(id);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Cita eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'Cita no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el libro', error: error.message });
    }
  };
  
  export {
    listarTodaslasCitasController,
    listarCitaPorId,
    crearCita,
    actualizarCita,
    eliminarCita,
  };