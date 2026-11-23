import express from "express";
import cors from "cors";
import { db } from "./prisma/db.ts";//if not .ts module not found

const app = express();

app.use(cors());//defn which runs
app.use(express.json());

app.post("/habbit",async (req,res)=>{
    try{
        const { name } = req.body;//need req {name: }
        console.log(name);
        const data = await db.orm.public.Habbit.create({
            name : name
        });
        res.json(data);
        return
    }catch(e){
        console.log(e.message);//not .getMessage()
    }
})
app.get("/habbits",async (req,res)=>{
    try{
        const data = await db.orm.public.Habbit.all();
        res.json(data);
        return
    }catch(e){
        console.log(e.message);
    }
})

app.listen(8000);