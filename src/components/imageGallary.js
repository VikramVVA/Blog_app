import Taible from "../components/taible"
import { useState } from "react"
import axios from "axios"
import { AppConfig } from "../constant/config"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function ImageGallary(props) {
    const navigate = useNavigate()
    // const column =["Sr.No",'Name','Subject','Email','Issue Date']
    // const row = ['name','subject','email','createdAt']
    // const [contactus,setContactus]=useState([{1:'dddddddddd'}])
    const [popup, setPopup] = useState(false)

    // const getBlogs=async()=>{
    // let data=await axios(`http://localhost:5002/contactus/contactUsList`)
    // setContactus(data.data.data)
    // }
    // useEffect(()=>{
    //     // navigate('/Enquiry')
    //     props.setSearchText('')
    //     getBlogs()
    // },[])
    return <div >
        <div>
            <img style={{ width: '300px', height: '300px', border: '1px solid gray' }}/>  
        </div>
        {popup && <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Image Cropper
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setPopup(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div>
                                <label
                                    className="mb-2 font-bold text-lg text-gray-900"
                                    htmlFor="author"
                                >
                                    Images :
                                </label>
                            </div>
                            <div class="flex justify-center">
                                <div class="mb-3 w-96">
                                    <input multiple className="form-control
                                                        block
                                                        w-full
                                                        px-3
                                                        py-1.5
                                                        text-base
                                                        font-normal
                                                        text-gray-700
                                                        bg-white bg-clip-padding
                                                        border border-solid border-gray-300
                                                        rounded
                                                        transition
                                                        ease-in-out
                                                        m-0
                                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setPopup(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            // onClick={() => onCrop()}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>}



    </div>
}
