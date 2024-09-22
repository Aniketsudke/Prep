import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
// import { Userprops } from "@/types";
// type CredentialsProps = {
//     email: string;
//     password: string;
//   };
  // "vercel-build": "prisma generate && next build"


export const authOptions: NextAuthOptions = {

    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials:{
                email:{label:'Email',type:'text'},
                password:{label:'Password',type:'password'}
            },
            async authorize(credentials) {
                
              if (!credentials?.email || !credentials?.password) {
                console.log("Missing username or password");
                return null;
              }
        
              const user = await prisma.user.findFirst({
                where: {
                  OR: [
                    { email: credentials.email },   
                    { username: credentials.email }
                  ],
                },
              });

                    if(!user){
                        console.log("User not found");
                        return null;
                    }

                    
        
                
        
                const passwordCorrect = await bcrypt.compare(
                  credentials.password,
                  user.password
                );
        
                if (!passwordCorrect) {
                   console.log("Password incorrect");
                  return null; 

                }
                return {
                  id: user?.id,
                  email: user?.email,
                  username: user?.username,
                  image: user?.avatar,
                };
        
                
              },
        })
    ],
    callbacks:{
        async signIn({ user}) {
        
            

            try {
                if (!user.email) {
                    console.log("User email is not available");
                    return false; 
                  }
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                  });

                    if (!existingUser) {
                        await prisma.user.create({
                            data: {
                                username: user.name!,
                                email: user.email!,
                                avatar: user.image,
                                provider: 'google',
                            },
                        });
                    }else{
                        
                        console.log("User already exists");

                    }

            } catch (error) {
                console.log(error);
                return false;
            }



            
      
            return true;
          },


        async jwt({ token, user }) {
            if(user){
                token.id = user.id.toString();
                token.username = user.username;
                token.email = user.email
                token.image = user.image
                token.isAdmin = user.isAdmin
            }
            return token
          },
        async session({ session, token }) {
            if(token){
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.isAdmin = token.isAdmin;
            }

            const userData = await prisma.user.findUnique({
                where: { email: session.user.email! },
              });
            if(userData){
                session.user.id = userData.id.toString();
                session.user.username = userData.username || session.user.username;
                session.user.image = userData.avatar || session.user.image;
                session.user.createdAt = userData.createdAt;
                session.user.isAdmin = userData.isAdmin;
            }
            return session
          },
          
    },
    pages:{
        signIn:'/sign-in',
        
    },
    session:{
        strategy:'jwt', 
    },
    secret:process.env.NEXTAUTH_SECRET,
    
}