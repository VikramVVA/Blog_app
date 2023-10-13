import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
// import { useToasts } from "react-toast-notifications";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState, convertFromRaw, convertFromHTML, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ImageDialog from "./imageCroper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppConfig } from "../constant/config";
import { useNavigate } from "react-router-dom";
// const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;


export default function Addblog() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // const { addToast } = useToasts()
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([])
    const [file, setFile] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const [image, setImage] = useState(null);
    const [src, setSrc] = useState(null);
    const navigate =useNavigate()
    const onEditorStateChange = (value) => {
        setEditorState(value)
    }
    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: "",
            author: "",
            image: '',
            content: "",

        },
        validationSchema: Yup.object({
            title: Yup.string()
                // .matches(/^[A-Za-z ]*$/, "Title should not contain any numbers or special symbols")
                .required("Please Enter Title")
                .trim(),
            author: Yup.string(),
            // content: Yup.string().required("Please Enter Content").trim(),
            image: Yup.string().required("Please select an image"),
        }),

        onSubmit: (values) => {
            let draftMessageTemplate = draftToHtml(convertToRaw(editorState.getCurrentContent()))
            values.image = file
            values.content = draftMessageTemplate
            axios.post(`${AppConfig.baseurl}/blog/addblog`, values,
                {
                    headers: {
                        'token': localStorage.getItem('admin_token')
                    }
                }
            )
                .then((response) => {
                    console.log("Blog added successfully", response);
                    if (response.data.error === true) {
                         toast(response.data.title,{Type:"error"});
                        // addToast(response.data.title, { appearance: 'error', autoDismiss: true })
                    }
                    else {
                        formik.resetForm()
                        navigate('/')
                        toast(response.data.title);
                         
                        // addToast(response.data.title, { appearance: 'success', autoDismiss: true })
                        // Window.location.reload()

                    }

                })
                .catch((error) => {
                    console.log("error", error);
                    // addToast(error.message, { appearance: 'error', autoDismiss: true })


                });
        }

    });
    const handlechange = (event) => {
        setOpen(true);
        // formik.setFieldValue(event.target.value)
        setImage(URL.createObjectURL(event.target.files[0]));
        // let reader = new FileReader();
        // let file = event.target.files[0];
        // reader.readAsDataURL(file);
        // reader.onload = () => {

        //   setImage(reader.result)
        // };
        // let reader = new FileReader();
        // let file = event.target.files[0];
        // formik.setFieldValue("image", event.target.value)
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //     // console.log("base64", reader.result)
        //     setFile(reader.result)
        // };
    }
    const handleChange = (e) => {
        // toast.error(e.target.value);

        setOpen(true);
        let reader = new FileReader();
        console.log("reader", reader)
        let file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {

            setImage(reader.result)
        };

        formik.setFieldValue("image",e.target.value)
        // console.log("reader1", reader)
    }
    // console.log("valuessss",formik.values)
    // const changeHandler = (e) => {
    //     formik.setFieldValue("images",e.target.value)
    //     const { files } = e.target;
    //     const validImageFiles = [];
    //     for (let i = 0; i < files.length; i++) {
    //       const file = files[i];
    //       if (file.type.match(imageTypeRegex)) {
    //         validImageFiles.push(file);
    //       }
    //     }
    //     if (validImageFiles.length) {
    //      setImageFiles(validImageFiles);
    //       return;
    //     }
    //     alert("Selected images are not of valid type!");
    //   }

    // useEffect(() => {
    //   const images = [], fileReaders = [];
    //   let isCancel = false;
    //   if (imageFiles.length) {
    //     imageFiles.forEach((file) => {
    //       const fileReader = new FileReader();
    //       fileReaders.push(fileReader);
    //       fileReader.onload = (e) => {
    //         const { result } = e.target;
    //         if (result) {
    //           images.push(result)
    //         }
    //         if (images.length === imageFiles.length && !isCancel) {
    //           setImages(images);
    //         }
    //       }
    //       fileReader.readAsDataURL(file);
    //     })
    //   };



    // const submit =() =>{
    //     let data = {
    //       title: formik.values.title,
    //       author: formik.values.author,
    //       image: images,
    //       content: formik.values.content,
    //     }

    //   axios.post("http://localhost:5002/blog/addblog", data
    //   //    {
    //   //     headers: {
    //   //       Authorization: "token " + token,

    //   //     },
    //   //   }
    //     )
    //     .then((response) => {
    //       formik.resetForm();
    //       // history.push("/");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }

    return (
        <>
        <ToastContainer
               autoClose={3000}
/>
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
                <div className="flex justify-center items-center  w-full h-full bg-slate-900">
                    <div className="w-10/12 bg-white rounded-lg shadow-2xl p-8 my-12">
                        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
                            Add a Blog
                        </h1>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                formik.handleSubmit();
                                return false;
                            }}
                        >
                            <div className="flex flex-col mb-4">
                                <label
                                    className="mb-2 font-bold text-lg text-gray-900"
                                    htmlFor="title"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter title..."
                                    className={`border py-2 px-3 text-grey-800${formik.touched.title && formik.errors.title
                                        ? "border-red-400"
                                        : "border-gray-300"
                                        }`}
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <div
                                        style={{ color: "rgb(220 38 38)" }}
                                        className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                    >
                                        {formik.errors.title}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label
                                    className="mb-2 font-bold text-lg text-gray-900"
                                    htmlFor="author"
                                >
                                    Author Name
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter Author Name..."
                                    className={`border py-2 px-3 text-grey-800${formik.touched.author && formik.errors.author
                                        ? "border-red-400"
                                        : "border-gray-300"
                                        }`}
                                    onChange={formik.handleChange}
                                    value={formik.values.author}
                                />
                                {formik.touched.author && formik.errors.author && (
                                    <div
                                        style={{ color: "rgb(220 38 38)" }}
                                        className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                    >
                                        {formik.errors.author}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label
                                    className="mb-2 font-bold text-lg text-gray-900"
                                    htmlFor="img"
                                >
                                    Select Image
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    className={`border py-2 px-3 text-grey-800${formik.touched.image && formik.errors.image
                                        ? "border-red-400"
                                        : "border-gray-300"
                                        }`}
                                    onChange={(e) => handleChange(e)}
                                    value={formik.values.image}
                                    accept="image/png, image/jpg, image/jpeg ,image/webp"
                                />
                                {formik.touched.image && formik.errors.image && (
                                    <div
                                        style={{ color: "rgb(220 38 38)" }}
                                        className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                    >
                                        {formik.errors.image}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label
                                    className="mb-2 font-bold text-lg text-gray-900"
                                    htmlFor="password"
                                >
                                    Content
                                </label>
                                <div >
                                    <Editor
                                        editorStyle={{
                                            width: '100%',
                                            minHeight: 150,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: 'gray',
                                            // backgroundColor:'black'
                                        }}
                                        toolbar={{
                                            options: ['inline', 'fontSize', 'blockType', 'list', 'colorPicker'],
                                            inline: {
                                                inDropdown: false,
                                                className: undefined,
                                                component: undefined,
                                                dropdownClassName: false,
                                                options: ['bold', 'italic', 'underline'],
                                            },
                                            blockType: { inDropdown: true }

                                        }}
                                        toolbarClassName="toolbar-class"
                                        // wrapperStyle={<wrapperStyleObject/>}
                                        // editorStyle={<editorStyleObject/>}
                                        // toolbarStyle={<toolbarStyleObject/>}
                                        onEditorStateChange={onEditorStateChange}
                                    />


                                </div>
                                {/* <textarea
                                    name="content"
                                    placeholder="Write your blog here..."
                                    className={`border py-2 px-3 h-40 text-grey-800${formik.touched.content && formik.errors.content
                                        ? "border-red-400"
                                        : "border-gray-300"
                                        }`}
                                    onChange={formik.handleChange}
                                    value={formik.values.content}
                                /> */}
                                {formik.touched.content && formik.errors.content && (
                                    <div
                                        style={{ color: "rgb(220 38 38)" }}
                                        className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                    >
                                        {formik.errors.content}
                                    </div>
                                )}
                            </div>
                            <button
                                className="block bg-blue-900 hover:bg-slate-600 text-white uppercase text-lg mx-auto p-4 rounded"
                                type="submit"
                            // onClick={submit}
                            >
                                Add Blog
                            </button>
                            {open && <ImageDialog handleClose={handleClose} setFieldValue={formik.setFieldValue} open={open} setOpen={setOpen} setSrc={setSrc} setFile={setFile} image={image} />}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
