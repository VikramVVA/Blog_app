import {React,useState,useEffect} from "react";
import { useParams } from "react-router-dom";

export default function Article() {

  const [data,setData]  = useState({name:"digambar",title:'blogs api ',author:'RJ desoja',content:'lonreuiagbfuyhgasjfhvb jkbuigah jkbuicbajkccjkbai'});
  const id=useParams();
  console.log(id)

//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem('details'));
//     setData(items)
//   }, []);
  

  return (
    <>
    <div className="h-full ml-14 mt-14 mb-10 md:ml-64"> 
      <div className="container mt-2  px-6 mx-auto border-8">
        <section className="mb-32 text-gray-1000">
          <div className="grid sm:grid-cols-1 gap-6">
            <div
              className="relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg"
              style={{ backgroundPosition: "50%" }}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              {/* <img style={{width:'100px'}} */}
                {/* className="w-15 h-6 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
                src="/logo200*83.jpg"
                /> */}
              <div>
                <div
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                >
                  <div className="flex justify-start items-end h-full">
                    <div className="text-white m-6">
                      <h5 className="font-bold text-lg mb-3">
                        {"data.name"}
                      </h5>
                      <p className="font-bold text-lg">{"data.title"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p>
                <small>
                  Published at <u>{data.publishedAt}</u> by {' '}
                  {data.author}
                </small>
              </p>
            </div>
            <div>{data.content}</div>
            <div>{data.description}</div>
            <div><a href={data.url}><button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">View More</button></a></div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}