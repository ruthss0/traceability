const express = require('express')
const path = require('path')
const port = process.env.PORT || 4545
const app = express()

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '3d630287d3d54e5280346c3da11e698d',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let people = [];
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.post('/api/person', (req, res) => {
    let {name} = req.body;
    name = name.trim();

    people.push(name);

    rollbar.log('person added successfully', {author:"Gabi", type:'manual'})

    res.status(200).send(people);
})

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Take us to warp ${port}!`))

