import {Router} from 'express'
import { uploadFile } from './util/upload'
import { merger } from './util/VideoMerger'
export const routes =  Router()


const upload = uploadFile.array('videos',100)

routes.post('/upload',upload,async (req,res)=>{

    try{
        if(req.files){
            merger('public/input/')
            return res.download('')
        }else{
            return res.json('Arquivo não recebido')
        }
    }catch(err){
        return res.json(err)
    }
})
