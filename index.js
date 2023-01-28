const express =require("express");
const cors=require("cors");
const { Connection } = require("./Config/db");
const { QuizModel } = require("./models/QuizModel");
const app=express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const PORT=process.env.PORT || 8000;

app.post("/quiz", async(req,res)=>{
      const{category,type,difficulty,question,correct_answer,incorrect_answers}=req.body;
      const newquestion=new QuizModel({
        category:category,
        type:type,
        difficulty:difficulty,
        question:question,
        correct_answer:correct_answer,
        incorrect_answers:incorrect_answers
      })
      await newquestion.save();
      const out=await QuizModel.find({});
      res.send(out);
})

app.get("/quiz",async(req,res)=>{
    const {category,difficulty,limit}=req.query;
    console.log(category,difficulty,limit)
    const response=await QuizModel.find({category:category,difficulty:difficulty}).limit(limit);
    res.send(response);
})

app.listen(PORT,async()=>{
   try{
    await Connection;
    console.log("Connected to DATABASE");
   }
   catch(err){
    console.log("error in connectiong");
    console.log(err);
   }
   console.log(`Listenging to PORT ${PORT}`);
})