import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const body = await req.json();
    const {questionId,userId,isCorrect,status } = body;
    console.log(questionId,isCorrect,status);
    try {
        const session = await getServerSession(authOptions);
        console.log(session);
        if(!session){
            return new Response("Unauthorized", { status: 401 });
        }
        const attempt = await prisma.attempt.create({
            data:{
                questionId,
                userId,
                isCorrect,
                status
            }
        });
        return new Response(JSON.stringify(attempt), { status: 200 });
        
    } catch (error) {
        console.log("[Attempt] :",error);
        return new Response("Internal Server Error", { status: 500 });
        
    }
}