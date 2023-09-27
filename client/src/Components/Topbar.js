import { FcButtingIn } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { useStateContext } from "../ContextProvider";

function Topbar() {

    const { setLoginState } = useStateContext(); 

    return(
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="http://localhost:3000" class="flex items-center">
                <FcButtingIn size={40} class="px-2"/> 
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Last Mile Healthcare Delivery</span>
            </a>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">ENGLISH</a>
                    </li>
                    <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">中文</a>
                    </li>
                    <li>
                    <a href="#" class=" rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page" onClick={() => setLoginState(false)}><BiLogOut/></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}


export default Topbar