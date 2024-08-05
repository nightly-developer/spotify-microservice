// const http = require('http')
// const server = http.createServer((req, res) => {
//   console.log("server is listening on port 5000....");
//   res.writeHead(200, {
//     'Content-Type': 'application/json'
//   })
//   res.write("Hello, World!")
//   res.end()
// })
// server.listen(5000, (req, res) => {
//   console.log("server is listening on port 5000....")
// })

const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

// const helmet = require('helmet')
// const cors = require('cors')
// const passport = require('passport')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//   .use(cors())
//   .use(express.static('public'))
//   .use(helmet())
//   .use(passport.initialize())
//   .use(passport.session())
//   .use(morgan('tiny'))

app.use(logger)

function mid1(req, res, next) {
  console.log("hello from mid1")
  next()
}

function mid2(req, res, next) {
  console.log("hello from mid2")
  next()
}

function logger(req, res, next) {
  console.log(next)
  // res.status(500).send('something went worng')
  next()
}

app.get('/', [mid1, mid2], (req, res) => {
  res.header({
    'Constent-Type': 'application/json'
  })
  res.status(200).send({ msg: "Hello, World!" })
})

app.get('/:id/stude-nt:sid', (req, res) => {
  console.log(req.query.name)
  const id = req.params
  console.log(id)
  res.header({ 'Content-Type': 'application/json' })
  res.status(200).send({ studentId: id })
})

app.get('/login', (req, res) => {
  const name = req.query.name
  const pass = req.query.pass
  console.log(name, pass)
  const accessToken = jwt.sign({ name, pass }, 'Pass@123')
  res.json({ accessToken })
})

function authenticateToken(req, res, next) {
  const authHeader = req.header['authorization']
  cosnttoken = authHeader && authHeader.split(' ')
  if (token === null) return res.sendStatus(401)
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(5000, (req, res) => {
  console.log("server is listening on port 5000....")
})