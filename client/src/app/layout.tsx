"use client"
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      <ToastContainer />
      </body>
    </html>
  )
}
