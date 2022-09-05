import Axios from "axios";
import 'dotenv/config'

const url =  process.env.API_URL

export const api =  Axios.create({
    baseURL: url
})