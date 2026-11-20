import express from "express";
import { db } from "./prisma/db.ts";//if not .ts module not found

const app = express();

app.post("/habbit",async (req,res)=>{
    try{
        const data = await db.orm.public.Habbit.create({
            name : "new habbit"
        });
        res.json(data);
    }catch(e){
        console.log(e.message);//not .getMessage()
    }
})

app.listen(8000);