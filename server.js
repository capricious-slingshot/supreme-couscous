const express = require('express')
const morgan = require('morgan')

const hostname = 'localhost'
const port = 3000;

const app = express()
app.use(morgan('dev '))
//middleware that parses json into JS properties of request Obj
app.use(express.json())


//all HTTP methods resquire status code, header, next/end

// catch all for all HTTP verbs
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    //passes control to the next relevant routing method
    next()
})

//next possible endpoints - no need for next to be passed
app.get('/campsites', (req, res) => {
  //status code and header are inherited from .all method unless otherwise defined
  res.end('will send all the campsites to you')
})
app.get('/campsites/:campsiteId', (req, res) => {
  res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`)
})

app.post('/campsites', (req, res) => {
  //status code and header are inherited from .all method unless otherwise defined
  res.end(`will add the campsite: ${req.body.name} with descripton: ${req.body.description}`)
})
app.post('/campsites/:campsiteId', (req, res) => {
  res.end(`PUT opperation not supported on '/campsites/${req.params.campsiteId}`)
})
 
app.put('/campsites', (req, res) => {
  //status code and header are inherited from .all method unless otherwise defined
  res.statusCode = 403
  res.end(`campsite: ${req.body.name} description: ${req.body.description}`)
})
app.put('/campsites/:campsiteId', (req, res) => {
  res.write(`Updating the campsite: ${req.params.campsiteId}\n`)
  res.end(`PUT opperation not supported on '/campsites/${req.params.campsiteId}`)
})

app.delete('/campsites', (req, res) => {
  res.end('Deleting all campsites')
})
app.delete('/campsites/:campsiteId', (req, res) => {
  res.end(`Deleting campsite: ${req.params.campsiteId}`)
})


app.use(express.static(__dirname + '/public'))

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});