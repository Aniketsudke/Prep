import prisma from "@/lib/prisma"; // Prisma client import
import { pusherServer } from "@/lib/pusher";
import { QuestionProps } from "@/types";


export async function POST(req: Request) {
  
  const body = await req.json();
  const { user1Id,challengeId } = body
   
  const questions: QuestionProps[] = await prisma.$queryRaw<QuestionProps[]>`
  SELECT * FROM "Question"
  ORDER BY RANDOM()
  LIMIT 5
`;
    // Create a new challenge in the database
    try {
      const challenge = await prisma.challenge.create({
        data: {
          user1Id,
          challengeId,
          status: "PENDING",
          questions: {
              connect: questions.map((question) => ({ id: question.id })),
          },
        },
      });
  
      const challengeLink = `/challenge/${challenge.id}`;
      
      await pusherServer.trigger(`challenge-${challengeId}`, 'user-joined', {
        user1Id,
      });
      
      
  
      return Response.json({ challengeLink },{status:200});
      
    } catch (error) {
      return Response.json({ error: "Error creating challenge" },{status:500});
      
    }

    
 
}

// const questions = async () => {
//   try {
//     //pick 5 random questions
//     const questions = await prisma.question.findMany({
//       take: 5,
//       skip: Math.floor(Math.random() * 10),
//     });
//     return Response.json(questions,{
//       status: 200,
//     });

//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Error fetching questions" },{status:500});
//   }
// }
