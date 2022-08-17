import { Error404 } from "./pages/Errors/404";
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
        component:<Home/>
    },
    {
        path:'*',
        component:<Error404/>
    }
]