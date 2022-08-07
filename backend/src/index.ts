import 'dotenv/config'
import Express from 'express'
import cors from 'cors'
import { routes } from './routes'
import { uploadFile } from './util/upload'

const port =  process.env.SERVER_PORT
const server =  Express()

server.use(cors())
server.use(routes)
server.use(Express.static('/public/output/'))



server.listen(port || process.env.port,()=>{
    console.log(`Server running on port ${port} or ${process.env.port}`)
})








