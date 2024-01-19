const mongoose = require('mongoose');

// Definir el esquema de los agentes
const productsSchema = new mongoose.Schema({
    nombre: {type: String, index: true },
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

productsSchema.statics.lista = function(filtro, skip, limit, sort, fields){
    const query = Producto.find(filtro); //Devuelve un objeto de tipo query que es un thenable
    query.skip(skip) // Método de mongoDB
    query.limit(limit);
    query.sort(sort);
    fields.select(fields);
    return query.exec()
}

const Producto = mongoose.model('Product', productsSchema)

// Exportar el modelo de agente (Opcional)
module.exports = Producto;



