import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export default function Horizontal(props){
    let navigate = useNavigate()
    const handleClear=()=>{
        localStorage.removeItem("admin_token")
        window.location.reload();
        }
    return <>
      <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
            <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
                {/* <img style={{width:'100px'}}
                className="w-15 h-6 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
                // src="/logo200*83.jpg"
                /> */}
                <span className="hidden md:block">ADMIN</span>
            </div>
            <div className="flex justify-between items-center h-14 bg-blue-800 dark:bg-gray-800 header-right">
                <div className="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
                <button className="outline-none focus:outline-none">
                    <svg
                    className="w-5 text-gray-600 h-5 cursor-pointer"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
                <input
                   value={props.searchtext}
                   onChange ={(e) => (props.setSearchText(e.target.value))}
                    type="search"
                    placeholder="Search"
                    className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
                />
                </div>
                <ul className="flex items-center">
                
                <li>
                    <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700" />
                </li>
                <li>
                    <Link onClick={handleClear} to="/login" className="flex items-center mr-4 hover:text-blue-100">
                    <span className="inline-flex mr-1">
                        <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                        </svg>
                    </span>
                    Logout
                    </Link>
                </li>
                </ul>
            </div>
            </div>
    </>
}