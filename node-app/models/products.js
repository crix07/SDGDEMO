const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    color: { type: String, required: true },
    precio: { type: Number, required: true },
    region: { type: String, required: false },
    provincia: { type: String, required: false },
    municipio: { type: String, required: false },
    ciudad: { type: String, required: false },
    sector: { type: String, required: false },
    calle: { type: String, required: false },
    georeferencia: { type: String, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
    
});

module.exports = mongoose.model('Product', productSchema);