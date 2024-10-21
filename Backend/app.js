const express = require('express');
const conexion = require('./config/db');
const app= express();
const port=3000;
const bodyParser = require('body-parser');
const router = require('./routes/index');

// Middleware para parsear JSON
app.use(express.json());

app.use('/',router)

app.get('/', (req, res) => {
res.send('Aguante River');
});

app.listen(port,() => {

    console.log(`Servidor escuchando en http://localhost:${port}`);
});