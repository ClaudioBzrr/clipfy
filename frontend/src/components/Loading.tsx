import { ArrowClockwise } from "phosphor-react";


export function Loading(){
    return(
        <div className="w-full h-screen bg-slate-700 flex flex-column items-center justify-center text-slate-300 font-semibold text-2xl">
            <div className="w-full h-full flex flex-row justify-center items-center">
                <ArrowClockwise className="mr-2 animate-spin" size={40} />Carregando... 
            </div>
        </div>
    )
}