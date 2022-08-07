import { FormEvent, useState } from "react"
import { api } from "../service/api"


interface multerFilesProps{
  destination:string,
  encoding:string,
  fieldname:string,
  filename:string,
  mimetype:string,
  originalname:string,
  path:string,
  size:number
}

export function Home() {

  const [files,setFiles] =  useState<any>()



  async function handleSendVideo(e:FormEvent){
    console.log('Sending files...')
    e.preventDefault()
    const formData = new FormData()


    for(let i=0;i<=files.length;i++){
        formData.append('videos',files[i])
    }
    
    try{
      
      const resp:multerFilesProps[] = await api.post('/upload',formData).then(response => response.data)

      alert(resp)


    }catch(err){
      alert(`Erro : ${err}`)
    }
  }
  return (
    <div>
      <form onSubmit={e => handleSendVideo(e)} encType="multipart/form-data">
        <label htmlFor="videos">Select an file</label>
        <input type="file" name="videos" required multiple onChange={e => setFiles(e.target.files)} />
        <button type="submit" >Enviar</button>
      </form>
    </div>
  )
}

