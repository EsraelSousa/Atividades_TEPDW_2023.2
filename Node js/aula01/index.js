const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('<h1>Olá Mundo! essa é sua aplicação node!</h1>')
})

// webserver
app.listen(port, () => {
    console.log('Server Started')
})