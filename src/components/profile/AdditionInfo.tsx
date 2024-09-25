import { Separator } from "@/components/ui/separator";
import { Flame } from "lucide-react";
import React from "react";

const AdditionInfo = () => {
  return (
    <>
      <div className="flex flex-row w-full bg-white justify-center md:space-x-8 space-x-3 ">
        <div className="m-2 text-center">
          <h3 className="md:text-4xl text-3xl font-bold ">
            1080
            <span className="text-xs ">/ 5000</span>
          </h3>
          <p className="text-gray-600 text-base font-thin leading-6  ">
            Solved Problems
          </p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="m-2 text-center">
          <h3 className="md:text-4xl text-3xl font-bold flex justify-center items-center text-red-500">
            10 <Flame color="red" fill="red" />
          </h3>
          <p className="text-gray-600 text-base font-thin leading-6">Streak</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="m-2 text-center">
          <h3 className="md:text-4xl text-3xl font-bold ">
            77.63
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
