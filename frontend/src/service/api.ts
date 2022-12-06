import Axios from "axios";
import 'dotenv/config'

const url =  import.meta.env.API_URL

export const api =  Axios.create({
    baseURL: url
})