import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export async function POST(req:Request) {
    const body = await req.json();
    const { user2Id,challengeId } = body;
    const challenge = await prisma.challenge.findUnique({
        where: {
             challengeId
        },
    });
    console.log(challenge);
    // if (!challenge) {
    //     return Response.json({ msg: "Challenge not found" },{status:404});
    // }
    // if(challenge.user1Id && challenge.user2Id){
    //     return Response.json({ msg: 'This challenge already has two participants' },{status:403});
    // }
    // if(challenge.user1Id === user2Id){
    //     return Response.json({ msg: 'You cannot join your own challenge' },{status:403});
    // }
    // if (challenge.user2Id) {
    //     return Response.json({ msg: "Challenge already joined" },{status:400});
    // }
    const updatedChallenge = await prisma.challenge.update({
        where: {
             challengeId
        },
        data: {
            user2Id,
            status: "ACTIVE",
        },
    });
    console.log(updatedChallenge);

    await pusherServer.trigger(`challenge-${challengeId}`, 'user-joined', {
        user2Id,
      });
      await pusherServer.trigger(`challenge-${challengeId}`, 'challenge-started', {
        message: 'The challenge has started!',
        countdown: 3, // Start a 3-second countdown before the challenge begins
      });

    return Response.json({  msg: updatedChallenge },{status:200});

}