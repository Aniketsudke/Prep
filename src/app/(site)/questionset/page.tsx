"use client";
import {  Search, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SelectFilter from "@/components/SelectFilter";
import {  useCallback, useState } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { QTableRow } from "@/components/questions/QTableRow"; 
import { QTableRowSkeleton } from "@/components/questions/QTableRowSkeleton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { QuestionTableProps } from "@/types";
import { Pagination } from "@/components/ui/pagination";
import PaginationCom from "@/components/PaginationCom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";





const Questionset = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();


  const [tabSubject, setTabSubject] = useState(searchParams.get('subject') || "");
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || "");
  const [search, setSearch] = useState(searchParams.get('q') || "");
  const [status, setStatus] = useState(searchParams.get('status') || "");
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 10;

  const updateUrlParams = (key: string, value: string | undefined) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    router.replace(`${pathname}?${newParams.toString()}`);
  };

  const handleFilterChange = (
    value: string[],
    setter: React.Dispatch<React.SetStateAction<string>>,
    paramName: string
  ) => {
    if (value[0] === "Default") {
      setter(""); // Clear the state
      updateUrlParams(paramName, undefined); // Remove from URL
      return;
    }
    setter(value[0]); // Set the state to the new value
    updateUrlParams(paramName, value[0]); // Update the URL with the new value
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    // debouncedSearch(value);
  };

  const handleDifficulty = (value: string[]) => {
    if(value[0] === "Default"){
      setDifficulty("");
      return;
    }
    setDifficulty(value[0]);
  };
  const handleStatus = (value: string[]) => {
    if(value[0] === "Default"){
      setStatus("");
      return;
    }
    setStatus(value[0]);
  };

  console.log(tabSubject, difficulty, search, status);



  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const { data } = await axios.get("/api/question");
      return data;
    },
  });

  // console.log(questions);

  
    return (
        <>
          {/* <div className="flex min-h-screen w-full flex-col bg-muted/40"> */}
    
          <div className="flex flex-col sm:gap-2 sm:py-4 mx-1   ">
            {/* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 "> */}
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
              <Tabs defaultValue="all">
                <div className="grid md:flex items-center ">
                  <TabsList>
                    <TabsTrigger
                      value="all"
                      onClick={() => {
                        setTabSubject("");
                      }}
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="Mathematics"
                      onClick={() => {
                        setTabSubject("Mathematics");
                      }}
                    >
                      Mathematics
                    </TabsTrigger>
                    <TabsTrigger
                      value="Physics"
                      onClick={() => {
                        setTabSubject("Physics");
                      }}
                    >
                      Physics
                    </TabsTrigger>
                    <TabsTrigger
                      value="Chemistry"
                      onClick={() => {
                        setTabSubject("Chemistry");
                      }}
                    >
                      Chemistry
                    </TabsTrigger>
                  </TabsList>
                  <div className="relative md:ml-7  flex-1 md:mr-2 my-2  md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full rounded-lg bg-background pl-8 h-9 md:w-[200px] lg:w-[320px]"
                    />
                  </div>
                  <div className="mr-auto flex items-center gap-2">
                    <SelectFilter
                      width={"[100px]"}
                      placeholder="Difficulty"
                      selectName={["Default","Easy", "Medium", "Hard"]}
                      onChange={handleDifficulty}
                    />
                    <SelectFilter
                      width={"[100px]"}
                      placeholder="Status"
                      selectName={["Default","Solved", "Unsolved", "Attempted"]}
                      onChange={handleStatus}
                    />
                    
                    
                    <Button size="sm" className="h-9 gap-1">
                      <Shuffle className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Pick random
                      </span>
                    </Button>
                  </div>
                </div>
                <TabsContent value={tabSubject || "all"}>
                  <Card x-chunk="dashboard-06-chunk-0" >
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Class</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Topic</TableHead>
                            <TableHead>Accurcy</TableHead>
                            <TableHead className="hidden md:table-cell">Subject</TableHead>
                            
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {questions
                            ? questions.map((question: QuestionTableProps) => {
                                return (
                                  <QTableRow
                                    key={question.id}
                                    problem={question}
                                  />
                                );
                              })
                            : Array.from({ length: 20 }).map((_, index) => (
                                <QTableRowSkeleton key={index} />
                              ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex flex-1">
                      <PaginationCom currentPage={currentPage}
        totalPages={Math.ceil(questions?.total / pageSize)}
        onPageChange={(page) => updateUrlParams('page', page.toString())} /> 
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
          {/* </div> */}
        </>
  )
}

export default Questionset