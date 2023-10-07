const mongoose = require('mongoose');

// Definir el esquema de los agentes
const agenteSchema = mongoose.Schema({
    name: {type: String, index: true }, 
    age: {type : Number, min: 18, max: 120, indexed: true},
});


// Tipos de métodos
// - Estático: Método que está en el modelo (p.e. Agente.lista())
// - De Instancia: método que tienen las instancas (p.e. Agente.saluda())
agenteSchema.statics.lista = function(filtro, skip, limit, sort, fields){
    const query = Agente.find(filtro); //Devuelve un objeto de tipo query que es un thenable
    query.skip(skip) // Método de mongoDB
    query.limit(limit);
    query.sort(sort);
    fields.select(fields);
    return query.exec()
}


// Método de instancia
agenteSchema.methods.saluda = function (query) {
    console.log("Hola, soy el agente " + this.name);
}

// Crea el modelo de agente
const Agente = mongoose.model('Agente', agenteSchema)

// Exportar el modelo de agente (Opcional)
module.exports = Agente;



