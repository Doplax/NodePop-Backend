// Importamos el módulo de Express
const express = require('express');

// Creamos una nueva instancia de Router de Express.
// Un router es un middleware que agrupa rutas relacionadas.
const router = express.Router();

// Importamos el modelo de datos de "Agente" para poder interactuar con la base de datos.
const Agente = require('../../models/Agente');

// Definimos una ruta GET para la raíz ('/') de este router.
// Usamos 'async' porque vamos a hacer operaciones asíncronas dentro de esta función.

/**
 * @openapi
 * /api/agentes:
 * get:
 *   description: Devuelve la lista de agetes/
 *   responses:
 *      200:
 *      description: Devuelve JSON
 */

// GET api/agentes
// Devuelve ;una lista de agentes
router.get('/', async (req, res, next) => {

    try {
        // Filtros
        // http://127.0.0.1:3000/api/agentes?name=Jones
        const filtreByName = req.query.name;
        const filterByAge = req.query.age;
        // Paginación
        // http://127.0.0.1:3000/api/agentes?skip=2&limit=2
        const skip = req.query.skip;
        const limit = req.query.limit;
        // Ordenación
        const sort = req.query.sort;
        //field selction
        const fields = req.query.fields;


        const filtro = {}

        if (filtreByName){
            filtro.name = filtreByName;
        }

        if (filterByAge){
            filtro.age = filterByAge;
        }

        const agentes = await Agente.lista(filtro, skip , limit, sort, fields );


        //throw new Error('fallo forzado')

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
        //const id = req.params.id;
        //const data = req.body
        const agenteActualizado = await Agente.findByIdAndUpdate(id, data, {new: true});
        res.json({result: agenteActualizado})

    } catch (error) {
        next(error);
    }
})

// POST /api/agentes
// Crea un agente
router.post('/', async (req, res, next) => {
    try {
        const agenteData = req.body;

        // creamos una instancia de agente en memoria
        const agente = new Agente(agenteData);

        // La persisitimos en la BD (guardar)
        const agenteGuardado = await agente.save();
        res.json({ result: agenteGuardado})

    } catch (error) {
        next(error);
    }
})


// DELETE /api/agentes/(_id)
// Elimina un agente
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Agente.deleteOne({_id});

        res.json() // No es necesario que responda nada, con un 200 OK

    } catch (error) {
        
    }
})




// Exportamos el router para que pueda ser usado en otros archivos.
module.exports = router;
