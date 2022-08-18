import { ArrowLeft, DownloadSimple, FileArrowUp, Trash, UploadSimple } from "phosphor-react"
import { FormEvent, useRef, useState} from "react"
import { Loading } from "../components/Loading"
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

  function handleGoBack(e:Event){
    e.preventDefault()
    handleClearFiles(e)
    setDownload('')
  }


  function sumSize(arr:dataProps[]):number{
    const sizes = new Array()

    arr.forEach(e => sizes.push(e.size))

    return sizes.reduce((acu,cur) => acu+cur)
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
    setLoading(true)
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
    setLoading(false)
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center">
    <title>Clipfy</title>
        {
          !loading ?(

           download != '' ? (
            <div className="w-full h-full bg-slate-700 flex flex-row items-center justify-center" >

              <button
                type="button"
                className="rounded-full p-2 bg-slate-600 text-slate-300 mr-3"
                onClick={e => handleGoBack(e.nativeEvent)}
              >
                <ArrowLeft size={32} />
              </button>
              <a 
                className="w-96 h-10 font-bold text-slate-300 rounded-lg bg-gradient-to-r from-violet-900 to-violet-400 border-slate-300 border-[1px] flex flex-row  align-middle items-center justify-center"
                href={download} type="download" target='__blank'
              >
                <DownloadSimple className="mr-2" size={32} />
                Download</a>

            </div>
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
                        onClick={e => handleClearFiles(e.nativeEvent)}
                      >
                        <Trash
                          size={24}
                        />
                      </button>
                      <div className="text-slate-300 absolute ml-[calc(100vw*0.25)] text-center py-2 font-semibold">
                        {
                          `Total de ${(sumSize(data)/1024000).toFixed(1)} MB`  
                        }
                      </div>

                    </div>
                    <div className="bg-slate-800 w-full max-h-72 scrollbar-thin scrollbar-thumb-slate-300 mt-5 rounded-lg border-slate-300 border-[1px] border-solid overflow-y-auto">
                      {
                        data.map(({name,size},index)=>{
                          return(
                            <div
                              className="w-full py-2 text-slate-300 font-semibold border-b-[1px] border-b-slate-300" 
                              key={index}
                            >{name} - {(size/1024000).toFixed(1)} MB
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="text-slate-300  mt-3 font-semibold">
                      {
                        data.length >1 ? `${data.length} arquivos selecionados.`:`${data.length} arquivo selecionado.`
                      }
                    </div>
                  </div>
                )

              }
              </form>
              )
           ):(
            <Loading/>
           )
        }
    </div>
  )
}

