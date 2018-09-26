const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routesUser = require('./routes/users');
const routesProduct = require('./routes/product');

// settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// routing
app.use('/api', routesUser);
app.use('/api', routesProduct);

// app.use(express.static(path.join(__dirname, 'public/SDGDEMO/dist/SDGDEMO')))


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/SDGDEMO/dist/SDGDEMO/index.html'))
// })


module.exports = app