"use client";
import prisma from '@/lib/prisma';
import QuestionUI from '@/components/QuestionUI';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import QuestionUISkeleton from '@/components/QuestionUISkeleton';



const QuestionPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  console.log(slug);
  const { data: question, isLoading } = useQuery({
    queryKey: ["question",slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/question/${slug}`);
      return data;
    },
  });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  console.log("User",question);

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center p-2 bg-white border-b-2">
        <Button size="sm" className="h-9 gap-1">
          <Shuffle className="h-4 w-4" />
          <span>Pick random</span>
        </Button>
      </div>
      {
        isLoading ? (
          <QuestionUISkeleton />
        ) : (
          <QuestionUI question={question} />
        )

      }
      
    </div>
  );
};



export default QuestionPage;
