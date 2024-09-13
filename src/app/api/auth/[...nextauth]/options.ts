import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { Userprops } from "@/types";



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
                username:{label:'Email',type:'text'},
                password:{label:'Password',type:'password'}
            },
            async authorize(credentials:any):Promise<any>{
                console.log("credentials",credentials)
                try {
                    if (!credentials) {
                        throw new Error("Credentials not provided");
                      }
                  
                    const user = await prisma.user.findFirst({
                        where: {
                          OR: [
                            { email: credentials.email },
                            { username: credentials.email },
                          ],
                        },
                      });
                    if (!user) {
                        console.log("No user found");
                        throw new Error("No user found");
                    }

                    if(!user.password){
                        console.log("No password found");
                        throw new Error("No password found");
                    }
                    
                    const isPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isPassword) {
                        console.log("Password is incorrect");
                        throw new Error("Incorrect password");
                    }
                    return user;
                } catch (error:unknown) {
                    if (error instanceof Error) {
                        console.error("Error authorizing user:", error);
                        throw new Error( error.message  ||"Error authorizing user");

                    }
                }
            }
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
                                avatarUrl: user.image,
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
                token._id = user._id?.toString();
                token.username = user.username;
                token.email = user.email
                token.image = user.image


            }
            return token
          },
        async session({ session, token }) {
            if(token){
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            const userData = await prisma.user.findUnique({
                where: { email: session.user.email! },
              });;
            if(userData){
                session.user._id = userData.id?.toString();
                session.user.username = userData.username || session.user.username;
                session.user.image = userData.avatarUrl || session.user.image;
                session.user.createdAt = userData.createdAt;
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