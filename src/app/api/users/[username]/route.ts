import prisma from "@/lib/prisma";


export async function GET(req: Request, {params} : { params: { username: string } }) {
    const {username} = params;

    try{
        const user = await prisma.user.findUnique({
            where: {
                username
            },
            include:{
                attempts:true
            },
        });

        if(!user){
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify(user), {status: 200});
            

    }
    catch(error){
        console.log("[User-Dynamic] :", error);
        return new Response("Internal Server Error", { status: 500 });
    }



}

