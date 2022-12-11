import Axios from "axios";

const url =  import.meta.env.VITE_API_URL

export const api =  Axios.create({
    baseURL: url
})