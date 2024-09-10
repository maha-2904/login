import React,{useState} from 'react';
function Namechanger(){
    const[name,setName]=useState("john");
    const ChangeName=()=>{
        setName("jane");
    };
    return(
        <div>
            <h1>Hello,{name}!</h1>
            <button onClick={ChangeName}>ChangeName</button>
        </div>
    );
}
export default Namechanger;