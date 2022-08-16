import { FormEvent, InputHTMLAttributes, useRef, useState} from "react"
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

interface dataProps{
  name:string,
  size:number,
  type:string
}


export function Home() {

  const inputHidden =  useRef<HTMLInputElement|null>(null)
  const [files,setFiles] =  useState<FileList | null>(null)
  const [selected,setSelected] = useState<boolean>(false)
  const [download,setDownload] =  useState<string>('')
  const [loading,setLoading] =  useState<boolean>(false)
  const [data,setData] =  useState<dataProps[]>([])



  function handleClick(e:Event){
    e.preventDefault()
    inputHidden.current && inputHidden.current?.click()
    
  }


  function handleSelectFile(){
    if(files && files.length > 0){
      const aux  =  new Array()
      for (let index = 0; index < files.length; index++) {
        aux.push(files.item(index))
      }
      setData(aux)
      setSelected(true)
    }
  }


  async function handleSendVideo(e:FormEvent){
    console.log('Sending files...')
    e.preventDefault()
    const formData = new FormData()

    if(files){
      for(let i=0;i<=files.length;i++){
          formData.append('videos',files[i])
      }
    }
    
    try{
      
      const file = await api.post('/upload',formData).then(response => response.data)
      setDownload(`${api.getUri()}/download/${file}`)

    }catch(err){
      alert(`Erro : ${err}`)
    }
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center">
        {
          !loading&&(

           download != '' ? (
            <a href={download} type="download" target='__blank'>Download</a>
           ):(

              <form
                className="w-full h-full bg-slate-700 flex flex-row items-center justify-center" 
                onSubmit={e => handleSendVideo(e)} 
                encType="multipart/form-data"
              >{

                selected ==false?(
                  <div>

                    <button
                      type="button"
                      className="w-96 rounded-sm border-solid p-2 border-black border-[1px] flex flex-col align-middle items-center justify-center"
                      onClick={e =>handleClick(e.nativeEvent)}
                    >
                      Escolher Arquivos
                    </button>
                    <input
                      ref={inputHidden}
                      className="hidden"
                      onChangeCapture={() =>handleSelectFile()}
                      type="file"
                      accept="video/*"
                      required
                      multiple
                      onChange={e => setFiles(e.currentTarget.files)}

                    />
                  </div>
                ):(
                  <div>
                    <button type="submit">Enviar</button>
                    {
                      data.map(({name},index)=>{
                        return(
                          <div key={index}>{name}</div>
                        )
                      })
                    }
                  </div>
                )

              }
              </form>
              )
           )
        }
    </div>
  )
}

