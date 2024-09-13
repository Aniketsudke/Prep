import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        _id?: string
        username?: string
        createdAt?: string
        
    }
    interface Session {
        user: {
            _id?: string
            username?: string
            createdAt?: DateTime
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string
        username?: string
        createdAt?: string
    }
}