const mongoose = require('mongoose');

// Definir el esquema de los agentes
const agenteSchema = mongoose.Schema({
    name: String,
    age: {type : Number, min: 18, max: 120},
});


// Tipos de métodos
// - Estático: Método que está en el modelo (p.e. Agente.lista())
agenteSchema.statics.lista = function(filtro, skip, limit, sort){
    const query = Agente.find(filtro); //Devuelve un objeto de tipo query que es un thenable
    query.skip(skip) // Método de mongoDB
    query.limit(limit);
    query.sort(sort);
    return query.exec()
}


// Crea el modelo de agente
const Agente = mongoose.model('Agente', agenteSchema)

// Exportar el modelo de agente (Opcional)
module.exports = Agente;



