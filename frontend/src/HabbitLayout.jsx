import { useState , useEffect , Fragment } from "react";
import { Outlet , NavLink } from "react-router-dom";
import { useMainContext } from "./Context";
import { backendURL } from "./backend.jsx";

export default function HabbitLayout(){
    const { habbit , setHabbit , habbits , setHabbits , currHabbit , setCurrHabbit } = useMainContext();
    //local state->see are currHabbit and habbit intended for same purpose if so delete habbit
    const [newHabbit,setNewHabbit] = useState("");

    const createInputChange = (e)=>{
        setNewHabbit(e.target.value);//target is input(that trigered this event)
    }
    const createSubmit = async ()=>{ //add spinners + later some pop up to fill
        try{
            const response = await fetch(`${backendURL}/habbit`,{//from res.json -> application/json
                method: "POST",
                headers : { 'Content-Type': 'application/json'},
                body : JSON.stringify({ 'name' : newHabbit })//if not address key
            });
            if(!response.ok){
                new Error("what is the error?");
            }

            setNewHabbit("");
            const fResponse = await response.json();//from bytes?
            setHabbits([...habbits,fResponse]);
            console.log(fResponse);//need that 
        }catch(e){
            console.log(e.message);
        }
    }

    useEffect(()=>{
        async function getHabbits(){
            try{
                const response = await fetch(`${backendURL}/habbits`,{//not mandatory
                    method: "GET",
                    headers : { 'Content-Type': 'application/json'}//no body as of now
                });
                if(!response.ok){
                    throw new Error("what is the error?");//throw needed
                }

                const fResponse = await response.json();//from bytes?
                setHabbits(fResponse);//initial so no need [...,] | new array not .append
                console.log(fResponse);//
            }catch(e){
                console.log(e.message);
            }
        }
        getHabbits();
    },[]);//as one no []

    return(
        <div>  
            <aside>
                <div>
                    <input type="text" value={newHabbit} onChange={createInputChange}/>
                    <button onClick={createSubmit}>Start Habbit</button>
                </div>
                <nav>
                    {
                        habbits.map((h)=>(<Fragment key={h.id}>
                            <NavLink to={`/${h.id}`} onClick={()=>setCurrHabbit(h.id)}>
                                {h.name}
                            </NavLink>
                            <br />
                        </Fragment>))
                    }
                </nav>
            </aside>
            <main>
                <Outlet/>
            </main>
            {/* that page page and here not ul/li */}
        </div>
    );
} 