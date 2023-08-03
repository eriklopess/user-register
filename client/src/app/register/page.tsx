"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateUserFormData, createUserFormSchema } from '../schemas/createUser.schema';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import User from '../services/User';

function Register() {
    const navigator = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    });

    const onSubmit = async (data: CreateUserFormData) => {
        const birthDate = new Date(data.birthDate)
        const today = new Date()
        if (birthDate > today) {
            toast.error("Data de nascimento inválida")
            return
        }

        const res = await User.create(data)
        if (res) {
            if (res.error) {
                toast.error(res.error.message)
                return
            }

            toast.success("Usuário criado com sucesso!")
            navigator.push("/")
            return
        }
    };
    return (
        <main className="flex min-h-screen flex-col items-center gap-20 p-24">
            <Image src="https://meuguru.net/_next/static/media/logo.3a6dee38.svg" alt="logo" width={250} height={250} />

            <div className="max-md:w-[400px] w-[600px] bg-slate-200 rounded-xl p-10">
                <h1 className="text-2xl font-bold">Fazer cadastro</h1>

                <div className="flex flex-col h-full flex-1 mt-8 gap-8">
                    <div>
                        <label className="text-lg block">Nome</label>
                        <input type="text" {...register('name')} name="name" className={`border-2 ${errors.name ? "border-red-500" : "border-gray-400"} rounded-md p-4 h-12 w-full`} />
                        {
                            errors.name && <span className="text-red-500">{errors.name.message}</span>
                        }
                    </div>
                    <div>
                        <label className="text-lg block">Email</label>
                        <input type="text"  {...register('email')} name="email" className={`border-2 ${errors.email ? "border-red-500" : "border-gray-400"} rounded-md p-4 h-12 w-full`} />
                        {
                            errors.email && <span className="text-red-500">{errors.email.message}</span>
                        }
                    </div>
                    <div>
                        <label className="text-lg block">Senha</label>
                        <input type="password" {...register('password')} name="password" className={`border-2 ${errors.password ? "border-red-500" : "border-gray-400"} rounded-md p-4 h-12 w-full`} />
                        {
                            errors.password && <span className="text-red-500">{errors.password.message}</span>
                        }
                    </div>
                    <div>
                        <label className="text-lg block">Data de nascimento</label>
                        <input type="date" {...register('birthDate')} name="birthDate" className={`border-2 ${errors.birthDate ? "border-red-500" : "border-gray-400"} rounded-md p-4 h-12 w-full`} />
                        {
                            errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>
                        }
                    </div>
                    <button onClick={handleSubmit(onSubmit)} className="bg-[#5F00DB] text-white font-bold py-2 px-4 rounded-full ">
                        Confirmar cadastro
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Register