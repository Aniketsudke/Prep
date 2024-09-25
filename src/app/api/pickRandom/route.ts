import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";


export async function GET(){
    const session = await getServerSession(authOptions);
    
    try {
        const questions = await prisma.question.findMany({
          include:{
            attempts: {
              where:{
                userId: session?.user?.id,
              }
            }
          }
        });
        if(questions.length === 0){
            return new Response("No questions found", { status: 404 });
        }
        const randomIndex = Math.floor(Math.random() * questions.length);
        return new Response(JSON.stringify(questions[randomIndex]), { status: 200 });
        
        
    } catch (error) {
        console.log("[Pick Random] :",error);
        return new Response("Internal Server Error", { status: 500 });
    }
}