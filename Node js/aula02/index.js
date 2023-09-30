const express = require('express')
const app = express()
const port = 3000
const path = require('path')

// vamos juntar o diretório ao projeto
const basePath = path.join(__dirname, 'templates')

// fazemos uma conexão 
app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

/* desveiculamos isso para usar o arquivo de templates
app.get('/', (req, res) => {
    res.send('<h1>Olá Mundo! essa é sua aplicação node!</h1>')
})
*/

// webserver
app.listen(port, () => {
    console.log('Server Started')
})