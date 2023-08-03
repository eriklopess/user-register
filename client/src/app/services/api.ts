import axios from "axios";
import { SERVER_URL } from "../enviroment";

export const api = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    },    
});