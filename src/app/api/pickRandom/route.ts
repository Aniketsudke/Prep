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
        
        
    } catch (error) {
        console.log("[Pick Random] :",error);
        return new Response("Internal Server Error", { status: 500 });
    }
}