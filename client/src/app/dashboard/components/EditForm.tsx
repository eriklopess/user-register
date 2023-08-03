import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateUserFormSchema, UpdateUserFormData } from '../../schemas/updateUser.schema';
import User from '../../services/User'
import { toast } from 'react-toastify';

type Props = {
    id: number
    close: () => void
    refetch: () => void
}

function EditForm({ id, close, refetch }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserFormSchema)
    });
    const handleEdit = async (userData: UpdateUserFormData) => {
        const body: UpdateUserFormData = {
            birthDate: userData.birthDate || undefined,
            email: userData.email || undefined,
            name: userData.name || undefined,
            password: userData.password || undefined,
            photoUrl: userData.photoUrl || undefined
        }
        try {

            const res = await User.put(id, body) as UpdateUserFormData & {
                error: {
                    message: string
                }
            }
            if (!res.error) {
                toast.success("Usuário editado com sucesso!")
                reset()
                refetch()
                return
            }
        } catch (err) {
            console.log(err)
            toast.error("Erro ao editar usuário!")
        }

    }
    return (
        <div className="w-[400px] h-[700px] bg-slate-300 absolute rounded-xl p-10 shadow-2xl border-2 border-[#5F00DB]">
            <h1 className="text-xl">Editar</h1>
            <div className="flex flex-col gap-4">
                <div>
                    <label className="font-bold">Imagem</label>
                    <input type="text" {...register('photoUrl')} name="photoUrl" className={`w-full p-2 rounded ${errors.photoUrl?.message ? "border-red-500" : "border-slate-600"}`} />
                    {
                        errors.photoUrl && <span className="text-red-500">{errors.photoUrl.message}</span>
                    }
                </div>
                <div>
                    <label className="font-bold">Name</label>
                    <input type="text" {...register('name')} name="name" className="w-full p-2 rounded" />
                    {
                        errors.name && <span className="text-red-500">{errors.name.message}</span>
                    }
                </div>

                <div>
                    <label className="font-bold">Email</label>
                    <input type="email" {...register('email')} name="email" className="w-full p-2 rounded" />
                    {
                        errors.email && <span className="text-red-500">{errors.email.message}</span>
                    }
                </div>
                <div>
                    <label className="font-bold">Senha</label>
                    <input type="password" {...register('password')} name="password" className="w-full p-2 rounded" />
                    {
                        errors.password && <span className="text-red-500">{errors.password.message}</span>
                    }
                </div>
                <div>
                    <label className="font-bold">Data de Nascimento</label>
                    <input type="date" {...register('birthDate')} name="birthDate" className="w-full p-2 rounded" />
                    {
                        errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>
                    }
                </div>
                <div>
                    <button className="w-full h-9 text-white rounded-lg bg-[#5F00DB] mt-6" onClick={handleSubmit(handleEdit)}>
                        Salvar
                    </button>
                    <button className="w-full h-9 rounded-lg border-2 border-[#5F00DB] mt-6" onClick={close}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditForm