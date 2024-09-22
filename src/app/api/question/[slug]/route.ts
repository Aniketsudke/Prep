import prisma from "@/lib/prisma";




export async function GET( req:Request,{params} : { params: { slug: string } }) {

    
    const { slug } = params;

    try {
        const question = await prisma.question.findUnique({
            where: {
                slug
            },
            include:{
                options:true,
            }
        });

        if (!question) {
            return new Response("Question not found", { status: 404 });
        }

        return new Response(JSON.stringify(question), { status: 200 });
        
    } catch (error) {
        console.log("[Question-Dynamic] :", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}