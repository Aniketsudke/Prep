import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import path as necessary

const QuestionUISkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100" id="fullscreen">
      {/* Navbar */}
      

      <div className="flex flex-wrap md:flex-row flex-1 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side: Question */}
        <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r">
          <h1 className="text-2xl font-bold mb-4">
            <Skeleton className="h-8 w-32" /> {/* Skeleton for question title */}
          </h1>
          <div className="flex flex-wrap space-x-2 items-center my-3">
            <Skeleton className="h-6 w-16" /> {/* Skeleton for difficulty badge */}
            <Skeleton className="h-6 w-32" /> {/* Skeleton for subject badge */}
            <Skeleton className="h-6 w-24" /> {/* Skeleton for class badge */}
          </div>
          <Skeleton className="h-52 w-full" /> {/* Skeleton for question content */}
        </div>

        {/* Right side: Options */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold mb-4">
            <Skeleton className="h-10 w-24" /> {/* Skeleton for options title */}
          </h1>
          <div className="flex flex-col noselect space-y-2">
            <Skeleton className="h-10 w-full" /> {/* Skeleton for select options */}
            <Skeleton className="h-10 w-full" /> {/* Skeleton for select options */}
            <Skeleton className="h-10 w-full" /> {/* Skeleton for select options */}
            <Skeleton className="h-10 w-full" /> {/* Skeleton for select options */}
          </div>
          <Skeleton className="mt-4 h-10 w-20" /> {/* Skeleton for submit button */}
        </div>
      </div>
    </div>
  );
};

export default QuestionUISkeleton;
