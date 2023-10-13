import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Popup from './popupModal';
import { useState } from 'react';
import axios from 'axios';
import { AppConfig } from '../constant/config';
// import { useToasts } from 'react-toast-notifications';

export default function Taible (props) {
  // const {addToast}=useToasts()
  const [showModal, setShowModal] = useState(false);
  const [pid,setPid] = useState();
const hisory = useNavigate()
   const AddBlogs=()=>{
    hisory('/blogs')
   }
  
   const onEdit=(id)=>{
    hisory(`/blogs/edit?id=${id}`)
   }
 
   const handledelete = (e,id) =>{
    setShowModal(true)
    setPid(id)
   }
   const onConfirm = (id) => {
    var id = pid;
    let data={id}
    let token = localStorage.getItem("admin_token");
    // alert("You sure!!!!")
    axios
      .post(
        `${AppConfig.baseurl}/blog/removeBlog`, data,
        {
          headers: {
          "token" : token,
          },
         
        }
      )
      .then((res) =>  {
        setShowModal(false)
        props.getBlogs()
        });
  };
    return <div className="mt-4 mx-4">
         
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
 
      <div className="w-full overflow-x-auto">
     {props.title&&props.title=="blogs"&& <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>{AddBlogs()}}
                >
                 Add Blogs
                </button>
              </div>}
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              {props.column&&props.column.map((val,ind)=>{
                   return (
                    <th className="px-4 py-3" key={ind}>{val}</th>
                   )
              })}
              {/* <th className="px-4 py-3" >Action</th> */}
            </tr>
          </thead>
        {props&& props.data
        .filter((val) => {
                if (props.searchtext === undefined) {
                  return val;
                }
                if (
                  val[props.row[0]]&&val[props.row[0]]
                    .toLowerCase()
                    .includes(props.searchtext && props.searchtext.toLowerCase())
                ) {
                  return val;
                }
              })
        .map((val,i)=>{  console.log("ghghghgh",val[props.row[0]]);
            return <>
             <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
            <td className="px-4 py-3"> {i+1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  {/* <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block"> */}
                    {/* <img
                      className="object-cover w-full h-full rounded-full"
                      src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                      alt=""
                      loading="lazy"
                    /> */}
                    {/* <div
                      className="absolute inset-0 rounded-full shadow-inner object-cover w-full h-full rounded-full"
                      aria-hidden="true"
                    />
                  </div> */}
                  <div>
                    <p className="font-semibold">{val[props.row[0]]}</p>
                   
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                { props.title=='blogs'?moment(val[props.row[1]]).format("DD/MM/YYYY"):val[props.row[1]]}
              </td>
              <td className="px-4 py-3">
                {val[props.row[2]]}
              </td>
             { props.row[3]&&<td className="px-4 py-3">
             {moment(val[props.row[3]]).format("DD/MM/YYYY")}
              </td>}
             
            { props.title !="enquiry" && <td className="px-4 py-3 text-xs">
                <button  onClick={()=>onEdit(val._id)}className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                  {" "}
                  EDIT{" "}
                </button>
                {/* <button  className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                  {" "}
                  VIEW{" "}
                </button> */}
                <button onClick={(e)=>(handledelete(e,val._id))} className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                  {" "}
                  DELETE{" "}
                </button>
              </td>}
              {showModal?<div className="  bg-purple flex justify-center items-center overflow-x-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 outline-none focus:outline-none">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={()=>setShowModal(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-6 text-center">
                                    <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this blog?</h3>
                                    <button onClick={()=>onConfirm(val._id)} data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                    <button onClick={()=>setShowModal(false)} data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>:''}    
            </tr>
          
         
          
          </tbody>
             
            </>
        }) }
        </table>
      </div>
      {/* <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span className="flex items-center col-span-3">
          {" "}
          Showing 21-30 of 100{" "}
        </span>
        <span className="col-span-2" /> */}
        {/* Pagination */}
        {/* <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              <li>
                <button
                  className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Previous"
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  1
                </button>
              </li>
              <li>
                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  2
                </button>
              </li>
              <li>
                <button className="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                  3
                </button>
              </li>
              <li>
                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  4
                </button>
              </li>
              <li>
                <span className="px-3 py-1">...</span>
              </li>
              <li>
                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  8
                </button>
              </li>
              <li>
                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  9
                </button>
              </li>
              <li>
                <button
                  className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Next"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span> */}
      {/* </div> */}
    </div>
    {/* <button class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="popup-modal">
            Toggle modal
            </button> */}

        
  </div>
  
}


