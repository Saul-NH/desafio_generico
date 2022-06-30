const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
let frase = 'Frase inicial';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/frase', (req, res) => {
    try {
        return res.json({ frase });
    } catch (error) {
        return res.status(500).json({ error: 'Ocurrio un error' });
    }
});



app.get('/api/palabras/:pos', (req, res) => {
    try {
        let pos = +--req.params.pos;
        let palabras = frase.split(' ');

        if (isNaN(pos)) {
            return res.json({ error: 'La posición no es válida' });
        }

        if (pos >= palabras.length) {
            return res.json({
                error: 'La posición sobrepasa la cantidad de palabras',
            });
        }

        if (pos < 0) {
            return res.json({
                error: 'La posición debe ser mayor o igual a: 1',
            });
        }

        return res.json({
            buscada: palabras[pos],
        });
    } catch (error) {
        return res.status(500).json({ error: 'Ocurrio un error' });
    }
});



app.post('/api/palabras', (req, res) => {
    try {
        frase += ` ${req.body.palabra}`;

        let palabras = frase.split(' ');

        return res.json({
            agregada: palabras[palabras.length - 1],
            pos: palabras.length,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Ocurrio un error' });
    }
});



app.put('/api/palabras/:pos', (req, res) => {
    try {
        let pos = +--req.params.pos;
        let palabras = frase.split(' ');

        if (isNaN(pos)) {
            return res.json({ error: 'La posición no es válida' });
        }

        if (pos >= palabras.length) {
            return res.json({
                error: 'La posición sobrepasa la cantidad de palabras',
            });
        }

        if (pos < 0) {
            return res.json({
                error: 'La posición debe ser mayor o igual a: 1',
            });
        }

        let palabraAnterior = palabras.splice(pos, 1, req.body.palabra);

        frase = palabras.join(' ');

        return res.json({
            actualizado: palabras[pos],
            anterior: palabraAnterior.join(''),
        });
    } catch (error) {
        return res.status(500).json({ error: 'Ocurrio un error' });
    }
});



app.delete('/api/palabras/:pos', (req, res) => {
    try {
        let pos = +--req.params.pos;
        let palabras = frase.split(' ');

        if (isNaN(pos)) {
            return res.json({ error: 'La posición no es válida' });
        }

        if (pos >= palabras.length) {
            return res.json({
                error: 'La posición sobrepasa la cantidad de palabras',
            });
        }

        if (pos < 0) {
            return res.json({
                error: 'La posición debe ser mayor o igual a: 1',
            });
        }

        let palabraEliminada = palabras.splice(pos, 1);
        frase = palabras.join(' ');

        return res.json({
            eliminada: palabraEliminada.join(''),
        });
    } catch (error) {
        return res.status(500).json({ error: 'Ocurrio un error' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Escuchando en [PUERTO: ${PORT}]: `);
});

app.on('error', (error) => console.error(error));
