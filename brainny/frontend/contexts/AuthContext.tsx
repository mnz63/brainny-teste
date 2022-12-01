import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { recoverUserInformation } from "../services/auth";
import { api } from "../services/api";
import { toast } from "react-toastify"

type SignInData = {
    email: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: any;
    signIn: (data: SignInData) => Promise<void>
    error: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children} : any){

    const [user, setUser] = useState('')
    const isAuthenticated = !!user;
    const [error, setError] = useState(false)

    useEffect(()=>{
        const { 'brainny.token' : token } = parseCookies()

        if(token){
            recoverUserInformation(token).then(res => setUser(res))
        }

    },[])


    async function signIn({ email, password } : SignInData) : Promise<any>{
        const signInRequest = await fetch('http://localhost:3001/auth/login', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    credentials: 'include',
                                    body: JSON.stringify({
                                        email,
                                        password
                                    })
                                }).then(res => res.json())

        const data = signInRequest.access_token
        const token = data

        setCookie(undefined, 'brainny.token', token,{
            maxAge: 60 * 60 //1 hour 
        })

        if(!token){
            console.error('not access_token')
            return toast.error("Usuário ou senha incorretos!")
        }

        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        
        Router.push('/admin')

        return toast.success("Bem vindo de volta!")

    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, error}}>
            {children}
        </AuthContext.Provider>
    )
}