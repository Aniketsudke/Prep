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

const UserProfile = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const { data: user, isLoading } = useQuery({
    queryKey: ["user",username],
    queryFn: async () => {
      const { data } = await axios.get(`/api/users/${username}`);
      return data;
    },
  });
  console.log("User",user,isLoading);


  return (
    <>
      <div className="md:min-w-[940px] max-w- mx-auto  my-5  ">
        <Card className="md:flex  justify-center items-center m-1 ">
          <BasicProfile />
          <Separator orientation="vertical" className="h-auto" />
          <AdditionInfo />
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
          <Calender />
          <ContributionBanner />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
