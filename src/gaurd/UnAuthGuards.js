import React,{useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
const UnAuthGuards=({component})=>{
    const [status,setStatus]=useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        checkToken()
    },[component]);
        // console.log("unAuthGaurd")
    const checkToken = async()=>{
        try{
            const Token = sessionStorage.getItem("Token")
         
            if(!Token){
                sessionStorage.removeItem("Token")
                // navigate(`/`)
            }
            // else{
            //     navigate(`/`)
            // }
            setStatus(true);
                }catch(error){
                    navigate(`/`)
                }
            }
        
            return status?<React.Fragment>{component}</React.Fragment>:<React.Fragment></React.Fragment>
    }

export default UnAuthGuards;