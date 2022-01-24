const express = require('express')
const campsiteRouter = express.Router()

campsiteRouter.route('/')

// route methods when abstracted into own file don't need app.verb - just the verb
// route methods also don't need the '/path' as the first argument - just req, res, next/end
//path is defined in the parent file:  `app.use('/campsites', campsiteRouter)`
  
// catch all for all HTTP verbs
.all( (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    //passes control to the next relevant routing method
    next()
})

//next possible endpoints - no need for next to be passed
.get((req, res) => {
  //status code and header are inherited from .all method unless otherwise defined
  res.end('will send all the campsites to you')
})
.post((req, res) => {
  //status code and header are inherited from .all method unless otherwise defined
  res.end(`will add the campsite: ${req.body.name} with descripton: ${req.body.description}`)
})
.put((req, res) => {
  //status code and header are inherited from .all method unless otherwise defined
  res.statusCode = 403
  res.end(`campsite: ${req.body.name} description: ${req.body.description}`)
})
.delete((req, res) => {
  res.end('Deleting all campsites')
})

module.exports = campsiteRouter