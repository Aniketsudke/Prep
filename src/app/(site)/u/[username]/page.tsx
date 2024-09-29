"use client";
import AdditionInfo from "@/components/profile/AdditionInfo";
import BasicProfile from "@/components/profile/BasicProfile";
import Calender from "@/components/profile/Calender";
import ContributionBanner from "@/components/profile/Contribute";
// import { STProblemSolved } from "@/test/STProblemSolved";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import SubjectStats from "@/components/profile/SubjectStats";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";

const UserProfile = ({ params }: { params: { username: string } }) => {
  const { username } = params;


  

  const { data: user, isLoading:userLoading,error:userError } = useQuery({
    queryKey: ["user",username],
    queryFn: async () => {
      const { data } = await axios.get(`/api/users/${username}`);
      return data;
    },
  });

  //! Fetching subject info [Not working]
  // const { data: subjectInfo, isLoading:subjectLoading,error:subjectError } = useQuery({
  //   queryKey: ["SubjectInfo",username],
  //   queryFn: async () => {
  //     const { data } = await axios.get(`/api/users/${username}/subjectInfo`);
  //     return data;
  //   },
  // });

if (userLoading ) {
  return <ProfileSkeleton />;  
}

if (userError ) {
  return <div>Error loading user data</div>; // Show error message
}

//! Fetching subject info [Not working]
// const subjectStats = subjectInfo.reduce((acc, attempt) => {
//   const subject = attempt.question.subject;

//   // Initialize subject in acc if not present
//   if (!acc[subject]) {
//     acc[subject] = { totalQuestions: 0, solvedQuestions: 0 };
//   }

//   // Increment total questions for the subject
//   acc[subject].totalQuestions += 1;

//   // If the attempt was correct, increment solved questions
//   if (attempt.isCorrect) {
//     acc[subject].solvedQuestions += 1;
//   }

//   return acc;
// }, {});

  


  return (
    <>
      <div className="md:min-w-[940px] max-w- mx-auto  my-5  ">
        <Card className="md:flex  justify-center items-center m-1 ">
          <BasicProfile />
          <Separator orientation="vertical" className="h-auto" />
          <AdditionInfo attempts={user.attempts} totalQuestion={8000} />
        </Card>
        <Card className="flex mx-1 my-3 ">
          <SubjectStats
            subject="Physics"
            color="blue"
            totalQuestions={243}
            solvedQuestions={243}
          />
          <SubjectStats
            subject="Chemistry"
            color="green"
            totalQuestions={1742}
            solvedQuestions={682}
          />
          <SubjectStats
            subject="Mathematics"
            color="orange"
            totalQuestions={1742}
            solvedQuestions={976}
          />
        </Card>
        <div className="w-full">
          <Calender attempts={user.attempts} />
          <ContributionBanner />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
