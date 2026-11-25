import express from "express";
import cors from "cors";
import { db } from "./prisma/db.ts";//if not .ts module not found

import b from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const secret = "123";
const app = express();

app.use(cors());//defn which runs
app.use(express.json());
app.use(cookieParser());

//write a func for auth and use in app.use 

app.post("/signup",async (req,res)=>{
    try{
        const { name , email , password } = req.body;
        //hash pswd 
        const hashPassword = await b.hash(password,10);

        await db.orm.public.User.create({
            name: name,
            email: email,
            password: hashPassword
        })
        //some token giving logic -> same as signin
        res.send("succesfully signed up!");
        return
    }catch(e){
        console.log(e.message);
    }
});
app.get("/signin",async (req,res)=>{
    try{
        const { email , password } = req.body;
        const userExist = await db.orm.public.User.where({email:email}).first();//not [] and fast + only one
        if(userExist){
            const passwordMatch = await b.compare(password,userExist.password);
            if(passwordMatch){
                const payload = { id: userExist.id, name: userExist.name, email: userExist.email };
                const token = jwt.sign(payload,secret,{ expiresIn: '24h' });;
                res.cookie("token",token,{ maxAge: 24*60*60*1000 });
                res.send(token);
            }else{
                res.send("invalid password !");
            }
        }else{
            res.send("user not found! signup");
        }
    }catch(e){
        console.log(e.message);
    }
    return
});

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
});
app.get("/habbits",async (req,res)=>{
    try{
        const data = await db.orm.public.Habbit.all();
        res.json(data);
        return
    }catch(e){
        console.log(e.message);
    }
});

app.post("/sharedhabbits",async (req,res)=>{
    try{
        const { url } = req.body;
        const data = await db.orm.public.SharedHabbit.create({
            url: url
        });
        res.json(data);
        return
    }catch(e){
        console.log(e.message);//not .getMessage()
    }
})
app.listen(8000, "0.0.0.0");//binding necessary if hosting -> function?