import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";


// Skeleton for BasicProfile
function SkeletonBasicProfile() {
  return (
    <div className="p-3 w-full bg-white rounded-r-md border-r-2 border-b-2 md:rounded-none md:border-none">
      <div className="p-5 mb-5 h-[27.8px]">
        <Skeleton className="w-[100px] h-6" />
        <Skeleton className="w-[80px] h-6 float-right" />
      </div>
      <hr />
      <div className="p-5 flex">
        <Skeleton className="w-[80px] h-[80px] rounded-md" />
        <div className="flex flex-col ml-4 mr-1">
          <Skeleton className="w-[120px] h-6" />
          <Skeleton className="w-[80px] h-5 mt-2" />
          <Skeleton className="w-[60px] h-5 mt-2" />
        </div>
      </div>
    </div>
  );
}

// Skeleton for AdditionInfo
function SkeletonAdditionInfo() {
  return (
    <div className="flex flex-row w-full bg-white justify-center md:space-x-8 space-x-3">
      <div className="m-2 text-center">
        <Skeleton className="md:w-[60px] w-[50px] h-10" />
        <p className="text-gray-600 text-base font-thin leading-6">Solved Problems</p>
      </div>
      <Separator orientation="vertical" className="h-auto" />
      <div className="m-2 text-center">
        <Skeleton className="md:w-[60px] w-[50px] h-10" />
        <p className="text-gray-600 text-base font-thin leading-6">Streak</p>
      </div>
      <Separator orientation="vertical" className="h-auto" />
      <div className="m-2 text-center">
        <Skeleton className="md:w-[60px] w-[50px] h-10" />
        <p className="text-gray-600 text-base font-thin leading-6">Accuracy</p>
      </div>
    </div>
  );
}

// Skeleton for SubjectStats
function SkeletonSubjectStats() {
  return (
    <div className="w-full md:py-2">
      <div className="mx-auto aspect-square md:max-h-[170px] max-h-[100px] flex justify-center items-center">
        <Skeleton className="w-[100px] h-[100px] rounded-full" />
      </div>
      <div className="text-center">
        <Skeleton className="w-[120px] h-6 mx-auto" />
      </div>
    </div>
  );
}

// Full Profile Skeleton Page
export default function ProfileSkeleton() {
  return (
    <div className="md:min-w-[940px] max-w-full mx-auto my-5">
      <Card className="md:flex justify-center items-center m-1">
        <SkeletonBasicProfile />
        <Separator orientation="vertical" className="h-auto" />
        <SkeletonAdditionInfo />
      </Card>
      <Card className="flex mx-1 my-3">
        <SkeletonSubjectStats />
        <SkeletonSubjectStats />
        <SkeletonSubjectStats />
      </Card>
      <div className="w-full">
        {/* Add Skeleton for Calendar and ContributionBanner if needed */}
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[150px] w-full mt-4" />
      </div>
    </div>
  );
}
