"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUserFormData, loginUserFormSchema } from './schemas/loginUser.schema';
import { toast } from "react-toastify";
import User from './services/User';
import { useRouter } from 'next/navigation';
import { useAuth } from './store/useAuth';

export default function Home() {
  const navigator = useRouter()
  const { login, isLoggedIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema)
  });

  if (isLoggedIn) navigator.push("/dashboard")

  const onSubmit = async (data: LoginUserFormData) => {
    const res = await User.login(data.email, data.password)
    if (res) {
      toast.success("Login realizado com sucesso!")
      login(res.token, !!data.remember)
      navigator.push("/dashboard")
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
    <Image src="https://meuguru.net/_next/static/media/logo.3a6dee38.svg" alt="logo" width={250} height={250} />

      <div className="max-md:w-[400px] w-[600px] bg-slate-200 rounded-xl p-10">
        <h1 className="text-2xl font-bold">Fazer login</h1>

        <div className="flex flex-col h-full flex-1 mt-8 gap-8">
          <div>
            <label className="text-lg block">Email</label>
            <input {...register('email')} type="text" name="email" id="password" className={`border-2 ${errors.email ? "border-red-500" : "border-gray-400"} rounded-md p-4 h-12 w-full`} />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div>
            <label className="text-lg block">Senha</label>
            <input {...register('password')} type="password" name="password" id="password" className={`border-2 ${errors.password ? "border-red-500" : "border-gray-400"} rounded-md p-4 h-12 w-full`} />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" {...register('remember')} name="remember" className="border-2 border-gray-400 w-4 h-4" />
            <label className="text-lg block">Lembrar-me</label>
          </div>
          <button onClick={handleSubmit(onSubmit)} className="bg-[#5F00DB] text-white font-bold py-2 px-4 rounded-full ">
            Entrar
          </button>
          <Link href="/register" className="border-2 border-[#5F00DB] text-center font-bold py-2 px-4 rounded-full ">
            Fazer cadastro
          </Link>
        </div>
      </div>
    </main>
  );
}
