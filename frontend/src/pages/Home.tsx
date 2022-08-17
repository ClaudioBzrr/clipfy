import { CloudArrowUp, FileArrowUp, Trash, UploadSimple } from "phosphor-react"
import { FormEvent, useRef, useState} from "react"
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


  function handleSelectFile(fileList:FileList|null){
  
    if(fileList && fileList.length > 0){
      const aux  =  new Array()
      for (let index = 0; index < fileList.length; index++) {
        aux.push(fileList.item(index))
      }
      setFiles(fileList)
      setData(aux)
      setSelected(true)
    }
  }

  function handleClearFiles(e:Event){
    e.preventDefault()

    setFiles(null)
    setData([])
    setSelected(false)
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
                      className="w-96 h-10 font-bold text-slate-300 rounded-lg bg-gradient-to-r from-violet-900 to-violet-400 border-slate-300 border-[1px] flex flex-row  align-middle items-center justify-center"
                      onClick={e =>handleClick(e.nativeEvent)}
                    >
                      <FileArrowUp
                      className="mr-3"
                        size={32}
                      />
                      Escolher Arquivos
                    </button>
                    <input
                      ref={inputHidden}
                      className="hidden"
                      // onChangeCapture={() =>handleSelectFile()}
                      type="file"
                      accept="video/*"
                      required
                      multiple
                      onChange={e => handleSelectFile(e.currentTarget.files)}

                    />
                  </div>
                ):(
                  <div  className="flex flex-col">
                    <div className="flex felx-row">
                      <button 
                        type="submit"
                        className="w-96 h-10 font-bold text-slate-300 rounded-lg bg-gradient-to-r from-violet-900 to-violet-400 border-slate-300 border-[1px] flex flex-row align-middle items-center justify-center"
                      >
                        <UploadSimple
                          className="mr-3" 
                          size={32}
                        />
                        Enviar
                      </button>
                      <button
                        className="w-auto h-auto p-2 ml-2 bg-red-700 rounded-lg border-slate-300 border-[1px] border-solid text-slate-300 " 
                        type="button"
                      >
                        <Trash
                          onClick={e => handleClearFiles(e.nativeEvent)}
                          size={24}
                        />
                      </button>

                    </div>
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

