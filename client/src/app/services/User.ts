import { toast } from "react-toastify";
import { CreateUserFormData } from "../schemas/createUser.schema";
import { api } from "./api";

export default class User {
    static async login(email: string, password: string) {
        try {
            const response = await api.post("/users/login", {
                email,
                password,
            });

            return response.data;
        } catch (error) {
            console.error(error);
            toast.error("Usuário ou senha incorretos");
        }
    }

    static async create(data: CreateUserFormData) {
        try {
            const response = await api.post("/users", data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
} 