const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const sequelize = require("./connection/connection");

const server = express();
server.use(express.json());

const ruta = require('./routes/route');


server.post('/registrar', ruta);

server.use('*', (req, res,) => {
    res.status(404).send({ error: `La URL ingresada no existe servidor` });
});



sequelize.authenticate().then(() => {
    sequelize.sync({ force: false }).then(()=>{
        server.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`);
        });
    }).catch(()=>{
        console.log("Hubo un problema con la sincronización con la base de datos.")
    })
}).catch(() => {
    console.log("Hubo un problema con la conección a la base de datos.")
});

