import multer from 'multer'



export const uploadFile =  multer({
    
    storage:multer.diskStorage({
        destination(req, file, callback) {

            callback(null,'src/public/input/')
            
        },
        
        filename(req, file, callback) {

            const fileName =  `${Date.now()} - ${file.originalname}`
            return callback(null,fileName)

        },
        
    })
})




