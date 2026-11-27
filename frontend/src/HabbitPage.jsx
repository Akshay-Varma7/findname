import { useMainContext } from "./Context";
import { useState , useEffect , Fragment } from "react";//for input 
import { backendURL } from "./backend.jsx";
import { useParams } from "react-router-dom";

export default function HabbitPage(){
    const { sharedHabbits , setSharedHabbits } = useMainContext()
    const { habbitId } = useParams();

    const [link , setLink] = useState("");
    const linkChange = (e)=>{
        setLink(e.target.value);
    }
    const addLink = async ()=>{
        try{
            const response = await fetch(`${backendURL}/sharedhabbits`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url:link, userId:1, habbitId:habbitId })
            });//which is inserted->full
            if(!response.ok){
                throw new Error("what is the error?");
            }
            const fresponse = await response.json();
            setLink("");
            setSharedHabbits([...sharedHabbits,fresponse]);
        }catch(e){
            console.log(e.message);
        }
    }

    useEffect(()=>{
        async function getSharedHabbits(){
            try{
                console.log("1st");
                const response = await fetch(`${backendURL}/sharedhabbits/${habbitId}`,{
                    method: "GET",
                    headers : { 'Content-Type': 'application/json'},
                });
                if(!response.ok){
                    throw new Error("what is the error?");
                }
                const fResponse = await response.json();
                setSharedHabbits(fResponse);
                console.log(fResponse);
            }catch(e){
                console.log(e.message);
            }
        }
        getSharedHabbits();
    }
    ,[habbitId]);
    const inputStyle = { width: "500px", height: "100px" };
    return(
        <div>
            {
                sharedHabbits.map((sh)=>(<Fragment key={sh.id}>
                    <iframe
                    title="shared:"
                    src={`https://${sh.url}`}
                    height="400"
                    width="400"
                    loading="lazy">
                    </iframe>
                </Fragment>))
            }
            <input style={inputStyle} type="text" value={link} onChange={linkChange}/>
            <button style={inputStyle} onClick={addLink}>Add Embbed Link</button>
        </div>
          
    );
}