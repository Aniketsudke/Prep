import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req:Request){
    const body = await req.json();
    const {questionId,userId,isCorrect } = body;
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return new Response("Unauthorized", { status: 401 });
        }
        const attempt = await prisma.attempt.create({
            data:{
                questionId,
                userId,
                isCorrect,
                
            }
        });
        return new Response(JSON.stringify(attempt), { status: 200 });
        
    } catch (error) {
        console.log("[Attempt] :",error);
        return new Response("Internal Server Error", { status: 500 });
        
    }
}