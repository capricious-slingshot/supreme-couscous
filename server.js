const express = require('express')
const morgan = require('morgan')
const campsiteRouter = require('./routes/campsiteRouter')
const promotionsRouter = require('./routes/promotionsRouter')
const partnersRouter = require('./routes/partnersRouter')

const hostname = 'localhost'
const port = 3000;

const app = express()
app.use(morgan('dev '))
//middleware that parses json into JS properties of request Obj
app.use(express.json())

// URL ROOT PATH, ROUTER NAME (file required above)
app.use('/campsites', campsiteRouter)
app.use('/promotions', promotionsRouter)
app.use('/partners', partnersRouter)

//all HTTP methods resquire status code, header, next/end 

//QUESTIONS: wtf does res.write do? how is it different from end?

//static file directory
.use(express.static(__dirname + '/public'))

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});