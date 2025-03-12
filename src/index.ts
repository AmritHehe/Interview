console.log( "hello maam good morning")

import express from "express"; 
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.post("/add-student", async (req, res) => {
    const { studentName, collegeName, round1Marks, round2Marks, round3Marks, technicalRoundMarks } = req.body;
    const totalMarks = round1Marks + round2Marks + round3Marks + technicalRoundMarks;
    const result = totalMarks >= 35 ? "Selected" : "Rejected";
    
    const student = await prisma.student.create({
        data: { studentName, collegeName, round1Marks, round2Marks, round3Marks, technicalRoundMarks, totalMarks, result }
    });
    res.json(student);
});
app.get("/students", async (req, res) => {
    const students = await prisma.student.findMany({
        orderBy: { totalMarks: "desc" }
    });
    res.json(students);
});

app.listen(3000);