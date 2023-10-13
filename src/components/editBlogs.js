import React,{useState,useEffect} from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { data } from "autoprefixer";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState, convertFromRaw, convertFromHTML, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppConfig } from "../constant/config";

export default function EditBlog() {
    const editorLabels = {
        // Generic
        'generic.add': 'Add',
        'generic.cancel': 'Cancel',
      
        // BlockType
        'components.controls.blocktype.h1': 'Heading 1',
        'components.controls.blocktype.h2': 'Heading 2',
        'components.controls.blocktype.h3': 'Heading 3',
        'components.controls.blocktype.h4': 'Heading 4',
        'components.controls.blocktype.h5': 'Heading 5',
        'components.controls.blocktype.h6': 'Heading 6',
        'components.controls.blocktype.blockquote': 'Blockquote',
        'components.controls.blocktype.code': 'Code',
        'components.controls.blocktype.blocktype': 'Block Type',
        'components.controls.blocktype.normal': 'Normal',
      
        // Color Picker
        'components.controls.colorpicker.colorpicker': 'Color Picker',
        'components.controls.colorpicker.text': 'Text',
        'components.controls.colorpicker.background': 'Highlight',
      
        // Embedded
        'components.controls.embedded.embedded': 'Embedded',
        'components.controls.embedded.embeddedlink': 'Embedded Link',
        'components.controls.embedded.enterlink': 'Enter link',
      
        // Emoji
        'components.controls.emoji.emoji': 'Emoji',
      
        // FontFamily
        'components.controls.fontfamily.fontfamily': 'Font',
      
        // FontSize
        'components.controls.fontsize.fontsize': 'Font Size',
      
        // History
        'components.controls.history.history': 'History',
        'components.controls.history.undo': 'Undo',
        'components.controls.history.redo': 'Redo',
      
        // Image
        'components.controls.image.image': 'Image',
        'components.controls.image.fileUpload': 'File Upload',
        'components.controls.image.byURL': 'URL',
        'components.controls.image.dropFileText': 'Drop the file or click to upload',
      
        // Inline
        'components.controls.inline.bold': 'Bold',
        'components.controls.inline.italic': 'Italic',
        'components.controls.inline.underline': 'Underline',
        'components.controls.inline.strikethrough': 'Strikethrough',
        'components.controls.inline.monospace': 'Monospace',
        'components.controls.inline.superscript': 'Superscript',
        'components.controls.inline.subscript': 'Subscript',
      
        // Link
        'components.controls.link.linkTitle': 'Link Title',
        'components.controls.link.linkTarget': 'Link Target',
        'components.controls.link.linkTargetOption': 'Open link in new window',
        'components.controls.link.link': 'Link',
        'components.controls.link.unlink': 'Unlink',
      
        // List
        'components.controls.list.list': 'List',
        'components.controls.list.unordered': 'Unordered',
        'components.controls.list.ordered': 'Ordered',
        'components.controls.list.indent': 'Indent',
        'components.controls.list.outdent': 'Outdent',
      
        // Remove
        'components.controls.remove.remove': 'Remove',
      
        // TextAlign
        'components.controls.textalign.textalign': 'Text Align',
        'components.controls.textalign.left': 'Left',
        'components.controls.textalign.center': 'Center',
        'components.controls.textalign.right': 'Right',
        'components.controls.textalign.justify': 'Justify',
      };
    let navigate = useNavigate()
    // const {addToast}=useToasts()
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText('gggg')))
    const [imageFiles, setImageFiles] = useState([]);
    const [images,setImages] = useState([])
    const [file,setFile] = useState([])
    const [blog,setBlog] = useState([])
    const onEditorStateChange = (value) => {
        console.log("sssssssssssssssssss", value);
        setEditorState(value)
    }
    function getHtml(html) {
        const htmlString = html;
      
          <div dangerouslySetInnerHTML={{ __html: htmlString }}>
               </div>;
      }
     

    const getBlogs =async()=>{
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const id = params.get("id");
        let data=await axios(`${AppConfig.baseurl}/blog/blogDetails?_id=${id}`, {
            headers: {
                'token': localStorage.getItem('admin_token')
            }
        })
        // console.log("ddddddddddddddddddd545155",data.data.data);
        setBlog(data.data.data)
        getHtml(data.data.data.content)
        const blocksFromHtml = htmlToDraft(data.data.data.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
         setEditorState(editorState )
        
      }
    useEffect(()=>{
        getBlogs()
    },[])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blog.title,
            author: blog.author,
            image: '',
            content: blog.content,
            id:blog._id
        },
        validationSchema: Yup.object({
            title: Yup.string()
                // .matches(/^[A-Za-z ]*$/, "Title should not contain any numbers or special symbols")
                .required("Please Enter Title")
                .trim(),
            author: Yup.string(),
            content: Yup.string().required("Please Enter Content").trim(),
            // image:  Yup.string().required("Please select an image"),
        }),
        onSubmit: (values) => {
            const token = localStorage.getItem('admin_token');
            values.image=file.length>0?file:blog.image
            let draftMessageTemplate = draftToHtml(convertToRaw(editorState.getCurrentContent()))
            values.content=draftMessageTemplate
          axios.post(`${AppConfig.baseurl}/blog/editblog`, values,
          {
            headers: {
             'token':token
        }}
          )
          .then((response) => {
        if(response.data.error === true){
            // addToast(response.data.title,{appearance:'error',autoDismiss:true})
            toast.error(response.data.title)
        }
       else{
          navigate('/')
        //   addToast(response.data.title,{appearance:'success',autoDismiss:true})
        toast(response.data.title)
        }
       
      })
      .catch((error) => {
        toast.error(error.message)
        // addToast(error.message,{appearance:'error',autoDismiss:true})

      });
      }
      
    });

    const handleChange = (event) => {
      let reader = new FileReader();
      let file = event.target.files[0];
      formik.setFieldValue("image", event.target.value)
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log("base64", reader.result)
        setFile(reader.result)
      };
    }

    return (
        <>
          <ToastContainer
               autoClose={2000}/>
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
                <div className="flex justify-center items-center  w-full h-full bg-slate-900">
                    <div className="w-10/12 bg-white rounded-lg shadow-2xl p-8 my-12">
                        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
                            Edit a Blog
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
                                    className={`border py-2 px-3 text-grey-800${formik.touched.image&& formik.errors.image
                                            ? "border-red-400"
                                            : "border-gray-300"
                                        }`}
                                    onChange={(e)=>handleChange(e)}
                                    value={formik.values.image}
                                    accept="image/png, image/jpg, image/jpeg"
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
                            <div className="flex flex-col mb-4 ">
                                <label
                                    className="mb-2 font-bold text-lg text-gray-900"
                                    htmlFor="img"
                                >
                                 Previous Image
                                </label>
                                 <img style={{height:'300px',width:'300px'}} src={blog.image} />  
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
                                            borderColor: 'gray'
                                        }}
                                        //'blockType'
                                        toolbar={{
                                            options: ['inline', 'fontSize', 'list', 'colorPicker'],
                                            inline: {
                                                inDropdown: false,
                                                className: undefined,
                                                component: undefined,
                                                dropdownClassName: false,
                                                options: ['bold', 'italic', 'underline'],
                                            },
                                        }}                                        
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
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
                              Edit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
          
        </>
    );
}
