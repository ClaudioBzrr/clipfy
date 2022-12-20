import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
const ffmpegpath =  require('@ffmpeg-installer/ffmpeg').path
const ffprobePath =  require('@ffprobe-installer/ffprobe').path
import { v4  as idGenerator} from 'uuid'

ffmpeg.setFfmpegPath(ffmpegpath)
ffmpeg.setFfprobePath(ffprobePath)

const new_id = idGenerator()

export async function merger(path:string):Promise<string>{
    
    const mergedVideo =  ffmpeg()

    
    return new Promise<string>((reject, resolve)=>{
        const filenameModified = `${new_id}`
        const named =  `./src/public/output/${filenameModified}.mp4`
        const videos =  fs.readdirSync(path)
        
        videos.forEach(e => mergedVideo.addInput(path+e))
        mergedVideo.mergeToFile(named)
        .on('progress', progress =>{
            if(progress){
                // if(progress.percent){

                    console.log(`Rendering ${progress.percent.toFixed(0)}%`)
                // }
            }
        })
        .on('error',err => {
            console.log('Error : ',err)
    
        })
        .on('end',() =>{
            console.log('Merged videos successfull')
            videos.forEach(e => fs.unlinkSync(path+e))
            return resolve(filenameModified)
        })
        
    })

    
}


