import Taible from "../components/taible"
import { useState } from "react"
import axios from "axios"
import { AppConfig } from "../constant/config"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Enquiries (props) {
    const navigate =useNavigate()
    const column =["Sr.No",'Name','Subject','Email','Issue Date']
    const row = ['name','subject','email','createdAt']
    const [contactus,setContactus]=useState([{1:'dddddddddd'}])
    const getBlogs=async()=>{
    let data=await axios(`${AppConfig.baseurl}/contactus/contactUsList`)
    setContactus(data.data.data)
    }
    useEffect(()=>{
        // navigate('/Enquiry')
        props.setSearchText('')
        getBlogs()
    },[])
       return <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
         <Taible data={contactus} title="enquiry" column={column} row={row} searchtext={props.searchtext}/> 
        </div>
}
