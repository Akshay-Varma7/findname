// import { Outlet } from "react-router-dom";
import { useState , useEffect } from "react";
import { useMainContext } from "./Context";

export default function HabbitLayout(){
    const { habbit , setHabbit , habbits , setHabbits} = useMainContext();
    //local state
    const [newHabbit,setNewHabbit] = useState("");

    const createInputChange = (e)=>{
        setNewHabbit(e.target.value);//target is input(that trigered this event)
    }
    const createSubmit = async ()=>{ //add spinners + later some pop up to fill
        try{
            const response = await fetch("http://localhost:8000/habbit",{//from res.json -> application/json
                method: "POST",
                headers : { 'Content-Type': 'application/json'},
                body : JSON.stringify({ 'name' : newHabbit })
            })
            if(!response.ok){
                new Error("what is the error?");
            }

            setNewHabbit("");
            const fResponse = await response.json();//from bytes?
            setHabbits([...habbits,fResponse]);
            console.log(fResponse);//
        }catch(e){
            console.log(e.message);
        }
    }

    useEffect(()=>{
        async function getHabbits(){
            try{
                const response = await fetch("http://localhost:8000/habbits",{//not mandatory
                    method: "GET",
                    headers : { 'Content-Type': 'application/json'}//no body as of now
                })
                if(!response.ok){
                    new Error("what is the error?");
                }

                const fResponse = await response.json();//from bytes?
                setHabbits(fResponse);
                console.log(fResponse);//
            }catch(e){
                console.log(e.message);
            }
        }
        getHabbits();
    },habbits);//as one no []

    return(
        <div>  
            <aside>
                <div>
                    <input type="text" value={newHabbit} onChange={createInputChange}/>
                    <button onClick={createSubmit}>Start Habbit</button>
                </div>
                <ul>
                    {habbits.map((h)=> (<li key={h.id}>{h.name}</li>) )}
                </ul>
            </aside>
            {/*<main><Outlet/></main>*/}
        </div>
    );
} 