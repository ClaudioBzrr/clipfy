import { Home } from "./pages/Home";

export const routes =[
    {
        path:'/',
        component:<Home/>
    },
    {
        path:'/home',
        component:<Home/>
    },
    {
        path:'/',
        component:<></>
    },
    {
        path:'*',
        component:<></>
    }
]