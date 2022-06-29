const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));













app.listen(PORT,() =>{
    console.log(`Servidor Escuchando en [PUERTO: ${PORT}]: `);
});

app.on('error',(error) => console.error(error))


