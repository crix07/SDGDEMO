const Product = require('../models/products');


function addProduct(req, res) {
    let params = req.body

    if ( params.nombre && params.marca && params.color && params.precio ) {
        const io = req.app.get('io');
        const product = new Product(params);
        product.save((err, products) => {
            if (err) res.status(500).send({message: `error al guardar el producto ${err}`});
            io.emit('newProduct');
            return res.status(200).send({ ok: true })
        });
    } else {
        return res.status(500).send({ message: 'Favor rellenar todos los campos' })
    }
}


function allProducts(req, res) {
    // Product.watch().on('change', products => {
    //     return res.status(200).send(products);
    // })
    Product.find({}, (err, products) => {
        if (err) res.status(500).send({message: `error al buscar todos los productos ${err}`});
        return res.status(200).send(products)
    });
}

function removeProduct(req, res) {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) res.status(500).send({message: `error al eliminar un producto ${err}`})
        return res.status(200).send({message: 'has eliminado el producto correctamente'})
    })
}


function editProduct(req, res) {
    let params = req.body;
    let id = req.params.id; 
    Product.findByIdAndUpdate(id, params, {new:true}, (err, udpatedProduct) => {
        if (err) res.status(500).send({message: `error al eliminar un producto ${err}`})
        return res.status(200).send(udpatedProduct)
    })
}

function getProduct(req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err) res.status(500).send({message: `error al buscar un producto ${err}`});
        return res.status(200).send(product);
    });
}

module.exports = {
    addProduct,
    allProducts,
    removeProduct,
    editProduct,
    getProduct
}