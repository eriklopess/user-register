import { toast } from "react-toastify";
import { CreateUserFormData } from "../schemas/createUser.schema";
import { api } from "./api";
import { UpdateUserFormData } from "../schemas/updateUser.schema";

export default class User {
    static async login(email: string, password: string) {
        try {
            const response = await api.post("/users/login", {
                email,
                password,
            });

            return response.data;
        } catch (error) {
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

    static async update(data: CreateUserFormData) {
        try {
            const response = await api.put("/users", data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            const response = await api.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async get(limit: number, page: number, name: string = "", email: string = "") {
        try {
            const response = await api.get(`/users?limit=${limit}&page=${page}&name=${name}&email=${email}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async put(id: number, data: UpdateUserFormData) {
        try {
            const response = await api.put(`/users/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
} 