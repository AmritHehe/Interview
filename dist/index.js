"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hello maam good morning");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let rankk = 2;
let hightestNumber = 0;
app.post("/add-student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentName, collegeName, round1Marks, round2Marks, round3Marks, technicalRoundMarks } = req.body;
    const totalMarks = round1Marks + round2Marks + round3Marks + technicalRoundMarks;
    const result = totalMarks >= 35 ? "Selected" : "Rejected";
    //rank logic 
    // if(totalMarks >= hightestNumber){ 
    //     // console.log("I m inside the logic")
    //     if(rankk>1){rankk-=1;}
    //     hightestNumber = totalMarks;
    // await prisma.student.upsert({ 
    //     where : { 
    //         rank : { 
    //             gt : rankk
    //         }
    //     },
    //     update : { 
    //         rank : { 
    //             increment : 1
    //         }
    //     }
    // })
    // await prisma.student.updateMany({
    //     // orderBy: { totalMarks: "desc" }
    //     where : { 
    //         totalMarks : { 
    //             lt : totalMarks
    //         }
    //     },
    //     data : { 
    //         rank : { 
    //             increment : 1,
    //         }
    //     }
    // })
    // }
    // else{ 
    //     rankk+=1;
    // }
    // const rank = rankk;
    //we can do one more thing , fetch data in desc order as we are doing and update rankings there 
    const student = yield prisma.student.create({
        data: { studentName, collegeName, round1Marks, round2Marks, round3Marks, technicalRoundMarks, totalMarks, result }
    });
    const students = yield prisma.student.findMany({
        orderBy: { totalMarks: "desc" },
        select: { id: true }
    });
    // Update all students' ranks dynamically (one query per student)
    for (let i = 0; i < students.length; i++) {
        yield prisma.student.update({
            where: { id: students[i].id },
            data: { rank: i + 1 }
        });
    }
}));
// app.post("/updateRank" , async(req , res ) => {
// });
app.get("/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield prisma.student.findMany({
        orderBy: { totalMarks: "desc" }
    });
    res.json(students);
}));
app.listen(3000);
