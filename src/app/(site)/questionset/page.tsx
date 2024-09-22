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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SelectFilter from "@/components/SelectFilter";
import {  useState } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { QTableRow } from "@/components/questions/QTableRow"; 
import { QTableRowSkeleton } from "@/components/questions/QTableRowSkeleton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { QuestionTableProps } from "@/types";





const Questionset = () => {
  const [tabSubject, setTabSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  // const [topics, setTopics] = useState([]);
  // const [search, setSearch] = useState("");

  const handleDifficulty = (value: string[]) => {
    setDifficulty(value[0]);
  };
  console.log(difficulty);



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
    
          <div className="flex flex-col sm:gap-4 sm:py-4 mx-1  ">
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
                      selectName={["Easy", "Medium", "Hard"]}
                      onChange={handleDifficulty}
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
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Accurcy</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Subject</TableHead>
                            
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
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext href="#" />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
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