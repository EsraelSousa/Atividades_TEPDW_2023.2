const express = require('express')
const app = express()
const port = 3000

const path = require('path')

// ligar templates ao projeto
const basePath = path.join(__dirname, 'templates')

// para usar o CSS vamos deixa-lo publico
app.use(express.static(path.join(__dirname, 'public')));

// a página inicial
app.get('/', (req, res) => {
    res.sendFile(`${basePath}/html/index.html`)
})

// vamos linkar a página home a aplicação
app.get('/home.html', (req, res) => {
    res.sendFile(`${basePath}/html/home.html`)
})

// webserver
app.listen(port, () => {
    console.log('Server Started')
})