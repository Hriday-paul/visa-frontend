import { CiFileOn } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";

export default function FileCard({name, url} : {name : string, url : string}) {
    return (
        <div>
            <a href={url} target="_blank" download={true} className="bg-slate-50 dark:bg-boxdark border border-stroke dark:border-strokedark h-28 w-28 p-4 shadow-2 rounded-sm flex flex-col justify-center items-center group relative cursor-pointer">
                <CiFileOn className="text-4xl text-success" />
                <p className="text-sm text-center my-1.5 text-graydark dark:text-slate-200">{name}</p>
                <div className="absolute top-0 left-0 w-full h-full group-hover:flex justify-center items-center hidden bg-slate-50 dark:bg-boxdark duration-200 ">
                    <FaDownload className="text-xl text-graydark dark:text-slate-200 group-hover:translate-y-0 duration-200" />
                </div>
            </a>
        </div>
    )
}
