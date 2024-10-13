import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ContributeFormProps } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
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
        const questionSet = questions.map((question) => {
          // const hasAttempt = question.attempts.length > 0;
          // const attemptStatus = hasAttempt ? question.attempts[0].status : 'UNSOLVED';
          //! This is a bug, it should be  
    
          return {
            id: question.id,
            slug: question.slug,
            difficulty: question.difficulty,
            topic: question.topic,
            subject: question.subject,
            class: question.class,
            accuracy: question.accuracy,
            Status: "UNSOLVED",
          };
        });
        return Response.json(questionSet, { status: 200 });
        
    } catch (error) {
        console.log("[Question] :",error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const formState: ContributeFormProps = body;
    try {
      if (
        !formState.slug ||
        !formState.questionType ||
        !formState.content ||
        !formState.difficulty ||
        !formState.subject ||
        !formState.std ||
        !formState.topicTitle 
      ) {
        return NextResponse.json({ error: "Missing required fields" });
      }
  
      const question = await prisma.question.create({
        data: {
          slug: formState.slug,
          type: formState.questionType,
          content: formState.content,
          difficulty: formState.difficulty,
          topic: formState.topicTitle,
          subject: formState.subject,
          class: formState.std,
          tag: formState.tag,
          isnumerical: formState.numericalAnswer,
          isTrueFalse: formState.isTrueFalse,
          options: {
            create: formState.options?.map((option) => ({
              content: option.content,
              isCorrect: option.isCorrect,
            })),
          },
          
          createdAt: new Date(),
        },
      });
      // console.log(question);
  
      if (!question) {
        return NextResponse.json({ error: "Failed to create question" });
      }
      return NextResponse.json({ message: "Question created successfully" });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: err });
    }
  }