// Importamos el módulo de Express
const express = require('express');

// Creamos una nueva instancia de Router de Express.
// Un router es un middleware que agrupa rutas relacionadas.
const router = express.Router();

// Importamos el modelo de datos de "Agente" para poder interactuar con la base de datos.
const Agente = require('../../models/Agente');

// Definimos una ruta GET para la raíz ('/') de este router.
// Usamos 'async' porque vamos a hacer operaciones asíncronas dentro de esta función.
router.get('/', async (req, res, next) => {

    try {
        // Usamos 'await' para esperar a que se complete la consulta a la base de datos.
        // 'Agente.find()' busca todos los documentos en la colección de agentes.
        const agentes = await Agente.find();

        // Enviamos los resultados como una respuesta JSON.
        res.json({ results: agentes });

    } catch (err) {
        // Si hay algún error, lo pasamos al siguiente middleware de manejo de errores.
        next(err);
    }

});

// Exportamos el router para que pueda ser usado en otros archivos.
module.exports = router;
