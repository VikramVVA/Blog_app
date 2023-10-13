
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useRef, useState } from 'react'







export default function ImageDialog(props) {



    const [showModal, setShowModal] = useState(false);
    const [crop, setCrop] = useState({aspect: 16 / 9});
    const [image, setImg] = useState(null);

    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef.current;
        const cropper = imageElement.cropper;
        const base64 = cropper.getCroppedCanvas().toDataURL();

        // const startIndex = base64.indexOf("base64,") + 7;
        // const b64 = base64.substr(startIndex);
        // const byteCharacters = window.atob(b64);
        // const byteArrays = [];
        // const sliceSize = 512;
        // const contentType = 'image/jpg';

        // for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        //     const slice = byteCharacters.slice(offset, offset + sliceSize);

        //     const byteNumbers = new Array(slice.length);
        //     for (let i = 0; i < slice.length; i++) {
        //         byteNumbers[i] = slice.charCodeAt(i);
        //     }

        //     const byteArray = new Uint8Array(byteNumbers);
        //     byteArrays.push(byteArray);
        // }

        // const blob = new Blob(byteArrays, { type: contentType });

        // console.log("blob", blob)

        // // to get blobUrl

        // // const blobUrl = URL.createObjectURL(blob);

        // const file = new File([blob], '.jpg',
        //     {
        //         type: blob.type,
        //         lastModified: new Date().getTime()
        //     }
        // )
        props.setFile(base64)
        // console.log("file", file)
        // props.setSrc(cropper.getCroppedCanvas().toDataURL());
        // props.setFieldValue("image", file.type);
        props.setOpen(false);
    };
  //   const getCroppedImg = async () => {
  //     try {
  //         const canvas = document.createElement("canvas");
  //         const scaleX = image.naturalWidth / image.width;
  //         const scaleY = image.naturalHeight / image.height;
  //         canvas.width = crop.width;
  //         canvas.height = crop.height;
  //         const ctx = canvas.getContext("2d");
  //         ctx.drawImage(
  //             image,
  //             crop.x * scaleX,
  //             crop.y * scaleY,
  //             crop.width * scaleX,
  //             crop.height * scaleY,
  //             0,
  //             0,
  //             crop.width,
  //             crop.height
  //         );
  
  //         const base64Image = canvas.toDataURL("image/jpeg", 1);
  //          console.log("Ddddddddddddddddddddddddd",base64Image)
  //         props.setFile(base64Image);
  
  //     } catch (e) {
  //         console.log("crop the image",e);
  //     }
  // };
    return (<>
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
                onClick={() =>   props.setOpen(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <Cropper
                        src={props.image}
                        style={{ height: 'auto', width: "100%", margin: 'auto' }}
                        // Cropper.js options
                        initialAspectRatio={3/2}
                        background={false}
                        guides={false}
                        // crop={onCrop}
                        ref={cropperRef}
                    />
            <div className="relative p-6 flex-auto">
           
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() =>   props.setOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onCrop()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>)}
    //     <div>
    //         <div className="  bg-purple flex justify-center items-center overflow-x-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 outline-none focus:outline-none">
    //             <div class="relative p-4 w-full max-w-md h-full md:h-auto">
    //                 <div className="relative bg-white rounded-lg shadow dark:bg-gray-700"></div>

    //                 <button
    //                     className="bg-blue-200 text-black active:bg-blue-500 
    //   font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
    //                     type="button"
    //                     onClick={() => setShowModal(true)}
    //                 >
    //                     Image Cropper
    //                 </button>

    //                 <Cropper
    //                     src={props.image}
    //                     style={{ height: 'auto', width: "100%", margin: 'auto' }}
    //                     // Cropper.js options
    //                     initialAspectRatio={1}
    //                     background={false}
    //                     guides={false}
    //                     //crop={onCrop}
    //                     ref={cropperRef}
    //                 />

    //                 <button data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={onCrop}>
    //                     Crop
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
{/* <div className=" w-full bg-purple flex justify-center items-center overflow-x-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 outline-none focus:outline-none">
    <div class="relative lg:w-12/12 max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={()=>props.setOpen(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center w-100">
            <Cropper
                        src={props.image}
                        style={{ height: 'auto', width: "100%", margin: 'auto' }}
                        // Cropper.js options
                        initialAspectRatio={1}
                        background={false}
                        guides={false}
                        //crop={onCrop}
                        ref={cropperRef}
                    />

                <button  data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                   Crop
                </button>
            </div>
        </div>
    </div>
</div> */}


// const Modal = () => {
//     const [showModal, setShowModal] = useState(false);
//     return (
//         <>
//             <button
//                 className="bg-blue-200 text-black active:bg-blue-500 
//       font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
//                 type="button"
//                 onClick={() => setShowModal(true)}
//             >
//                 Fill Details
//             </button>
//             {showModal ? (
//                 <>
//                     <div className="  bg-purple flex justify-center items-center overflow-x-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 outline-none focus:outline-none">
//                         <div class="relative p-4 w-full max-w-md h-full md:h-auto">
//                             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                                 <button onClick={() => setShowModal(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
//                                     <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
//                                     <span class="sr-only">Close modal</span>
//                                 </button>
//                                 <div class="p-6 text-center">
//                                     <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//                                     <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
//                                     <button data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
//                                         Yes, I'm sure
//                                     </button>
//                                     <button onClick={() => setShowModal(false)} data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             ) : null}
//         </>
//     );
// };