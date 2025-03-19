console.log( "hello maam good morning")

import express from "express"; 
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

let rankk = 2;
let hightestNumber = 0;

app.post("/add-student", async (req, res) => {
    const { studentName, collegeName, round1Marks, round2Marks, round3Marks, technicalRoundMarks } = req.body;
    const totalMarks = round1Marks + round2Marks + round3Marks + technicalRoundMarks;
    const result = totalMarks >= 35 ? "Selected" : "Rejected";
    //rank logic 
    if(totalMarks >= hightestNumber){ 
        // console.log("I m inside the logic")
        if(rankk>1){rankk-=1;}
        hightestNumber = totalMarks;

        //Solution I wrote without googling , the issue came its updating only when the top rank updates
        //thought of another solution , find it on google after sir left the meeting(commented belwo )

        
        await prisma.student.updateMany({

            // orderBy: { totalMarks: "desc" }
            where : { 
                totalMarks : { 
                    lt : totalMarks
                }
            },

            data : { 
                rank : { 
                    increment : 1,
                }
            }
        })
        
    }
    else{ 
        rankk+=1;
    }
    const rank = rankk;

    
     
    const student = await prisma.student.create({
        data: { studentName, collegeName, round1Marks, round2Marks, round3Marks, technicalRoundMarks, totalMarks, result  }
    });
   

    //Solution I found by googling 
    //working properly


    // const students = await prisma.student.findMany({
    //     orderBy: { totalMarks: "desc" },
    //     select: { id: true }
    // });

    // // Update all students' ranks dynamically (one query per student)
    // for (let i = 0; i < students.length; i++) {
    //     await prisma.student.update({
    //         where: { id: students[i].id },
    //         data: { rank: i + 1 }
    //     });
    // }

});
// app.post("/updateRank" , async(req , res ) => {
   
// });

app.get("/students", async (req, res) => {
    const students = await prisma.student.findMany({
        orderBy: { totalMarks: "desc" }
    });

    res.json(students);
});

app.listen(3000);
