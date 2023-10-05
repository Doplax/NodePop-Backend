// Importamos el módulo de Express
const express = require('express');

// Creamos una nueva instancia de Router de Express.
// Un router es un middleware que agrupa rutas relacionadas.
const router = express.Router();

// Importamos el modelo de datos de "Agente" para poder interactuar con la base de datos.
const Agente = require('../../models/Agente');

// Definimos una ruta GET para la raíz ('/') de este router.
// Usamos 'async' porque vamos a hacer operaciones asíncronas dentro de esta función.

// GET api/agentes
// Devuelve ;una lista de agentes
router.get('/', async (req, res, next) => {

    try {
        // Usamos 'await' para esperar a que se complete la consulta a la base de datos.
        // 'Agente.find()' busca todos los documentos en la colección de agentes.
        const agentes = await Agente.find();

        throw new Error('fallo forzado')

        // Enviamos los resultados como una respuesta JSON.
        res.json({ results: agentes });

    } catch (err) {
        // Si hay algún error, lo pasamos al siguiente middleware de manejo de errores.
        next(err);

    }

});


// GET /api/agentes/(_id)
// Devuelve un Agente
router.get('/', async (req, res,next) => {
    try {
        const id = req.params.id;
        
        const agente = await Agente.findById(id);
        
        res.json({result: agente});

    } catch (error) {
        next(error)
    }
})


// PUT: /api/agentes/(_id)
// Actualiza un agente

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const data = req.body;

        const agenteActualizado = await Agente.findByIdAndUpdate(id, data, {new: true});

        res.json({result: agenteActualizado})

    } catch (error) {
        next(error);
    }
})

// Exportamos el router para que pueda ser usado en otros archivos.
module.exports = router;
