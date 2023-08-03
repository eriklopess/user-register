"use client"
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import User from '../services/User'
import { IUsersResponse } from '../interfaces/User'
import { useAuth } from '../store/useAuth'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import EditForm from './components/EditForm'

function Dashboard() {
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [name, setName] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [selected, setSelected] = React.useState<number>(0)
    const [showEdit, setShowEdit] = React.useState(false)
    const { logout, isLoggedIn } = useAuth()
    const navigation = useRouter()
    if (!isLoggedIn) navigation.push("/")

    const { data, isLoading, refetch } = useQuery<IUsersResponse>(["users", page, limit], async () => User.get(limit, page, name, email))

    useEffect(() => {
        refetch()
    }, [name, email])

    if (isLoading) {
        return <p>Carregando...</p>
    }

    const isSmallerThanTotalPages = data?.info && data.info.totalPages && page < data.info.totalPages

    const nextPage = () => {
        if (isSmallerThanTotalPages) {
            setPage((old) => old + 1)
        }
    }

    const previusPage = () => {
        if (page > 1) {
            setPage((old) => old - 1)
        }
    }

    const closeEdit = () => {
        setShowEdit(false)
        setSelected(0)
    }

    const deleteUser = async (id: number) => {
        const res = await User.delete(id)
        if (!res) {
            toast.success("Usuário deletado com sucesso!")
            refetch()
        }
    }

    const editUser = async (id: number) => {
        setShowEdit(true)
        setSelected(id)
    }


    return (
        <>
                <div className="flex justify-center items-center min:h-screen w-full bg-[#5F00DB] py-10">
                    {
                        showEdit && (
                            <EditForm id={selected} refetch={refetch} close={closeEdit} />
                        )
                    }
                    <div className="min-lg:w-[95%] bg-slate-200 border-0 rounded-xl p-10">
                        <table className="gap-10 w-full">
                            <thead>
                                {[
                                    "Nome",
                                    "Email",
                                    "Data de nascimento",
                                    "Editar",
                                    "Apagar"
                                ].map((item, index) => (
                                    <th key={index * 10} className="text-left p-2">
                                        {
                                            item
                                        }
                                    </th>))}
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input className="h-8 border-2 border-[#5F00DB] p-2" onChange={(e) => setName(e.target.value)} type="text" />
                                    </td>
                                    <td>
                                        <input className="h-8 border-2 border-[#5F00DB] p-2" onChange={(e) => setEmail(e.target.value)} type="text" />
                                    </td>
                                </tr>
                                {
                                    data?.data.map((user, index) => (
                                        <tr key={index} >
                                            <td className="p-2">{user.name}</td>
                                            <td className="p-2">{user.email}</td>
                                            <td className="p-2">{user.birthDate.split('T')[0].split('-').reverse().join('/')}</td>
                                            <td className="p-2"><button onClick={() => editUser(Number(user.id))}>Editar</button></td>
                                            <td className="p-2"><button onClick={() => deleteUser(Number(user.id))}>Apagar</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="flex gap-10">
                            <button onClick={() => navigation.push('/register')} className="mt-10 bg-green-600 p-4 rounded-lg text-white">Criar novo usuário</button>
                            <button onClick={logout} className="mt-10 bg-red-600 p-4 rounded-lg text-white">Sair</button>
                            <button onClick={previusPage} disabled={
                                page === 1
                            } className="mt-10 bg-blue-600 disabled:bg-slate-600 p-4 rounded-lg text-white">Página Anterior</button>
                            <button onClick={nextPage} disabled={
                                !isSmallerThanTotalPages
                            } className="mt-10 bg-blue-600 disabled:bg-slate-600 p-4 rounded-lg text-white">Proxima página</button>
                        </div>
                        <div className="flex flex-col mt-10 gap-3">
                            <label>Quantidade de dados: </label>
                            <select className="w-10" onChange={(e) => {
                                setLimit(Number(e.target.value))
                                setPage(1)
                            }}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>

                    </div>
                </div>
        </>
    )
}

export default Dashboard