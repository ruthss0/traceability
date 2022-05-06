const express = require('express')
const path = require('path')
const port = process.env.PORT || 4545
const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(port, () => console.log(`Take us to warp ${port}!`))
