import { useState } from "react";
import { backendURL } from "./backend.jsx";

//if no default need {} for import 
export default function Signup(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const nameInputChange = (e)=>{
        setName(e.target.value);
    }
    const emailInputChange = (e)=>{
        setEmail(e.target.value);
    }
    const passwordInputChange = (e)=>{
        setPassword(e.target.value);
    }
    const createSubmit = async (e)=>{
        try{
            await fetch(`${backendURL}/signup`,{
                method: "POST",
                headers : { 'Content-Type': 'application/json'},
                body: JSON.stringify({ name: name , email:email , password:password }) 
            });
        }catch(e){
            console.log(e.message);
        }
    }
    const buttonStyle = { width: '200px', height: '50px', padding: '10px 20px' }
    return(
        <div>
            <label htmlFor="name">name:</label>
            <input type="text" placeholder="enter here" id="name" value={name} onChange={nameInputChange}/>
            <label htmlFor="email">email:</label>
            <input type="text" value={email} placeholder="enter here" id="email" onChange={emailInputChange}/>
            <label htmlFor="password">password:</label>
            <input type="text" value={password} placeholder="enter here" id="password" onChange={passwordInputChange}/>
            <button style={buttonStyle} onClick={createSubmit}>Sign Up!</button>
        </div>
    )
}