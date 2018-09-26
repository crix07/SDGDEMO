const app = require('./app')
const server = require('http').createServer(app);

// const { ReplSet } = require('mongodb-topology-manager');

const config = require('./config')
const mongoose = require('mongoose');
const io = require('socket.io')(server)
app.set('io', io)

mongoose.connect(config.db, {  useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log('conexion a la base de datos establecida')

        server.listen(config.port, () => {
            console.log(`server is listening on port ${config.port}`)
        })
    })
    .catch(err => console.log(`error al conectar a la base de datos ${err}`))



// run().catch(error => console.error(error));

// async function run() {
//   const bind_ip = 'localhost';
//   // Starts a 3-node replica set on ports 31000, 31001, 31002, replica set
//   // name is "rs0".
//   const replSet = new ReplSet('mongod', [
//     { options: { port: 27017, dbpath: 'C:/data/db/27017', bind_ip } },
//     { options: { port: 27018, dbpath: 'C:/data/db/27018', bind_ip } },
//     { options: { port: 27019, dbpath: 'C:/data/db/27019', bind_ip } }
//   ], { replSet: 'rs0' });

//   // Initialize the replica set
//   await replSet.purge();
//   await replSet.start();

//   // Connect to the replica set
//   mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true })
//     .then(() => {
//         console.log('conexion a la base de datos establecida')

//         server.listen(config.port, () => {
//             console.log(`server is listening on port ${config.port}`)
//         })
//     })
//     .catch(err => console.log(`error al conectar a la base de datos ${err}`))

// }