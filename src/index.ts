import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import { Server as SocketIOServer } from 'socket.io'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import cors from 'cors'

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/api/v5', globalRouter)

const server = createServer(app)

// Setup socket.io
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Replace '*' with your frontend URL if necessary
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  // Example event listener
  socket.on('message', (msg) => {
    console.log('message: ' + msg)
    // Broadcast the message to all connected clients
    io.emit('message', msg)
  })
})

server.listen(5000, () => {
  console.log('server running at http://localhost:5000/api/v5')
})
