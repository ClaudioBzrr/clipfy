import 'dotenv/config'
import Express from 'express'
import cors from 'cors'
import { routes } from './routes'
import path from 'path'
const port =  process.env.SERVER_PORT
const server =  Express()

server.use(cors())
server.use(routes)
server.use('/src/public/output/',Express.static(path.join(__dirname,'/src/public/output/')))



server.listen(port || process.env.port,()=>{
    console.log(`Server running on port ${port} or ${process.env.port}`)
})








