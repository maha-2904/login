import {useState,useEffect} from 'react';
function Timer(){
    const[count,setCount]=useState(0);
    useEffect(()=>{
        const Timer=setTimeout(()=>{
            setCount((count)=>count+1);
        },1000);
        return()=>clearTimeout(Timer);
    },[count]);
    return<h1>I have rendered{count} times!</h1>;
}
export default Timer;