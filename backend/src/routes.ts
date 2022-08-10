import {Router} from 'express'
import { uploadFile } from './util/upload'
import { merger } from './util/VideoMerger'
import path from 'path'

export const routes =  Router()


const upload = uploadFile.array('videos',100)


routes.get('/download/:file',(req,res)=>{
    const {file} =  req.params

    const filename = `${path.join(__dirname,`/public/output/${file}.mp4`)}`
    console.log(filename)

    return res.download(filename)
})


routes.post('/upload',upload,async (req,res)=>{

    try{
        if(req.files){
            const name = await merger('./src/public/input/')

            return res.json(name)

        }else{
            return res.json('Arquivo não recebido')
        }
    }catch(err){
        return res.json(err)
    }
})

