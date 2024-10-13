import 'next-auth'
import { DefaultSession } from 'next-auth'


 
declare module 'next-auth' {
    interface User {
        id: string
        username?: string
        createdAt?: string
        Role?: "ADMIN" | "USER" | "INSTRUCTOR"
        
    }
    interface Session {
        user: {
            id: string
            username?: string
            createdAt?: DateTime
            Role?: "ADMIN" | "USER" | "INSTRUCTOR"
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        username?: string
        createdAt?: string
        Role?: "ADMIN" | "USER" | "INSTRUCTOR"
    }
}