"use client"; 
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const  InviteFriend = () => {
  const challengeId = uuidv4();
  const router = useRouter();
  const { data: session,status } = useSession();
  
  const [challengeLink] = useState<string>(`${window.location.origin}/challenge/${challengeId}`);

  

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirect to the sign-in page if the user is not logged in
      router.push('/sign-in');
    }
  }, [status && router && session]);

  if(status === 'loading') return null;
  
  


 

  const handleCopy = () => {
    navigator.clipboard.writeText(challengeLink);
  }

  const handleInvite = async () => {
    const res = await axios.post("/api/challenge/invite", { user1Id: session.user.id,challengeId, questions: [] });
    // setIsOpen(true);
    if (res.status === 200) {
      router.push(`/challenge/${challengeId}`);
      
      return;
    }
      router.push(`/challenge`);
      return;
  };
  
  // open={isOpen} onOpenChange={setIsOpen}

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="relative bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 overflow-hidden group"
        
        >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 transform -translate-x-full group-hover:translate-x-full"></span>
                <span className="relative z-10">Invite a Friend</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white" >
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={challengeLink}
              
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3"
          onClick={handleCopy}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-between gap-2">
          <DialogClose asChild>
            <Button type="button" >
              Close
            </Button>
          </DialogClose>
          <Button type="submit" 
          onClick={()=>handleInvite()} >
                Start Challenge
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default InviteFriend