import prisma from "@/lib/prisma";


export async function GET( req: Request,{params} : { params: { username: string } }){
    const {username} = params;
    if(!username){
        return new Response("Username is required", {status: 400});
    }
    try {
        const attempts = await prisma.attempt.findMany({
            where: {
              user: {
                username: username,
              },
            },
            select: {
              isCorrect: true,
              question: {
                select: {
                  subject: true,
                },
              },
            },
          });
          return new Response(JSON.stringify(attempts), {status: 200});
          
    } catch (error) {
        console.log("[User-Dynamic] :", error);
        return new Response("Internal Server Error", { status: 500 });
        
    }
}