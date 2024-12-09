const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    { 
        pid: { type: String },
        url: { type: String },
        name: { type: String },
        description: { type: String },
        brand: { type: String },
        category: { type: String },
        quantity: { type: Number },
        price: { type: Number }, 
        availability: { type: String, default: 'No'},
        status: { type: Number, default: 2 },
        s3_key: { type: String },
        uploadedAt: { type: Date, default: Date.now }
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
