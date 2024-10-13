import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string
        username?: string
        createdAt?: string
        Role?: String
        
    }
    interface Session {
        user: {
            id: string
            username?: string
            createdAt?: DateTime
            Role?: String
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        username?: string
        createdAt?: string
        Role?: String
    }
}