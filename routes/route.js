const bcrypt = require('bcrypt');
const express = require('express');
const usuario = require('../models/usuario.js'); // Asegúrate de importar tu modelo 'usuarios'
const router = express.Router();

router.post('/registrar', async (req, res) => {
    const nombre = req.body.nombre;
    const passw = req.body.passw;

    if (!nombre || nombre.length < 6) {
        res.status(400).send('El nombre debe tener al menos 6 caracteres');
        return;
    }

    if (!passw || passw.length < 6) {
        res.status(400).send('La passw debe tener al menos 6 caracteres');
        return;
    }

    const passwEncriptada = await bcrypt.hash(passw, 10); // Utiliza 'bcrypt' aquí

    try {
        const usuario = await usuario.create({ // Utiliza el modelo 'usuarios' para crear un usuario
            nombre,
            passw: passwEncriptada,
        });

        res.json(usuario);
    } catch (error) {
        res.status(500).send('Error al crear el usuario');
    }
});
module.exports = router