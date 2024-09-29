import { Separator } from "@/components/ui/separator";
import { Attempt } from "@/types";
import { Flame } from "lucide-react";
import React from "react";

interface AdditionInfoProps {
  attempts: Attempt[];
  totalQuestion: number;
}





const calculateStreak = (attempts: Attempt[]): number => {
  const today = new Date();
  const dateMap: Record<string, boolean> = {}; // Map to track solved days

  // Populate the dateMap with solved days
  attempts.forEach(attempt => {
    const date = new Date(attempt.solvedAt).toISOString().split('T')[0]; // Get only the date part
    if (attempt.isCorrect) {
      dateMap[date] = true; // Mark the day as solved
    }
  });

  // Check for consecutive days starting from today
  let streak = 0;
  let currentDate = new Date(today); // Use a new Date object to avoid mutating today

  // Loop through the dates until a break in the streak is found
  while (dateMap[currentDate.toISOString().split('T')[0]]) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
  }

  return streak; // Return the length of the streak
};


const AdditionInfo = ({attempts,totalQuestion}:AdditionInfoProps) => {
  const totalAttempts = attempts.length;
  const totalSolved = attempts.filter(attempt => attempt.isCorrect).length;
  const accuracy = ((totalSolved / totalAttempts) * 100).toFixed(2);
  const streak = calculateStreak(attempts);
  // const streak = 0;

  return (
    <>
      <div className="flex flex-row w-full bg-white justify-center md:space-x-8 space-x-3 ">
        <div className="m-2 text-center">
          <h3 className="md:text-4xl text-3xl font-bold ">
            {totalSolved}
            <span className="text-xs ">/ {totalQuestion}</span>
          </h3>
          <p className="text-gray-600 text-base font-thin leading-6  ">
            Solved Problems
          </p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="m-2 text-center">
          <h3 className="md:text-4xl text-3xl font-bold flex justify-center items-center text-red-500">
            {streak} <Flame color="red" fill="red" />
          </h3>
          <p className="text-gray-600 text-base font-thin leading-6">Streak</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="m-2 text-center">
          <h3 className="md:text-4xl text-3xl font-bold ">
            {accuracy}
            <span className="text-base ">%</span>
          </h3>
          <p className="text-gray-600 text-base font-thin  leading-6">
            Accurcy
          </p>
        </div>
      </div>
    </>
  );
};

export default AdditionInfo;
