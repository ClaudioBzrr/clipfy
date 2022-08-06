import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'


const ffmpegpath =  require('@ffmpeg-installer/ffmpeg').path
const ffprobePath =  require('@ffprobe-installer/ffprobe').path


ffmpeg.setFfmpegPath(ffmpegpath)
ffmpeg.setFfprobePath(ffprobePath)

async function listVideos(path:string){
    
    
    const mergedVideo =  ffmpeg()

    const videos =  fs.readdirSync(path)

    videos.forEach(e => mergedVideo.addInput(path+e))
    mergedVideo.mergeToFile('teste1.mp4')
    .on('error',err => console.log('Error : ',err))
    .on('end',() =>console.log('Merged videos successfull'))

    
}




listVideos("D:\\Jogadas\\Outplayed\\Valorant\\Valorant_08-06-2022_14-19-37-134\\")
