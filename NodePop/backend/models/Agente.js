const mongoose = require('mongoose');

// Definir el esquema de los agentes
const agenteSchema = mongoose.Schema({
    name: String,
    age: Number,
});

// Crea el modelo de agente
const Agente = mongoose.model('Agente', agenteSchema)

// Exportar el modelo de agente (Opcional)
module.exports = Agente;

