"use client";
import React, {  useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import MarkdownRenderer from '@/lib/MarkdownRenderer'
import { Input } from './ui/input';
import Select from './Select';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

//Create True/False options for the question
const TF = [
  {
    content: "True",
  },
  {
    content: "False",
  },
];



const QuestionUI = ({question,handleAttempt}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast()
  const [isMultiple, setIsMultiple] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  
  const checkIfSelectedIsCorrect = () => {
    if (!question || !question.options) {
      return false; // Safeguard against undefined question or options
    }
    if (isMultiple) {
      if (selectedOptions.length === 0) {
        return false; // No selection
      }

      return selectedOptions.every((index) => question.options[index].isCorrect);
    } else {
      if (selectedOption === null) {
        return false; // No selection
      }
      if(question.type === "TF"){

        return (question.isTrueFalse === !selectedOption);
      }

      if(question.type === "NUM"){
        return question.isnumerical === selectedOption;
      }
      
      return question.options[selectedOption].isCorrect;
    }
    
  };
  
  
  useEffect(() => {
    if (!question || !question.options) return;
    const correctOptionsCount = question.options.filter(option => option.isCorrect).length;
    if (correctOptionsCount > 1) {
      setIsMultiple(true);
    }
  }, [question]);

  const handleOptionChange = (content: number) => {
    if (isMultiple) {
      if (selectedOptions.includes(content)) {
        setSelectedOptions(selectedOptions.filter(option => option !== content));
      } else {
        setSelectedOptions([...selectedOptions, content]);
      }
    } else {
      setSelectedOption(content);
    }
  };
 
  const handleOnSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!session){
      router.push('/sign-in')
      return;
    }

    const isCorrect = checkIfSelectedIsCorrect();
    const attemptData = {
      questionId: question.id, // Replace with actual question ID
      userId: session?.user?.id, // Replace with actual user ID
      isCorrect: isCorrect,
      
    };
    if(isCorrect){
      toast({
        title: "Correct Answer",
        description: "Your answer was correct.",
      });
    }
    else{
      toast({
        title: "Incorrect Answer",
        description: "Try Next Time!",
        variant: "destructive",
    });
  }

  handleAttempt(attemptData);
    
  //  try{
  //     await axios.post('/api/attempts', attemptData)
  //    }
  // catch(error){
  //     console.log("Error", error)
  //   }



  }


  
  
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col bg-gray-100" id="fullscreen">
      {/* Navbar */}
      
      <div className="flex flex-wrap md:flex-row flex-1 p-4 bg-white  rounded-lg overflow-hidden  ">
        {/* Left side: Question */}
        {/* <form action=""></form> */}
        <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r ">
          <h1 className="text-2xl font-bold mb-4 ">Question</h1>
          <div className=" flex flex-wrap space-x-2 items-center my-3">
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ThumbsUp color="red" size={18} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Like</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ThumbsDown size={18} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dislike</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            <Badge variant={question.difficulty}>{question.difficulty}</Badge>
            <Badge
              variant="secondary"
            > 
              <span>Subject:</span>
              {question.subject}
            </Badge>
            <Badge
              variant="secondary"
            > 
              <span>Class:</span>
              {question.class}
            </Badge>
          </div>
          <div className='noselect'>
          <MarkdownRenderer content={question.content} />
          </div>

          
        </div>
        

        {/* Right side: Options */}
        <div className="w-full md:w-1/2 p-6 ">
            {/* MCQ */}
            { question.type === "MCQ" && (
              <form onSubmit={handleOnSubmit}>
              <h1 className="md:text-2xl font-bold mb-4">Options</h1>
              <div className="flex flex-col noselect">
                  <Select
                    options={question.options}
                    selectedOption={selectedOption}
                    selectedOptions={selectedOptions}
                    handleOptionChange={handleOptionChange}
                    isMultiple={isMultiple}
                  />
              </div>
              
              <Button  className="mt-4 " type="submit">
                Submit
              </Button>
            </form>)
            }
            {
              question.type === "NUM" && (
                <form  onSubmit={handleOnSubmit}>
                <h1 className="md:text-2xl font-bold mb-4">Numerical </h1>
                <Input type="number" step={0.01} placeholder="Enter your answer"  
                className='p-3 m-2  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                onChange={(e) => setSelectedOption(parseFloat(e.target.value))}
                />
                <Button  className="mt-4 " type="submit">
                Submit
                </Button>
                </form>
              )
            }
            {
              question.type === "TF" && (
                <form onSubmit={handleOnSubmit}>
                <h1 className="md:text-2xl font-bold mb-4">True/False </h1>
                <div className="flex flex-col space-y-2">
                  <Select
                    options={TF}
                    selectedOption={selectedOption}
                    selectedOptions={selectedOptions}
                    handleOptionChange={handleOptionChange}
                    isMultiple={isMultiple}
                  />
                </div>
                <Button  className="mt-4" type="submit">
                Submit
                </Button>

                </form>
              )
            }
        
       



        </div>
        <div className="flex flex-wrap md:flex-1 justify-between">
          {/* <div className={tags ? `` : `hidden`}> */}
            {/* <div className={tags ? `flex flex-wrap space-x-2 mt-4` : `hidden`}> */}
            {/* <div className={`flex flex-wrap space-x-2 mt-4`}>
              {question.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="mb-2">
                  {tag}
                </Badge>
              ))}
            </div> */}
          {/* </div> */}
        </div>
      </div>
      
    </div>
  )
}



export default QuestionUI