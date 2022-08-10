import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
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
  const [selected,setSelected] = useState<boolean>(false)
  const [download,setDownload] =  useState<string>('')
  const [loading,setLoading] =  useState<boolean>(false)


  async function handleSendVideo(e:FormEvent){
    console.log('Sending files...')
    e.preventDefault()
    const formData = new FormData()


    for(let i=0;i<=files.length;i++){
        formData.append('videos',files[i])
    }
    
    try{
      
      const file = await api.post('/upload',formData).then(response => response.data)
      setDownload(`${api.getUri()}/download/${file}`)

    }catch(err){
      alert(`Erro : ${err}`)
    }
  }
  return (
    <div className="w-auto h-screen flex flex-col items-center justify-center text-center">
        {
          !loading&&(

           download != '' ? (
            <a href={download} type="download" target='__blank'>Download</a>
           ):
            <form
              className="max-w-3xl h-72 bg-slate-700 flex flex-row" 
              onSubmit={e => handleSendVideo(e)} 
              encType="multipart/form-data"
            >
              <label htmlFor="videos">Selecione os arquivos</label>
              <input
                onChangeCapture={() =>setSelected(true)}  
                type="file" name="videos"
                required multiple onChange={e => setFiles(e.target.files)}
              />
              {
                selected &&(

                  <button type="submit" >Enviar</button>

                )
              }
            </form>
          )
        }
    </div>
  )
}

